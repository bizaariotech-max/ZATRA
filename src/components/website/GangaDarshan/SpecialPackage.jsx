import React from 'react'
import CommonCarousel from '../../common/CommonCarousel'
import slide1 from "../../../assets/images/website/ganga-darshan/SpecialPackage.png";

const SpecialPackage = () => {
  const slideData = [
    {
      id: 1,
      img: slide1,
      title: 'Package Name',
      subtitle: 'Shop No. : A-56',
      mobileNo: "+91 0312145852",
      shop: "shop name"

    },
    {
      id: 2,
      img: slide1,
      title: 'Package Name',
      subtitle: 'Shop No. : A-56',
      mobileNo: "+91 0312145852",
      shop: "shop name"
    },
    {
      id: 3,
      img: slide1,
      title: 'Package Name',
      subtitle: 'Shop No. : A-56',
      mobileNo: "+91 0312145852",
      shop: "shop name"
    },
    {
      id: 4,
      img: slide1,
      title: 'Package Name',
      subtitle: 'Shop No. : A-56',
      mobileNo: "+91 0312145852",
      shop: "shop name"
    },
    {
      id: 5,
      img: slide1,
      title: 'Package Name',
      subtitle: 'Shop No. : A-56',
      mobileNo: "+91 0312145852",
      shop: "shop name"
    },
  ];
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 24,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
      partialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      partialVisibilityGutter: 16,
    },
  }
  return (
    <>
      <section className='space-top'>
        <div className="container">
          <h2 className="text-2xl md:text-4xl font-semibold  mb-3">
            Special Package
          </h2>
          <CommonCarousel responsive={responsive} slideData={slideData} />
        </div>
      </section>
    </>
  )
}

export default SpecialPackage;
