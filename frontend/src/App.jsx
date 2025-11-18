// frontend/src/App.jsx
import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import LanguageSwitcher from "./components/LanguageSwitcher";
import CountrySelector from "./components/CountrySelector";
import CategoryFilter from "./components/CategoryFilter";
import SearchBar from "./components/SearchBar";
import TrendingCarousel from "./components/TrendingCarousel";
import TopCarousel from "./components/TopCarousel";
import NewsList from "./components/NewsList";
import Loader from "./components/Loader";
import Bookmarks from "./components/Bookmarks";
import Translator from "./components/Translator";
import MarketWidget from "./components/MarketWidget";
import WeatherWidget from "./components/WeatherWidget";
import InfiniteScrollWrapper from "./components/InfiniteScrollWrapper";


import { translateText } from "./utils/translate";
import { fetchTopNewsForCountry } from "./api/newsApi";

export default function App() {
  const [country, setCountry] = useState("in");
  const [languages, setLanguages] = useState(["en"]);
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const [articles, setArticles] = useState([]);
  const [originalArticles, setOriginalArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [translateLang, setTranslateLang] = useState("en");

  // ------------------------------------------------------
  // FETCH NEWS
  // ------------------------------------------------------
  const loadNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchTopNewsForCountry({
        country,
        languages,
        category,
        limit: 50,
        q: query || undefined,
      });

      setOriginalArticles(data);
      setArticles(data);
      setVisibleCount(9);

      // auto-translate
      if (translateLang !== "en") {
        applyTranslation(data, translateLang);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch news.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
    // eslint-disable-next-line
  }, [country, languages, category]);

  const doSearch = (q) => {
    setQuery(q);
    loadNews();
  };

  // ------------------------------------------------------
  // TRANSLATION
  // ------------------------------------------------------
  const applyTranslation = async (list, lang) => {
    const translated = await Promise.all(
      list.map(async (item) => ({
        ...item,
        title: await translateText(item.title, lang),
        description: await translateText(item.description, lang),
      }))
    );
    setArticles(translated);
  };

  const handleTranslate = (lang) => {
    setTranslateLang(lang);

    if (lang === "en") {
      setArticles(originalArticles);
      return;
    }

    applyTranslation(originalArticles, lang);
  };

  // ------------------------------------------------------
  // RENDER UI
  // ------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0b1523] text-white">

      <Header title="DailyNation — Top 50 News" />

      <div className="w-full flex justify-center mt-4">
        <WeatherWidget />
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-10">

        {/* TRANSLATOR */}
        <div className="flex justify-end">
          <Translator onTranslate={handleTranslate} />
        </div>

        {/* CONTROLS */}
        <section className="flex flex-col lg:flex-row gap-4">

          <CountrySelector country={country} setCountry={setCountry} />

          <LanguageSwitcher
            languages={languages}
            setLanguages={setLanguages}
          />

          <CategoryFilter
            category={category}
            setCategory={setCategory}
          />

          <div className="flex-1">
            <SearchBar onSearch={doSearch} />
          </div>
        </section>

        {/* MARKET WIDGET */}
        <section className="flex flex-wrap gap-4">
          <MarketWidget />
        </section>

        {/* TRENDING */}
        <TrendingCarousel
          items={[
            { title: "Market Rally", summary: "Stocks up 2.3% today" },
            { title: "Election Update", summary: "Key states reporting" },
            { title: "Sports: Finals", summary: "MVP announced" },
          ]}
        />

        {/* TOP SLIDER */}
        <TopCarousel articles={articles} />

        {loading && <Loader />}
        {error && <div className="text-red-400 text-center">{error}</div>}

        {/* ⭐ INFINITE SCROLL NEWS LIST ⭐ */}
        {/* NEWS LIST + INFINITE SCROLL */}
<InfiniteScrollWrapper
  hasMore={visibleCount < articles.length}
  loadMore={() =>
    setVisibleCount((prev) =>
      prev + 9 > articles.length ? articles.length : prev + 9
    )
  }
>
  {articles.length > 0 ? (
    <NewsList articles={articles.slice(0, visibleCount)} />
  ) : (
    !loading && (
      <div className="text-center text-gray-400 py-10 text-lg">
        No articles found.
      </div>
    )
  )}
</InfiniteScrollWrapper>


        <Bookmarks />
      </main>

      <footer className="py-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} DailyNation
      </footer>
    </div>
  );
}
