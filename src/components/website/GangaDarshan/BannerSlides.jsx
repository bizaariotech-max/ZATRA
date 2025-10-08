import React from 'react'

import slide1 from "../../../assets/images/website/ganga-darshan/slide1.png";
import slide2 from "../../../assets/images/website/ganga-darshan/slide2.png";
import slide3 from "../../../assets/images/website/ganga-darshan/slide3.png";
import slide4 from "../../../assets/images/website/ganga-darshan/slide4.png";
import slide5 from "../../../assets/images/website/ganga-darshan/slide5.png";


import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slideData = [
  {
    id: 1,
    img: slide1,
  },
  {
    id: 2,
    img: slide2,
  },
  {
    id: 3,
    img: slide3,
  },
  {
    id: 4,
    img: slide4,
  },
  {
    id: 5,
    img: slide5,
  },
];

const BannerSlides = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    autoplay: false,
    autoplaySpeed: 4000,
    pauseOnHover: true,

    arrows: false,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
  };
  return (
    <section id='hero-slider' className='hero-slider'>
      <div className="container pt-5 md:pt-12">
        <Slider {...settings}>
          {slideData.map((slide) => (
            <div key={slide.id} className="px-2" >
              <img
                src={slide.img}
                alt="slide"
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}

        </Slider>
      </div>
      <style jsx>
        {`
        .slick-dots li button:before {
  font-size: 13px;
  color: #ccc !important;
  opacity: 1;
}

.slick-dots li.slick-active button:before {
  color: var(--web-primary) !important;
  font-size: 13px;
}
        `}

      </style>
    </section>
  )
}

export default BannerSlides

