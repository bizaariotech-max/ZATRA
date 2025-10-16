import React, { useState } from 'react'
import slide1 from "../../../assets/images/website/ganga-darshan/TradeOpportunities.png";
import img2 from "../../../assets/images/website/ganga-darshan/MajorExports.png";
import img3 from "../../../assets/images/website/ganga-darshan/MajorCrops.png";
import { GiByzantinTemple } from "react-icons/gi";
import SingleCard from '../../common/SingleCard';
import CommonCarousel2 from '../../common/CommonCarousel2';
import CommonCarousel from '../../common/CommonCarousel';

const cardsData = [
  {
    id: 1,
    img: slide1,
    title: 'Sectors Open For Trade Handicrafts.',
    subtitle: 'Private initiatives Partnerships ',
    desc: "Investment schemes available",
    btnText: "View Seller Details",
    category: "New Delhi"
  },
  {
    id: 2,
    img: slide1,
    title: 'Sectors Open For Trade Handicrafts.',
    subtitle: 'Private initiatives Partnerships ',
    desc: "Investment schemes available",
    btnText: "View Seller Details",
    category: "Gurugram"
  },
  {
    id: 3,
    img: slide1,
    title: 'Sectors Open For Trade Handicrafts.',
    subtitle: 'Private initiatives Partnerships ',
    desc: "Investment schemes available",
    btnText: "View Seller Details",
    category: "Lucknow"
  },
  {
    id: 4,
    img: slide1,
    title: 'Sectors Open For Trade Handicrafts.',
    subtitle: 'Private initiatives Partnerships ',
    desc: "Investment schemes available",
    btnText: "View Seller Details",
    category: "Kushinagar"
  },
  {
    id: 5,
    img: slide1,
    title: 'Sectors Open For Trade Handicrafts.',
    subtitle: 'Private initiatives Partnerships ',
    desc: "Investment schemes available",
    btnText: "View Seller Details",
    category: "New Delhi"
  },
  {
    id: 6,
    img: slide1,
    title: 'Another Sector in Gurugram.',
    subtitle: 'New opportunities',
    desc: "Exploring new markets",
    btnText: "Learn More",
    category: "Gurugram"
  },
  {
    id: 7,
    img: slide1,
    title: 'Another Sector in Gurugram.',
    subtitle: 'New opportunities',
    desc: "Exploring new markets",
    btnText: "Learn More",
    category: "Kushinagar"
  },
];

const MajorCropsData = [
  {
    id: 1,
    img: img3,
    title: 'Banarasi Saree',
    subtitle: 'Special recognition products',
    category: "New Delhi"
  },
  {
    id: 2,
    img: img3,
    title: 'Banarasi Saree',
    subtitle: 'Special recognition products',
    category: "Gurugram"
  },
  {
    id: 3,
    img: img3,
    title: 'Banarasi Saree',
    subtitle: 'Special recognition products',
    category: "Lucknow"
  },
  {
    id: 4,
    img: img3,
    title: 'Banarasi Saree',
    subtitle: 'Special recognition products',
    category: "Kushinagar"
  },
  {
    id: 5,
    img: img3,
    title: 'Full Name',
    subtitle: 'Special recognition products',
    category: "New Delhi"
  },
  {
    id: 6,
    img: img3,
    title: 'Full Name',
    subtitle: 'Special recognition products',
    category: "New Delhi"
  },
  {
    id: 7,
    img: img3,
    title: 'Full Name',
    subtitle: 'Special recognition products',
    category: "Kushinagar"
  },
  {
    id: 8,
    img: img3,
    title: 'Full Name',
    subtitle: 'Special recognition products',
    category: "Gurugram"
  },

];
const TraditionArtsData = [
  {
    id: 1,
    img: img2,
    title: 'Banarasi Saree',
    subtitle: 'Special recognition products',
    category: "New Delhi"
  },
  {
    id: 2,
    img: img2,
    title: 'Banarasi Saree',
    subtitle: 'Special recognition products',
    category: "Gurugram"
  },
  {
    id: 3,
    img: img2,
    title: 'Banarasi Saree',
    subtitle: 'Special recognition products',
    category: "Lucknow"
  },
  {
    id: 4,
    img: img2,
    title: 'Banarasi Saree',
    subtitle: 'Special recognition products',
    category: "Kushinagar"
  },
  {
    id: 5,
    img: img2,
    title: 'Full Name',
    subtitle: 'Special recognition products',
    category: "New Delhi"
  },
  {
    id: 6,
    img: img2,
    title: 'Full Name',
    subtitle: 'Special recognition products',
    category: "New Delhi"
  },
  {
    id: 7,
    img: img2,
    title: 'Full Name',
    subtitle: 'Special recognition products',
    category: "Kushinagar"
  },
  {
    id: 8,
    img: img2,
    title: 'Full Name',
    subtitle: 'Special recognition products',
    category: "Gurugram"
  },

];


const TraditionArts = ({ activeCity }) => {

  const filteredMajorCropsData = MajorCropsData.filter((card) => card.category === activeCity);
  const filteredTraditionArtsData = TraditionArtsData.filter((card) => card.category === activeCity);



  const responsive2 = {
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
    <section>
      <div className=" "> 
        <div className='space-top'>
          <h2 className='text-xl md:text-3xl  mb-3'>Major Exports</h2>
          <CommonCarousel responsive={responsive2} slideData={filteredTraditionArtsData} buttonText="View Seller Details" />
        </div>
        <div className='space-top'>
          <h2 className='text-xl md:text-3xl  mb-3'>Major Crops</h2>
          <CommonCarousel responsive={responsive2} slideData={filteredMajorCropsData} buttonText="View Seller Details" />
        </div>
      </div>
    </section>
  )
}

export default TraditionArts

