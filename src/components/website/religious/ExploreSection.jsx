import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const cards = [
  { id: 1, title: "Trade & Commerce", img: "/images/trade.jpg" },
  { id: 2, title: "Tourism & Sightseeing", img: "/images/tourism.jpg" },
  { id: 3, title: "Explore", img: "/images/explore.jpg" },
  // ... more cards
];

export default function ExploreSection() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex gap-4 overflow-x-auto p-4">
      {cards.map(card => (
        <motion.div
          key={card.id}
          layoutId={card.id}
          onClick={() => setSelected(card)}
          className="relative w-48 h-72 rounded-2xl overflow-hidden cursor-pointer"
        >
          <img src={card.img} className="w-full h-full object-cover" />
          <div className="absolute bottom-2 left-2 text-white font-bold text-lg">
            {card.title}
          </div>
        </motion.div>
      ))}

      <AnimatePresence>
        {selected && (
          <motion.div
            layoutId={selected.id}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setSelected(null)}
          >
            <motion.div className="bg-white rounded-2xl p-6 w-11/12 md:w-2/3 lg:w-1/2">
              <img src={selected.img} className="w-full h-64 object-cover rounded-xl" />
              <h2 className="text-2xl font-bold mt-4">{selected.title}</h2>
              <p className="text-gray-600 mt-2">Full content goes here...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
