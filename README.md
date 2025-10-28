# Docusign MCP Workshop: AI-Powered Agreement Analysis

Welcome to the hands-on Docusign Model Context Protocol (MCP) workshop! This guide will walk you through setting up Docusign MCP integration in VS Code and demonstrate real-world agreement analysis capabilities.

## What You'll Build

By the end of this workshop, you'll have:
- ✅ Docusign MCP server connected to VS Code
- ✅ AI agents that can query and analyze agreement data
- ✅ Practical experience with agreement portfolio analysis
- ✅ Understanding of real-world business intelligence use cases

## Prerequisites

- **VS Code** with MCP extension installed
- **GitHub Copilot** with free or paid plan
- **Node.js** (v16 or higher) and npm/npx
- **Docusign Developer Account** (free at [developers.Docusign.com](https://developers.Docusign.com))
- **Basic understanding** of APIs and JSON data

## Setup Instructions

### Step 1: Configure Docusign MCP Connection

1. **Create the MCP configuration directory:**
   - Manually create a folder named `.vscode` in your project root, or run:
   ```bash
   mkdir -p .vscode
   ```

2. **Create `.vscode/mcp.json` with this configuration:**
```jsonc
{
  "servers": {
    "docusign-mcp": {
      "command": "npx",  // or "npx.cmd" for Windows - runs the Node Package Executor
      "args": [
        "-y",              // Auto-confirm package installation (skip prompts)
        "mcp-remote",      // NPM package that connects to remote MCP servers
        "https://services.demo.docusign.net/docusign-mcp-server/v1.0/mcp",  // Docusign MCP server endpoint URL
        "--header",        // Flag to specify HTTP header for authentication
        "Authorization:Bearer <YOUR_JWT_TOKEN>"  // JWT token from developers.docusign.com/token-generator
      ],
      "type": "stdio"      // Communication protocol (standard input/output)
    }
  },
  "inputs": []             // No additional user inputs required for this MCP server
}
```

2. **Platform-specific notes:**
   - **macOS/Linux**: Use `"npx"` (as shown above)
   - **Windows**: Use `"npx.cmd"` instead of `"npx"`

### Step 2: Authorization

1. **Get Access Token**
   - Visit: https://developers.docusign.com/token-generator
   - Sign-In to your developer account (if needed)
   - Copy the token

2. **Open mcp.json** 
    - locate and open `.vscode/mcp.json`
    - enter your token in the authorization header
        ```json
        {
            "docusign-mcp": {
			"command": "npx",
			"args": [
				"-y",
				"mcp-remote",
				"https://services.demo.docusign.net/docusign-mcp-server/v1.0/mcp",
				"--header",
				"Authorization:Bearer <YOUR_JWT_TOKEN>" 
            ]}
        }
        ```

3. **Start Github Copilot**
   - Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
   - Type and select `Chat: Open Chat`

4. **Select Agent Mode**
   - In the chat window, select `Agent Mode`
   - Choose LLM model (e.g., GPT-4.x, Claude Sonnet 4.x, etc.)
  
5. **Generate Agent Instructions**
   - Select option to `Generate Agent Instructions`

6. **Establish MCP Connection**
   - type `#use docusign-mcp` and press Enter
   - Follow any prompts to finalize connection
   - You should see the agent gather your user information (e.g. account ID, user name) from the MCP server using the `getUserInfo` tool


### Step 3: Test Your Setup

Try these basic queries with GitHub Copilot:
- "How many agreements do I have?"
- "Show me my most recent agreements"
- "What's the total value of my active contracts?"

## Workshop Exercises: Agreement Analysis Deep Dive

Based on the sample agreement data, here are practical exercises that demonstrate ways in which end-users may interact with agreement data:

### 🏢 **Exercise 1: Contract Portfolio Health Check**

**Business Question:** *"What's the health of our contract portfolio and what needs immediate attention?"*

**Tasks:**
1. **Identify expiring agreements** (e.g. next 90-120 days)
2. **Identify upcoming renewal notification deadlines and financial implications** (e.g. next 90-120 days)
3. **Calculate renewal pipeline value**
4. **Find agreements missing financial terms**
5. **Analyze renewal patterns** (auto-renew vs manual)

**Expected Insights:**
- Risk assessment of upcoming expirations
- Revenue forecasting for renewals
- Contract standardization opportunities


### 📊 **Exercise 2: Financial Analysis & Revenue Intelligence**

**Business Question:** *"What's our total contract value and how is it distributed?"*

**Tasks:**
1. **Total Active Contract Value** calculation
2. **Revenue by agreement type** (MSA vs SOW vs License)
3. **Top 10 highest-value relationships**
4. **Payment terms analysis** (30-day vs 60-day vs 90-day)
5. **Currency exposure** assessment


### ⚖️ **Exercise 3: Legal & Compliance Risk Analysis**

**Business Question:** *"Where are our legal and operational risks concentrated?"*

**Tasks:**
1. **Governing law distribution** (which states/jurisdictions)
2. **Termination clause analysis** (convenience periods)
3. **Assignment restrictions** audit
4. **Late payment fee** policies
5. **Liability cap** variations

**Key Risk Indicators:**
- Agreements without assignment clauses
- Inconsistent termination periods
- Jurisdictional concentration risk

### 🔄 **Exercise 4: Operational Efficiency Analysis**

**Business Question:** *"How can we streamline our contract management processes?"*

**Tasks:**
1. **Agreement type standardization** assessment
2. **Renewal notice periods** optimization
3. **Payment terms** standardization opportunities
4. **Template usage** analysis
5. **Process automation** candidates


## EXAMPLES OF OTHER BUSINESS QUESTIONS AND USE CASES


### 🎯 **Customer Relationship Intelligence**

**Business Question:** *"Which relationships drive the most value and risk?"*

**Tasks:**
1. **Multi-agreement customers** identification
2. **Customer lifetime value** calculation
3. **Relationship complexity** assessment
4. **Cross-selling opportunities** (customers with only MSAs)
5. **Customer concentration** risk analysis


### 🚀 **Advanced AI-Powered Insights**

**Business Question:** *"What patterns and opportunities is AI discovering in our data?"*

**Tasks:**
1. **Seasonal patterns** in agreement execution
2. **Geographic clustering** analysis
3. **Agreement lifecycle** optimization
4. **Predictive renewal** modeling data prep
5. **Anomaly detection** in terms and values


## Troubleshooting

### Common Issues:

**🔴 "spawn npx.cmd ENOENT" error:**
- **Cause:** Windows command on macOS/Linux
- **Fix:** Change `"npx.cmd"` to `"npx"` in `mcp.json`

**🔴 "Authentication failed" error:**
- **Cause:** Expired JWT token (8-hour lifespan)
- **Fix:** Retrieve anew token from `https://developers.docusign.com/token-generator`

**🔴 "No MCP tools available" error:**
- **Cause:** MCP extension not properly configured
- **Fix:** Restart VS Code after creating `mcp.json`

**🔴 "Network connection" error:**
- **Cause:** Firewall or network restrictions
- **Fix:** Ensure access to `api-docusign.com`

## Next Steps

After completing this workshop:

1. **Explore other MCP tools:** Envelope creation, workflow management, template analysis
2. **Build custom dashboards:** Use the data patterns for BI tools
3. **Integrate with existing systems:** Connect MCP data to CRM, ERP, or analytics platforms
4. **Develop automated workflows:** Set up monitoring for renewal opportunities

## Workshop Resources

- **Docusign Developer Center:** [developers.Docusign.com](https://developers.docusign.com)
- **MCP Documentation:** [modelcontextprotocol.io](https://modelcontextprotocol.io)
- **Sample Queries:** See `.github/copilot-instructions.md` for code patterns
---