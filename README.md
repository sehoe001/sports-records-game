# Sports Records Guessing Game

A trivia game about single-season sports records from the NFL, NBA, MLB, and NHL.

## Deployment to Cloudflare Pages

1. First, install the Cloudflare CLI:
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Create a new Cloudflare Pages project:
```bash
# Go to https://dash.cloudflare.com
# Navigate to Pages
# Click "Create a project"
# Connect your GitHub repository
```

4. Configure the build settings in Cloudflare Pages:
- Build command: `npm run build`
- Build output directory: `client/build`
- Root directory: `/`

5. Configure environment variables:
- No environment variables are required for this project

6. Deploy!
- The site will automatically deploy when you push to the main branch
- You can also trigger manual deploys from the Cloudflare dashboard

## Development

To run locally:

1. Install dependencies:
```bash
cd client && npm install
```

2. Start the development server:
```bash
npm start
```

## Project Structure

- `/client` - React frontend application
- `/functions` - Cloudflare Pages Functions (serverless API)
  - `/api/[[route]].js` - API routes for the game

## Features

- Single-season sports records trivia
- Autocomplete player search
- Progressive clue reveal system
- Support for NFL, NBA, MLB, and NHL records
- Case-insensitive answer checking
