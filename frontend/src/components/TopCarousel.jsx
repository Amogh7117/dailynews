// frontend/src/components/TopCarousel.jsx
import React from "react";
import { motion } from "framer-motion";

export default function TopCarousel({ articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="w-full overflow-x-auto hide-scrollbar py-4">
      <div className="flex gap-4">
        {articles.slice(0, 10).map((a, i) => {
          const imgSrc =
            a.image && a.image !== "null" && a.image !== ""
              ? a.image
              : "/placeholder.jpg";

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="min-w-[260px] bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/10"
            >
              {/* Image */}
              <div className="h-40 w-full bg-gray-800 overflow-hidden">
                <img
                  src={imgSrc}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                />
              </div>

              {/* Title */}
              <div className="p-3">
                <h3 className="text-sm font-semibold text-white line-clamp-2">
                  {a.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
