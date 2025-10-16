import React, { useState } from 'react'
import slide1 from "../../../assets/images/website/ganga-darshan/TradeOpportunities.png";
import img2 from "../../../assets/images/website/ganga-darshan/HandicraftsHandlooms.png";
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

const HandicraftsData = [
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
const InvestmentData = [
  {
    id: 1,
    // img: slide1,
    title: 'Renewable Energy Sector',
    subtitle: 'Government Schemes',
    category: "New Delhi",
    listing: ["Market demand(domestic + export)", " Special schemes ODOP"]
  },
  {
    id: 2,
    // img: slide1,
    title: 'Renewable Energy Sector',
    subtitle: 'Government Schemes',
    category: "Gurugram",
    listing: ["Market demand(domestic + export)", " Special schemes ODOP"]
  },
  {
    id: 3,
    // img: slide1,
    title: 'Renewable Energy Sector',
    subtitle: 'Jaggery making in Ayodhya is being carried...',
    category: "Lucknow",
    listing: ["Market demand(domestic + export)", " Special schemes ODOP"]
  },
  {
    id: 4,
    // img: slide1,
    title: 'Renewable Energy Sector',
    subtitle: 'Jaggery making in Ayodhya is being carried...',
    category: "Kushinagar",
    listing: ["Market demand(domestic + export)", " Special schemes ODOP"]
  },
  {
    id: 5,
    // img: slide1,
    title: 'Full Name',
    subtitle: 'Jaggery making in Ayodhya is being carried...',
    category: "New Delhi",
    listing: ["Market demand(domestic + export)", " Special schemes ODOP"]
  },
  {
    id: 6,
    // img: slide1,
    title: 'Organic Spices',
    subtitle: 'Cultivated in traditional farms.',
    category: "Gurugram",
    listing: ["Market demand(domestic + export)", " Special schemes ODOP"]
  },
  {
    id: 7,
    // img: slide1,
    title: 'Handloom Textiles',
    subtitle: 'Crafted by local artisans with rich heritage.',
    category: "Lucknow"
    ,
    listing: ["Market demand(domestic + export)", " Special schemes ODOP"]
  },
  {
    id: 8,
    // img: slide1,
    title: 'Fresh Produce',
    subtitle: 'Seasonal fruits and vegetables from local growers.',
    category: "Kushinagar",
    listing: ["Market demand(domestic + export)", " Special schemes ODOP"]
  },
  {
    id: 9,
    // img: slide1,
    title: 'Pottery Art',
    subtitle: 'Unique handmade clay items.',
    category: "New Delhi",
    listing: ["Market demand(domestic + export)", " Special schemes ODOP"]
  },
  {
    id: 10,
    // img: slide1,
    title: 'Dairy Products',
    subtitle: 'Farm-fresh milk and cheese.',
    category: "Gurugram",
    listing: ["Market demand(domestic + export)", " Special schemes ODOP"]
  }
];

const TradeCommerce = ({ activeCity }) => {
  // const [activeCity, setactiveCity] = useState("New Delhi");
  const filteredCards = cardsData.filter((card) => card.category === activeCity);
  const filteredHandicraftsData = HandicraftsData.filter((card) => card.category === activeCity);
  const filteredInvestmentData = InvestmentData.filter((card) => card.category === activeCity);


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
      <div className="container ">
        <div className='mt-5 lg:mt-8'>
          <h2 className='text-xl md:text-3xl  mb-3 '>Trade Opportunities</h2>
          <CommonCarousel2 responsive={responsive} slideData={filteredCards} buttonText="View Seller Details" />
        </div>
        <div className='space-top'>
          <h2 className='text-xl md:text-3xl  mb-3'>Handicrafts & Handlooms</h2>
          <CommonCarousel responsive={responsive2} slideData={filteredHandicraftsData} buttonText="View Seller Details" />
        </div>
        <div className='space-top'>
          <h2 className='text-xl md:text-3xl  mb-3'>Investment Opportunities</h2>
          <CommonCarousel responsive={responsive2} slideData={filteredInvestmentData} buttonText="Explore  Scheme" />
        </div>
      </div>
    </section>
  )
}

export default TradeCommerce

