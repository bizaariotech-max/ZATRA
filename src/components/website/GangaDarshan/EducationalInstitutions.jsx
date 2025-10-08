import React from 'react'
import slide1 from "../../../assets/images/website/ganga-darshan/EducationalInstitutions.png";
import CommonCarousel2 from '../../common/CommonCarousel2';

const EducationalInstitutions = () => {
  const slideData = [
    {
      id: 1,
      img: slide1,
      title: 'Engineering Institute Of Research',

      desc: "Engineering Institute",
      btnText: "View Seller Details"
    },
    {
      id: 2,
      img: slide1,
      title: 'Engineering Institute Of Research',

      desc: "Engineering Institute",
      btnText: "View Seller Details"

    },
    {
      id: 3,
      img: slide1,
      title: 'Engineering Institute Of Research',

      desc: "Engineering Institute",
      btnText: "View Seller Details"

    },
    {
      id: 4,
      img: slide1,
      title: 'Engineering Institute Of Research',

      desc: "Engineering Institute",
      btnText: "View Seller Details"


    },
    {
      id: 5,
      img: slide1,
      title: 'Engineering Institute Of Research',

      desc: "Engineering Institute",
      btnText: "View Seller Details"


    },
  ];
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      partialVisibilityGutter: 24,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 1,
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
            Educational Institutions
          </h2>
          <CommonCarousel2 responsive={responsive} slideData={slideData} buttonText="View Seller Details" />
        </div>
      </section>
    </>
  )
}

export default EducationalInstitutions;

