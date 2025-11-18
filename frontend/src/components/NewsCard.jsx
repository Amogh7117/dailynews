import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function NewsCard({ article }) {

  // ⭐ Safe fallback image
  const fallbackImg = "/placeholder.jpg";

  const imgSrc =
    article?.image &&
    article.image !== "null" &&
    article.image !== "" &&
    article.image !== "undefined"
      ? article.image
      : fallbackImg;

  // ⭐ Safe date formatting
  const formatDate = (d) => {
    if (!d) return "";
    try {
      return format(new Date(d), "dd MMM yyyy");
    } catch {
      return d;
    }
  };

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 150 }}
      className="block bg-white/10 backdrop-blur-md rounded-xl overflow-hidden 
                 border border-white/10 shadow-lg hover:shadow-xl 
                 transition-all duration-300"
    >
      {/* IMAGE */}
      <div className="h-48 w-full bg-gray-900 overflow-hidden">
        <img
          src={imgSrc}
          alt={article.title || "News image"}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => (e.currentTarget.src = fallbackImg)}
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        {/* TITLE */}
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 leading-tight">
          {article.title || "Untitled headline"}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-gray-300 text-sm line-clamp-3">
          {article.description || "No description available."}
        </p>

        {/* FOOTER */}
        <div className="flex justify-between mt-4 text-xs text-gray-400">
          <span>{article.source || "Unknown Source"}</span>
          <span>{formatDate(article.pubDate)}</span>
        </div>
      </div>
    </motion.a>
  );
}
