import React from 'react'
import CommonCarousel from '../../common/CommonCarousel'
import slide1 from "../../../assets/images/website/ganga-darshan/AgroProducts.png";

const AgroProducts = () => {
  const slideData = [
    {
      id: 1,
      img: slide1,
      title: 'Jaggery Cube',
      // subtitle: 'Jaggery making in Ayodhya is being carried...',
    },
    {
      id: 2,
      img: slide1,
      title: 'Jaggery Cube',
      // subtitle: 'Jaggery making in Ayodhya is being carried...',

    },
    {
      id: 3,
      img: slide1,
      title: 'Jaggery Cube',
      // subtitle: 'Jaggery making in Ayodhya is being carried...',

    },
    {
      id: 4,
      img: slide1,
      title: 'Jaggery Cube',
      // subtitle: 'Jaggery making in Ayodhya is being carried...',


    },
    {
      id: 5,
      img: slide1,
      title: 'Full Name',
      // subtitle: 'Jaggery making in Ayodhya is being carried...',


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
            Agro Products
          </h2>
          <CommonCarousel responsive={responsive} slideData={slideData} buttonText="View Seller Details" />
        </div>
      </section>
    </>
  )
}

export default AgroProducts;

