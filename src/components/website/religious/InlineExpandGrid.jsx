import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import img1 from "../../../assets/images/website/religious/img1.png";
import img2 from "../../../assets/images/website/religious/img2.png";
import img3 from "../../../assets/images/website/religious/img3.png";
import img4 from "../../../assets/images/website/religious/img4.png";
import img5 from "../../../assets/images/website/religious/img5.png";
import img6 from "../../../assets/images/website/religious/img6.png";

const cards = [
  {
    id: 1,
    title: "Trade & Commerce",
    img: img1,
    content:
      "Explore how trade and commerce are evolving with new technologies and opportunities.",
  },
  {
    id: 2,
    title: "Tourism & Sightseeing",
    img: img2,
    content:
      "Discover the most scenic and historical destinations around the world.",
  },
  {
    id: 3,
    title: "Explore",
    img: img3,
    content:
      "Dive deeper into various sectors and uncover hidden gems worth exploring.",
  },
  {
    id: 4,
    title: "Treatment & Wellness",
    img: img4,
    content:
      "Learn about the wellness traditions that enhance both mind and body.",
  },
  {
    id: 5,
    title: "Tradition & Arts",
    img: img5,
    content:
      "Experience the beauty of ancient arts and cultural traditions worldwide.",
  },
  {
    id: 6,
    title: "Taste & Culinary",
    img: img6,
    content:
      "Savor the flavors and recipes that define global cuisines and culinary excellence.",
  },
];

export default function InlineExpandGrid() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-8 bg-gray-50">
      {cards.map((card) => {
        const isExpanded = expandedId === card.id;
        return (
          <motion.div
            key={card.id}
            layout
            onClick={() => setExpandedId(isExpanded ? null : card.id)}
            className={`relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all ${isExpanded ? "w-full md:w-[300px] h-[256px]" : "w-48 md:w-[200px]"
              }`}
          >
            <motion.img
              layout
              src={card.img}
              alt={card.title}
              className={`w-full object-cover  ${isExpanded ? "h-80 md:h-[256px]" : "h-64"
                }`}
            />
            <motion.div layout className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {card.title}
              </h3>
              <AnimatePresence>
                {isExpanded && (
                  <motion.p
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-600 text-sm mt-2"
                  >
                    {card.content}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
