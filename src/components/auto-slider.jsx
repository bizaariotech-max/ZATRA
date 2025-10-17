import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const SLIDE_INTERVAL_MS = 3000;

const slides = [
  {
    id: 1,
    title: "Trade & Commerce",
    description:
      "Discover thriving markets and global business opportunities.Experience commerce, partnerships, and opportunities that drive progress.",
    cta: { label: "Explore ZATRA", href: "#" },
    src:"/slide2/slide6.png",
    alt: "Snow-capped mountains and a serene lake",
  },
  {
    id: 2,
    title: "Tourism & Sightseeing",
    description:
      "Explore sights, celebrate traditions, enjoy authentic flavours, expand trade opportunities, and experience global care.",
    cta: { label: "Explore ZATRA", href: "#" },
    src: "/slide2/slide2.png",
    alt: "Technology concept with circuits",
  },
  {
    id: 3,
    title: "Explore",
    description:
      "Explore breathtaking destinations, cultural heritage, authentic tastes, thriving trade, and trusted treatment.",
    cta: { label: "Explore ZATRA", href: "#" },
    src: "/slide2/slide1.png",
    alt: "Gourmet plated food",
  },
  {
    id: 4,
    title: "Treatment & Wellness",
    description:
      "Explore advanced healthcare and complete wellness on your journey, where expert care meets.",
    cta: { label: "Explore ZATRA", href: "#" },
    src: "/slide2/slide3.png",
    alt: "Colorful cultural festival",
  },
  {
    id: 5,
    title: "Tradition & Arts",
    description:
      "Explore timeless traditions and arts that celebrate culture and heritage. Discover rich traditions and artistic expressions that bring history to life.",
    cta: { label: "Explore ZATRA", href: "#" },
    src: "/slide2/slide4.png",
    alt: "Spa wellness scene",
  },
  {
    id: 6,
    title: "Taste & Culinary",
    description:
      "Savor authentic flavors and culinary delights from every corner. Indulge in flavors that tell the story of culture and tradition.",
    cta: { label: "Explore ZATRA", href: "#" },
    src: "/slide2/slide5.png",
    alt: "Business trade opportunities",
  },
];

export default function AutoSlider() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const containerRef = useRef(null);

  const goTo = (i) => {
    setIndex((i + slides.length) % slides.length);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = () => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setIndex((curr) => (curr + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
  };

  useEffect(() => {
    // Uncomment below line if you want it to auto-slide
    startTimer();
    return clearTimer;
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const onMouseEnter = () => clearTimer();
  const onMouseLeave = () => startTimer();

  const active = slides[index];

  return (
    <section
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative w-full flex flex-col items-center"
      aria-roledescription="carousel"
      aria-label="Image slider"
    >
      <div className="flex flex-col overflow-x-auto hide-scrollbar pb-4 px-4">
        <div className="flex gap-4 md:gap-6  relative">
          {slides.map((s, i) => {
            const isActive = i === index;
            const showRight = index <= 2; // show right side if index <= 2
            return (
              <div key={s.id} className="relative flex ">
                {/* Slide Thumbnail */}
                <button
                  type="button"
                  onClick={() => {goTo(i)
                    startTimer();
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-selected={isActive}
                  className={`relative transition-all duration-500 ease-in-out rounded-xl overflow-hidden flex-shrink-0
                  ${isActive
                      ? "h-56 w-32 md:h-[380px] md:w-[350px] scale-105  shadow-lg"
                      : "h-16 w-10 md:h-44 md:w-36 opacity-80 hover:opacity-100"
                    }`}
                >
                  <img
                    src={s.src}
                    alt={s.alt}
                    className="h-full w-full object-cover"
                    crossOrigin="anonymous"
                  />
                </button>

                {/* Active text beside active image */}
                {isActive && (
                  <div
                    className={`absolute top-1/2 transform w-[400px] p-4  z-10
                    ${showRight ? "left-full ml-4" : "mr-4 right-full "}`}
                  >
                    <h2 className="text-lg md:text-xl font-semibold mb-2 text-webprimary">
                      {s.title}
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-3">
                      {s.description}
                    </p>
                    <Link to={s.cta.href}>
                      <button className="zatra-btn-fill cursor-pointer" type="button">
                        {s.cta.label}
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

