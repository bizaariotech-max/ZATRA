import React from 'react'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import slide1 from "../../../assets/images/website/home/s1.png";
import slide2 from "../../../assets/images/website/home/s2.png";
import slide3 from "../../../assets/images/website/home/s3.png";
import slide4 from "../../../assets/images/website/home/s4.png";
import slide5 from "../../../assets/images/website/home/s5.png";
import FormButton from '../../common/FormButton';
// import { ChevronLeft, ChevronRight } from "lucide-react";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const slideData = [
  {
    id: 1,
    title: "Varanasi",
    subtitle: "Banarasi Silk Sarees",
    img: slide1,
  },
  {
    id: 2,
    title: "Varanasi",
    subtitle: "Banarasi Silk Sarees",
    img: slide2,
  },
  {
    id: 3,
    title: "Varanasi",
    subtitle: "Banarasi Silk Sarees",
    img: slide3,
  },
  {
    id: 4,
    title: "Varanasi",
    subtitle: "Banarasi Silk Sarees",
    img: slide4,
  },
  {
    id: 5,
    title: "Varanasi",
    subtitle: "Banarasi Silk Sarees",
    img: slide5,
  },
];


const OneDistrict = () => {

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      // partialVisibilityGutter: 24,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 1,
      // partialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      // partialVisibilityGutter: 16,
    },
  }



  return (
    <>
      <section className="space-top one-district-section relative">

        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-0 gap-5 p-0">
          <div className="  relative ">
            <Carousel
              responsive={responsive}
              infinite
              keyBoardControl
              swipeable
              draggable
              showDots={false}
              containerClass=""
              itemClass="ps-0 pt-0"
              arrows={true}
              renderButtonGroupOutside={false}
              partialVisible
            >
              {slideData.map((slide) => (
                <div key={slide.id} className=" relative" >
                  <div style={{ backgroundImage: `url(${slide.img})` }} className=" w-full min-h-[400px] bg-cover ">

                    {/* <div className="absolute bottom-0 left-0 right-0 top-0  "></div> */}
                    {/* <img
                    src={slide.img}
                    alt={slide.title}
                    className="w-full h-auto"
                  /> */}
                    <div className='px-4'>

                      <div className="bottom-conent w-full text-center py-4  absolute bottom-0  text-white z-10">
                        <h2 className='text-start text-2xl font-semibold'>{slide.title}</h2>
                        <p className='text-start'>{slide.subtitle}</p>
                      </div>
                      <div className="bottom-conent w-full ">

                      </div>

                    </div>
                  </div>
                </div>
              ))}

            </Carousel>
          </div>
          <div className="  bg-websecondary py-8  px-5 md:px-16   h-[100%] ">
            <h2 className='lg:text-4xl text-xl pb-4 text-webprimary'>One District One Product  (ODOP)</h2>
            <p className='text-webPara'>One District One Product (ODOP) is a government initiative that identifies and promotes one unique product from each district of India—ranging from agricultural produce and processed foods to handicrafts and handlooms—with the aim of boosting local economy, generating employment, preserving traditional skills, and enhancing both domestic and global market reach through branding, marketing, financial support, and export promotion.</p>
            <button className="zatra-btn mt-6 ">Explore All Product</button>
            {/* <FormButton variant="outlined" className="zatra-btn px-6 py-4" >
              Get in Touch
            </FormButton> */}


          </div>
        </div>
        <style jsx>
          {`
          @media screen and (min-width: 1024px) {
          .react-multiple-carousel__arrow--left {
            left: 80%;
            bottom: 20px;
          }
            .react-multiple-carousel__arrow--right {
            bottom: 20px;
            right: 20px;
          }
      }
      `}
        </style>
      </section>

    </>
  )
}

export default OneDistrict
