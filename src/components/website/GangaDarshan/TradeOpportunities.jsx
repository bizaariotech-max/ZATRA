import React from 'react'
import CommonCarousel from '../../common/CommonCarousel'
import slide1 from "../../../assets/images/website/ganga-darshan/TradeOpportunities.png";
import CommonCarousel2 from '../../common/CommonCarousel2';

const TradeOpportunities = () => {
  const slideData = [
    {
      id: 1,
      img: slide1,
      title: 'Sectors Open For Trade Handicrafts.',
      subtitle: 'Private initiatives Partnerships ',
      desc: "Investment schemes available",
      btnText: "View Seller Details"
    },
    {
      id: 2,
      img: slide1,
      title: 'Sectors Open For Trade Handicrafts.',
      subtitle: 'Private initiatives Partnerships ',
      desc: "Investment schemes available",
      btnText: "View Seller Details"

    },
    {
      id: 3,
      img: slide1,
      title: 'Sectors Open For Trade Handicrafts.',
      subtitle: 'Private initiatives Partnerships ',
      desc: "Investment schemes available",
      btnText: "View Seller Details"

    },
    {
      id: 4,
      img: slide1,
      title: 'Sectors Open For Trade Handicrafts.',
      subtitle: 'Private initiatives Partnerships ',
      desc: "Investment schemes available",
      btnText: "View Seller Details"


    },
    {
      id: 5,
      img: slide1,
      title: 'Sectors Open For Trade Handicrafts.',
      subtitle: 'Private initiatives Partnerships ',
      desc: "Investment schemes available",
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
            Trade Opportunities
          </h2>
          <CommonCarousel2 responsive={responsive} slideData={slideData} buttonText="View Seller Details" />
        </div>
      </section>
    </>
  )
}

export default TradeOpportunities;

