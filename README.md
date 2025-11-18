# DailyNation — Complete Starter (Frontend + Server)

This archive contains a complete starter project for the DailyNation news app:
- Frontend: Vite + React + Tailwind CSS + Framer Motion
- Backend: Express proxy for news API with caching

## Quick start (frontend)
cd frontend
npm install
# create .env with:
# VITE_NEWS_PROVIDER=newsdata
# VITE_NEWS_API_KEY=your_newsdata_key_here
# VITE_BACKEND_PROXY=http://localhost:8787
npm run dev

## Server (proxy)
cd server
npm install
# create .env with NEWS_PROVIDER and NEWS_API_KEY
node index.js

## Notes
- Use the backend proxy to keep API keys secret and to cache responses to avoid hitting free-tier limits.
- Tailwind is already configured in the frontend.
- Framer Motion is installed and used in components for smooth animations.
