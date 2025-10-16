"use client"

import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";

const SLIDE_INTERVAL_MS = 3000

// Example slides: replace src with your own image paths if needed.
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
export default function MobileViewSlider() {
  const [index, setIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(null)
  const timerRef = useRef(null)
  const containerRef = useRef(null)

  const goTo = (i) => {
    setIndex((i + slides.length) % slides.length)
    setPrevIndex(index)
  }

  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const startTimer = () => {
    clearTimer()
    timerRef.current = setInterval(() => {
      setIndex((curr) => (curr + 1) % slides.length)
    }, SLIDE_INTERVAL_MS)
  }

  useEffect(() => {
    startTimer()
    return clearTimer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  // Pause on hover
  const onMouseEnter = () => clearTimer()
  const onMouseLeave = () => startTimer()

  const active = slides[index]
  const textBlock = (
    <div className="shrink-0 max-w-xl w-full">
      <h2 className="text-xl md:text-2xl font-semibold mb-2">{active.title}</h2>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">{active.description}</p>
      <Link to={active.cta.href}>
        <button
          className='zatra-btn-fill cursor-pointer'
          type="button"
        >
          {active.cta.label}
        </button>
      </Link>
    </div>
  )

  return (
    <section
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className=""
      aria-roledescription="carousel"
      aria-label="Image slider"
    >
      {/* Top row: Active image with conditional info panel */}
      <div className="flex flex-col items-center gap-6 md:gap-8">
        {/* Conditionally place text to the left when index >= 3 */}

        {/* Active image */}
        <figure className="relative w-full md:max-w-2xl overflow-hidden rounded-xl shadow-sm">
          <img
            key={active.id} // Forces re-render so animation restarts
            src={active.src || "/placeholder.svg"}
            alt={active.alt}
            className={`h-[260px] md:h-[360px] w-full object-cover transition-opacity duration-300 ${prevIndex === null ? "opacity-100" : "opacity-0"}`}
            crossOrigin="anonymous"
          />

          {/* <figcaption className="pointer-events-none absolute bottom-3 left-3 right-3">
            <span className="inline-block rounded-md bg-black/60 text-white px-3 py-1 text-xs md:text-sm">
              {active.title}
            </span>
          </figcaption> */}

          {/* Controls */}
        </figure>

        {/* Text on the right for slides 1–3 */}
        {textBlock}
      </div>

      {/* Thumbnails */}
      <div className="mt-5 grid grid-cols-6 gap-3">
        {slides.map((s, i) => {
          const isActive = i === index
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                goTo(i)
                startTimer()
              }}
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={isActive}
              className={`group relative overflow-hidden rounded-lg border transition ${isActive ? "ring-2 ring-primary" : "hover:border-foreground/30"
                }`}
            >
              <img
                src={s.src || "/placeholder.svg"}
                alt={s.alt}
                className={`h-20 w-full object-cover ${isActive ? "" : "opacity-90 group-hover:opacity-100"}`}
                crossOrigin="anonymous"
              />
              <span className="sr-only">{s.title}</span>
              {isActive && (
                <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[10px] text-white">
                  {i + 1} / {slides.length}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}
