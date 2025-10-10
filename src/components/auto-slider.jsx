import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


const SLIDE_INTERVAL_MS = 3000;

const slides = [
  {
    id: 1,
    title: "Trade & Commerce",
    description:
      "Discover thriving markets and global business opportunities.Experience commerce, partnerships, and opportunities that drive progress",
    cta: { label: "Explore ZATRA", href: "#" },
    src: "/slide2/slide1.png",
    alt: "Snow-capped mountains and a serene lake",
  },
  {
    id: 2,
    title: "Tourism & Sightseeing",
    description: "Explore sights, celebrate traditions, enjoy authentic flavours, expand trade opportunities, and experience global care.",
    cta: { label: "Explore ZATRA", href: "#" },
    src: "/slide2/slide2.png",
    alt: "Technology concept with circuits",
  },
  {
    id: 3,
    title: "Explore",
    description: "Explore breathtaking destinations, cultural heritage, authentic tastes, thriving trade, and trusted treatment.",
    cta: { label: "Explore ZATRA", href: "#" },
    src: "/slide2/slide3.png",
    alt: "Gourmet plated food",
  },
  {
    id: 4,
    title: "Treatment & Wellness",
    description: "Explore advanced healthcare and complete wellness on your journey, where expert care meets.",
    cta: { label: "Explore ZATRA", href: "#" },
    src: "/slide2/slide4.png",
    alt: "Colorful cultural festival",
  },
  {
    id: 5,
    title: "Tradition & Arts",
    description: "Explore timeless traditions and arts that celebrate culture and heritage. Discover rich traditions and artistic expressions that bring history to life.",
    cta: { label: "Explore ZATRA", href: "#" },
    src: "/slide2/slide5.png",
    alt: "Spa wellness scene",
  },
  {
    id: 6,
    title: "Taste & Culinary",
    description: "Savor authentic flavors and culinary delights from every corner.Indulge in flavors that tell the story of culture and tradition.",
    cta: { label: "Explore ZATRA", href: "#" },
    src: "/slide2/slide6.png",
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
    // startTimer();
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

  // Pause on hover
  const onMouseEnter = () => clearTimer();
  const onMouseLeave = () => console.log("onMouseLeave");

  const active = slides[index];
  const textOnRight = index <= 2;

  const textBlock = (
    <div className="">
      <h2 className="text-xl md:text-2xl font-semibold mb-2">{active.title}</h2>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
        {active.description}
      </p>
      <Link to={active.cta.href}>
        <button
          className='zatra-btn-fill cursor-pointer'
          type="button"
        >
          {active.cta.label}
        </button>
      </Link>
    </div>
  );

  const renderSmallThumb = (s, i) => (
    <button
      key={s.id}
      type="button"
      onClick={() => {
        goTo(i);
        // startTimer();
      }}
      aria-label={`Go to slide ${i + 1}`}
      aria-selected={i === index}
      className={`group relative overflow-hidden rounded-xl  transition-all duration-300 shrink-0 ${i === index ? "ring-2 ring-webprimary" : ""
        }`}
    >
      <img
        src={s.src || "/placeholder.svg"}
        alt={s.alt}
        className="h-16 w-10 md:h-44 md:w-36 object-cover"
        crossOrigin="anonymous"
      />
      <span className="sr-only">{s.title}</span>
    </button>
  );

  const renderActiveSlide = (s) => (
    <figure
      key={`active-${s.id}`}
      className="relative overflow-hidden rounded-xl shadow-sm shrink-0 transition-all duration-300 h-56 w-32 md:h-[424px] md:w-[370px]"
    >
      <img
        src={s.src || "/placeholder.svg"}
        alt={s.alt}
        className="h-full w-full object-cover"
        crossOrigin="anonymous"
      />
      {/* <figcaption className="pointer-events-none absolute bottom-3 left-3 right-3">
        <span className="inline-block rounded-md bg-black/60 text-white px-3 py-1 text-xs md:text-sm">
          {s.title}
        </span>
      </figcaption> */}
    </figure>
  );

  const leftSlides = slides.slice(0, index);
  const rightSlides = slides.slice(index + 1);

  return (
    <section
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className=""
      aria-roledescription="carousel"
      aria-label="Image slider"
    >
      <div className="flex relative items-start justify-center gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-2">
        <div className={`flex gap-2 lg:gap-4 flex-col`}>
          <div className="flex gap-2 lg:gap-4">
            {leftSlides.map((s, i) => renderSmallThumb(s, i))}
          </div>
          <div>{!textOnRight && textBlock}</div>
        </div>

        {renderActiveSlide(active)}

        <div className={`flex gap-2 lg:gap-4 flex-col`}>
          <div className="flex gap-2 lg:gap-4">
            {rightSlides.map((s, i) => renderSmallThumb(s, index + 1 + i))}
          </div>
          <div>{textOnRight && textBlock}</div>
        </div>
      </div>
    </section>
  );
}
