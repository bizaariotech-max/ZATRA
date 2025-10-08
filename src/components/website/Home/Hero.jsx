import React, { useState } from 'react';
import banner1 from '../../../assets/images/website/banner1.png';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../../../assets/images/website/hero/slide1.png";
import slide2 from "../../../assets/images/website/hero/slide2.png";
import slide3 from "../../../assets/images/website/hero/slide3.png";
import slide4 from "../../../assets/images/website/hero/slide4.png";
import slide5 from "../../../assets/images/website/hero/slide5.png";
import slide6 from "../../../assets/images/website/hero/slide6.png";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const slideData = [
  {
    id: 1,
    title: "Tourism & Sightseeing",
    subtitle: "Explore sights, celebrate traditions, enjoy authentic flavours, expand trade opportunities, and experience global care.",
    img: slide1,
  },
  {
    id: 2,
    title: "Varanasi",
    subtitle: "Banarasi Silk Sarees are a symbol of timeless beauty and craftsmanship.",
    img: slide2,
  },
  {
    id: 3,
    title: "Art & Culture",
    subtitle: "Immerse yourself in India's vibrant cultural heritage and artistic traditions.",
    img: slide3,
  },
  {
    id: 4,
    title: "Spirituality",
    subtitle: "Experience the divine essence of ancient Indian spirituality and rituals.",
    img: slide4,
  },
  {
    id: 5,
    title: "Cuisine",
    subtitle: "Delight your taste buds with India's diverse and flavorful regional dishes.",
    img: slide5,
  },
  {
    id: 6,
    title: "Festivals",
    subtitle: "Celebrate colors, lights, and unity in India’s vibrant festivals.",
    img: slide6,
  },
];

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "10px",
    cssEase: "linear",
    beforeChange: (current, next) => setActiveSlide(next),
    autoplay: false,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, centerMode: true },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, centerMode: true },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerMode: true },
      },
    ],
  };

  return (
    <section
      className=""
      style={{
        backgroundImage: `url(${banner1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container pb-10 sm:pb-[100px] relative">
        <h1 className="text-2xl md:text-4xl font-bold text-center py-5 sm:py-[40px]">
          The 5T Promise: Experience. Connect. Thrive.
        </h1>

        {/* Slider */}
        <Slider {...settings}>
          {slideData.map((slide, index) => (
            <div key={slide.id}>
              <div className="relative">
                <img
                  src={slide.img}
                  alt={`Slide ${slide.id}`}
                  className="w-full h-auto rounded-xl"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white text-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                  <h2 className="text-2xl md:text-3xl font-bold">{slide.title}</h2>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Subtitle outside active slide */}
        <div className=" mt-3 bg-white/60 px-6 py-3 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold">    {slideData[activeSlide]?.title}</h2>
          <p className="text-lg  font-semibold text-gray-900   py-3 rounded-lg inline-block ">


            {slideData[activeSlide]?.subtitle}
          </p>
          <button className='zatra-btn-fill  block mt-1 px-12 '>
            Explore ZATRA
          </button>
        </div>
      </div>

      {/* Styling for scale/active effect */}
      <style jsx>{`
        .slick-slide {
          transition: transform 0.5s ease, opacity 0.5s ease;
          opacity: 0.7;
          transform: scale(0.8);
          padding-block:20px;

        }
        .slick-center {
          transform: scale(1.1);
          opacity: 1;
          z-index: 2;
          padding-inline: 10px;
        }
      `}</style>
    </section>
  );
};

export default Hero;

export const NextArrow = ({ onClick }) => (
  <div
    className=" absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-[#373027] p-2 rounded-full shadow-md hover:bg-webprimary transition border-white border"
    onClick={onClick}
  >
    <IoIosArrowForward className="w-5 h-5 text-white " size={28} />
  </div>
);

export const PrevArrow = ({ onClick }) => (
  <div
    className=" absolute md:left-0  top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-[#373027] p-2 rounded-full shadow-md hover:bg-webprimary transition border border-white"
    onClick={onClick}
  >
    <IoIosArrowBack className="w-5 h-5 text-white " />
  </div>
);
