# Docusign MCP Workshop - AI Agent Instructions

## Project Overview

This is a **workshop repository** for teaching Docusign Model Context Protocol (MCP) integration with VS Code and GitHub Copilot. The project demonstrates how AI agents can query and analyze agreement data through natural language prompts using Docusign's MCP server.

**Core Purpose:** Educational workshop guiding users to analyze agreement portfolios using AI-powered queries (contract health, financial analysis, risk assessment, customer intelligence).

## Architecture & Key Components

### MCP Integration Structure
- **MCP Server:** Remote Docusign server at `https://services.demo.docusign.net/docusign-mcp-server/v1.0/mcp`
- **Authentication:** JWT bearer tokens (8-hour lifespan) from Docusign token generator
- **Configuration:** `.vscode/mcp.json` defines the MCP connection using `mcp-remote` via npx
- **Platform Variants:** `npx` (macOS/Linux) vs `npx.cmd` (Windows) in command configuration

### Repository Structure
```
.github/prompts/          # Six structured workshop exercises
  01-portfolio-health-check.md
  02-financial-analysis.md
  03-legal-compliance-risk.md
  04-operational-efficiency.md
  05-customer-relationship-intelligence.md
  06-advanced-ai-insights.md
.vscode/mcp.json         # MCP server configuration
README.md                # Workshop instructions and setup guide
```

## Developer Workflows

### Initial Setup Flow
1. User creates `.vscode/mcp.json` with MCP server configuration
2. User obtains JWT token from `https://developers.docusign.com/token-generator`
3. User inserts token into `mcp.json` Authorization header
4. User opens GitHub Copilot Chat in Agent Mode
5. User selects LLM model (GPT-4.x, Claude Sonnet, etc.)
6. User begins querying agreement data via natural language

### Token Management
- **Lifespan:** JWT tokens expire after 8 hours
- **Renewal Process:** Revisit token generator URL and update `mcp.json`
- **Common Error:** "Authentication failed" indicates expired token

### Platform-Specific Configuration
```jsonc
// macOS/Linux
"command": "npx"

// Windows
"command": "npx.cmd"
```

## Workshop Exercise Patterns

### Exercise Structure (All 6 Prompts Follow This Pattern)
1. **Business Question:** Real-world scenario (e.g., "What contracts expire soon?")
2. **Tasks:** 5 specific analysis prompts users can copy-paste into Copilot
3. **Expected Insights:** What users should discover from the data
4. **Follow-up Questions:** Deeper analysis suggestions

### Analysis Categories
- **Portfolio Health:** Expiring agreements, renewal deadlines, missing data
- **Financial:** Total contract value, revenue distribution, payment terms, currency exposure
- **Legal/Compliance:** Governing law, termination clauses, liability caps, assignment restrictions
- **Operational:** Standardization opportunities, automation candidates
- **Customer Intelligence:** Multi-agreement customers, lifetime value, cross-sell opportunities
- **AI Insights:** Seasonal patterns, anomaly detection, predictive modeling prep

## Project-Specific Conventions

### Natural Language Query Style
Users interact with Copilot using business-focused prompts like:
```
"Show me all agreements expiring in the next 90-120 days"
"What is the total value of all active agreements?"
"Which agreements have restrictions on assignment?"
```

### Agreement Data Model (Inferred from Prompts)
Key fields AI agents should expect in Docusign agreement data:
- `agreement_name`, `counterparty`, `agreement_type` (MSA, SOW, License, Service Agreement)
- `contract_value`, `currency`, `payment_terms` (30/60/90-day)
- `expiration_date`, `renewal_date`, `renewal_notification_deadline`
- `governing_law` (jurisdiction), `status` (active, pending, expired)
- `termination_clause`, `assignment_restrictions`, `liability_cap`, `late_payment_fee`

### Common Troubleshooting Patterns
When users report errors, check these specific issues first:
1. **"spawn npx.cmd ENOENT"** → Wrong platform command (Windows cmd on Unix)
2. **"Authentication failed"** → Expired JWT token (>8 hours old)
3. **"No MCP tools available"** → VS Code needs restart after `mcp.json` creation
4. **"Network connection"** → Firewall blocking `api-docusign.com`

## Critical Implementation Details

### MCP Configuration Requirements
The `mcp.json` file requires exact structure:
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

### Workshop Exercise Progression
Exercises build in complexity (`.github/prompts/` numbered 01-06):
1. Start with simple queries (count, recent items)
2. Progress to calculations (totals, breakdowns)
3. Advance to pattern analysis (trends, anomalies)
4. Culminate in strategic insights (predictive modeling prep)

## When Helping Users

### Focus On
- **Ensuring correct MCP configuration** for their OS platform
- **Guiding through JWT token acquisition** and insertion
- **Explaining how to use the 6 prompt templates** in `.github/prompts/`
- **Interpreting agreement data** returned by MCP queries
- **Troubleshooting the 4 common error patterns** listed above

### Avoid
- Creating new analysis code (workshop uses natural language queries, not scripts)
- Suggesting Python/JavaScript data analysis (MCP handles queries server-side)
- Modifying workshop exercise files (they're reference templates)
- Adding authentication methods beyond JWT (Docusign MCP requires JWT)

## Key Files Reference

- **`.vscode/mcp.json`** - Only file users must create/modify (MCP connection config)
- **`README.md`** - Primary workshop guide with setup steps and exercise overview
- **`.github/prompts/*.md`** - 6 structured exercises with copy-paste prompts
- **No package.json** - Workshop uses npx for zero-install MCP client

## Testing & Validation

Users validate setup by asking GitHub Copilot:
```
"How many agreements do I have?"
"Show me my most recent agreements"
"What's the total value of my active contracts?"
```

Successful queries confirm:
1. MCP server connectivity
2. Valid JWT authentication
3. Agreement data access
4. AI agent comprehension of Docusign data structure
