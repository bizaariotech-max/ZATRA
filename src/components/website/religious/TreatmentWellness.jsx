import React, { useState } from 'react'
import slide1 from "../../../assets/images/website/ganga-darshan/ServiceProvider.png";
import slide2 from "../../../assets/images/website/ganga-darshan/Local-influencers.png";
import { GiByzantinTemple } from "react-icons/gi";
import SingleCard from '../../common/SingleCard';

const cardsData = [
  {
    id: 1,
    img: slide1,
    title: 'Full Name',
    subtitle: 'Priest',
    mobileNo: "+91 0312145852",
    category: "New Delhi",

  },
  {
    id: 2,
    img: slide1,
    title: 'Full Name',
    subtitle: 'Priest',
    mobileNo: "+91 0312145852",
    category: "New Delhi",
  },
  {
    id: 3,
    img: slide1,
    title: 'Full Name',
    subtitle: 'Priest',
    mobileNo: "+91 0312145852",
    category: "New Delhi",

  },
  {
    id: 4,
    img: slide1,
    title: 'Full Name',
    subtitle: 'Priest',
    mobileNo: "+91 0312145852",
    category: "Gurugram",

  },
  {
    id: 5,
    img: slide1,
    title: 'Full Name',
    subtitle: 'Priest',
    mobileNo: "+91 0312145852",
    category: "Gurugram",

  },
  {
    id: 6,
    img: slide2,
    title: 'Full Name',
    subtitle: 'Priest2',
    mobileNo: "+91 0312145852",
    category: "Gurugram",

  },
  {
    id: 7,
    img: slide2,
    title: 'Full Name',
    subtitle: 'Priest2',
    mobileNo: "+91 0312145852",
    category: "Gurugram",

  },
  {
    id: 8,
    img: slide2,
    title: 'Full Name',
    subtitle: 'Priest2',
    mobileNo: "+91 0312145852",
    category: "Gurugram",

  },
];

const TreatmentWellness = ({ activeCity }) => {
  const filteredCards = cardsData.filter((card) => card.category === activeCity);

  return (
    <>
      <section>
        <div className="space-top">
          <div className='flex  items-center mb-4'>
            {/* <div className='bg-white border text-webprimary p-3 rounded-full shadow-card me-4 flex items-center justify-center'>
              <GiByzantinTemple size={25} />
            </div> */}
            <h2 className='text-xl md:text-3xl  mb-0 pb-0'>Religious/ Pilgrimage Sites</h2>
          </div>

          {/* ====map=== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCards.map((card, index) => (
              <SingleCard key={index} data={card} buttonText={'Call Now'} />
            ))}
          </div>
        </div>
      </section>

    </>
  )
}

export default TreatmentWellness
