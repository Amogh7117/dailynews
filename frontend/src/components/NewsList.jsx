import React from "react";
import NewsCard from "./NewsCard";
import { motion } from "framer-motion";

export default function NewsList({ articles }) {
  // Handle empty states
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10 text-lg">
        No articles found.
      </div>
    );
  }

  return (
    <section
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-6
        w-full
        auto-rows-fr
      "
    >
      {articles.map((a, i) => (
        <motion.div
          key={a.url || i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.04 }}
          className="flex h-full"
        >
          <NewsCard article={a} />
        </motion.div>
      ))}
    </section>
  );
}
