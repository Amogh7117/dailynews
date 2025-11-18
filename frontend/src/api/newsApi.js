import axios from 'axios';

export async function fetchTopNewsForCountry({
  country = "in",
  lang = "en",
  category = "all",
  limit = 50,
  q
}) {
  const PROVIDER = import.meta.env.VITE_NEWS_PROVIDER || "newsdata";
  const PROXY = import.meta.env.VITE_BACKEND_PROXY || "http://localhost:8787";

  // Always hit backend with timestamp → fresh news on each reload
  const proxy = async (params) => {
    const resp = await axios.get(`${PROXY}/api/news`, {
      params: {
        ...params,
        _t: Date.now(),   // 👈 cache-buster
      }
    });
    return resp.data;
  };

  const all = [];

  // -----------------------------
  // NEWS DATA PROVIDER (Free tier)
  // -----------------------------
  if (PROVIDER === "newsdata") {
    const params = {
      country,
      lang,
      category: category === "all" ? undefined : category,
      q
    };

    const data = await proxy(params);
    const results = data.results || [];

    results.slice(0, limit).forEach((it) => {
      all.push({
        title: it.title,
        description: it.description,
        source:
          it.source_id ||
          it.creator?.[0] ||
          it.source_name ||
          "Unknown Source",
        url: it.link,
        image: it.image_url,
        pubDate: it.pubDate,
      });
    });

    return all;
  }

  // -----------------------------
  // GNEWS (if selected)
  // -----------------------------
  if (PROVIDER === "gnews") {
    const params = {
      token: import.meta.env.VITE_NEWS_API_KEY,
      country,
      lang,
      max: 50,
      topic: category === "all" ? undefined : category,
      q,
    };

    const data = await proxy(params);
    const articles = data.articles || [];

    articles.forEach((a) => {
      all.push({
        title: a.title,
        description: a.description,
        url: a.url,
        image: a.image,
        source: a.source?.name,
        pubDate: a.publishedAt,
      });
    });

    return all;
  }

  return [];
}
