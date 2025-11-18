require('dotenv').config();

const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const cors = require('cors');

const app = express();
app.use(cors());

// Cache for 7 minutes
const cache = new NodeCache({ stdTTL: 60 * 7 });

// ENV
const NEWS_KEY = process.env.NEWS_API_KEY;
const NEWS_PROVIDER = process.env.NEWS_PROVIDER || "newsdata";

// ----------------------------------------
// MAIN ROUTE
// ----------------------------------------
app.get('/api/news', async (req, res) => {

  const lang = req.query.lang || req.query.language || 'en';
  const country = req.query.country || 'in';
  const category = req.query.category || 'all';
  const q = req.query.q || '';
  const cacheBypass = req.query._t ? true : false;  // 👈 timestamp forces fresh fetch

  const cacheKey = `news:${country}:${lang}:${category}:${q}`;

  // SKIP CACHE if _t is present
  if (!cacheBypass) {
    const cached = cache.get(cacheKey);
    if (cached) return res.json(cached);
  }

  try {

    // ------------------------------------
    // NEWS DATA PROVIDER (FREE TIER)
    // ------------------------------------
    if (NEWS_PROVIDER === 'newsdata') {
      const params = {
        apikey: NEWS_KEY,
        country,
        language: lang,
        category: category === 'all' ? undefined : category,
        q: q || undefined   // 👈 delete empty q
      };

      // Clean up undefined or empty values
      Object.keys(params).forEach(k => {
        if (!params[k]) delete params[k];
      });

      const { data } = await axios.get("https://newsdata.io/api/1/news", { params });

      if (!cacheBypass) cache.set(cacheKey, data);

      return res.json(data);
    }

    // ------------------------------------
    // GNEWS PROVIDER
    // ------------------------------------
    if (NEWS_PROVIDER === "gnews") {
      const params = {
        token: NEWS_KEY,
        country,
        lang,
        max: 50,
        topic: category === "all" ? undefined : category,
        q: q || undefined
      };

      Object.keys(params).forEach(k => {
        if (!params[k]) delete params[k];
      });

      const { data } = await axios.get("https://gnews.io/api/v4/top-headlines", { params });

      if (!cacheBypass) cache.set(cacheKey, data);

      return res.json(data);
    }

    return res.status(400).json({ error: "unsupported provider" });

  } catch (err) {
    console.error("API ERROR:", err?.response?.data || err.message);
    return res.status(500).json({ error: "failed to fetch news" });
  }
});

// ----------------------------------------
// HEALTH CHECK
// ----------------------------------------
app.get('/api/ping', (_, res) => res.json({ ok: true }));

// ----------------------------------------
// START SERVER
// ----------------------------------------
const PORT = process.env.PORT || 8787;
app.listen(PORT, () => console.log("Server listening on", PORT));
app.get("/api/reverse-geo", async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const { data } = await axios.get(
      `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "reverse geo failed" });
  }
});
