import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { getAgreements } from './src/getAgreements.js';
import { deleteAgreement } from './src/deleteAgreement.js';
import { bulkUploadAgreements, bulkUploadStatus } from './src/bulkUploadAgreements.js';
import { buildAuthUrl, exchangeCodeForToken } from './src/auth.js';

const app = express();

// Add session support before other middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  }
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

// Auth middleware to protect routes
function requireAuth(req, res, next) {
  if (!req.session.accessToken) {
    if (req.headers.accept?.includes('application/json')) {
      return res.status(401).json({ error: 'Login required' });
    }
    return res.redirect('/auth/login');
  }
  next();
}

// Protected API routes
app.get('/api/getAgreements', requireAuth, async (req, res) => {
  try {
    const data = await getAgreements({ 
      accessToken: req.session.accessToken 
    });
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message || 'Failed to fetch agreements' });
  }
});

app.delete('/api/deleteAgreement/:agreementId', requireAuth, async (req, res) => {
  try {
    const { agreementId } = req.params;
    const force = req.query.force === 'true';
    const result = await deleteAgreement({ 
      agreementId, 
      force, 
      accessToken: req.session.accessToken 
    });
    res.json(result);
  } catch (e) {
    const status = e.code === 'SAFE_GUARD' ? 400 : 500;
    res.status(status).json({ error: e.message || 'Failed to delete agreement' });
  }
});

// Bulk upload agreements 
app.post('/api/bulkUploadAgreements', requireAuth, express.json(), async (req, res) => {
  try {
    const result = await bulkUploadAgreements({
      accessToken: req.session.accessToken
    });

    // Save jobId in session for future status checks
    if (result) {
      req.session.jobId = result.jobId;
    }

    res.json(result);
  } catch (e) {
    console.error('bulk upload failed', e);
    res.status(500).json({ error: 'Bulk upload failed' });
  }
});

// Bulk upload status endpoint
app.get('/api/bulkUploadStatus', requireAuth, async (req, res) => {
  try {
    const jobId = req.session.jobId;
    if (!jobId) {
      return res.status(400).json({ error: 'No bulk upload job found in session' });
    }

    const status = await bulkUploadStatus({ jobId, accessToken: req.session.accessToken });

    res.json(status);
  } catch (e) {
    console.error('bulk upload status check failed', e);
    res.status(500).json({ error: 'Status check failed' });
  }
});


// Auth routes
app.get('/auth/login', (req, res) => {
  try {
    const state = req.query.state ?? '';
    const url = buildAuthUrl({ state });
    res.redirect(url);
  } catch (err) {
    console.error('auth/login failed', err);
    res.status(500).send('Auth configuration error');
  }
});

app.get('/ds/callback', async (req, res) => {
  if (process.env.DS_ACCESS_TOKEN){
    console.log("using env token");
    req.session.accessToken = process.env.DS_ACCESS_TOKEN;
    return res.redirect('/');
  }
  const { code, error } = req.query;
  if (error) return res.status(400).send(String(error));
  if (!code) return res.status(400).send('Missing code');

  try {
    const token = await exchangeCodeForToken(String(code));
    // Store token in session
    req.session.accessToken = token.accessToken;
    res.redirect('/');
  } catch (e) {
    console.error('auth callback failed', e);
    res.status(500).send('Token exchange failed');
  }
});

// Add logout route
app.post('/auth/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Navigator mini dashboard at http://localhost:${port}`);
});
