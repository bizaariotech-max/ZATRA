import React, { useState } from 'react'
import TempleCard from '../../common/TempleCard';
import slide1 from "../../../assets/images/website/religious/slide1.png";
const TourismData = [
  {
    id: 1,
    title: "Ram Mandir",
    category: "New Delhi",
    description: "Experience the sacred journey of the Ganga, blending...",
    contact: {
      name: "Ram Singh",
      phone: "+91 0312145852"
    },
    details: {
      average_visit_time: "Average visit time 2 hrs",
      distance: "3 KM"
    },
    actions: [
      { type: "button", text: "Get Direction", url: "#" },
      { type: "button", text: "Get Direction", url: "#" }
    ],
    img: slide1
  },
  {
    id: 2,
    title: "Ram Mandir",
    category: "New Delhi",
    description: "Experience the sacred journey of the Ganga, blending...",
    contact: {
      name: "Ram Singh",
      phone: "+91 0312145852"
    },
    details: {
      average_visit_time: "2 hrs",
      distance: "3 KM"
    },
    actions: [
      { type: "button", text: "Get Direction", url: "#" },
      { type: "button", text: "Get Direction", url: "#" }
    ],
    img: slide1
  },
  {
    id: 3,
    title: "Ram Mandir",
    category: "New Delhi",
    description: "Experience the sacred journey of the Ganga, blending...",
    contact: {
      name: "Ram Singh",
      phone: "+91 0312145852"
    },
    details: {
      average_visit_time: "2 hrs",
      distance: "3 KM"
    },
    actions: [
      { type: "button", text: "Get Direction", url: "#" },
      { type: "button", text: "Get Direction", url: "#" }
    ],
    img: slide1
  },
  {
    id: 4,
    title: "Ram Mandir",
    category: "New Delhi",
    description: "Experience the sacred journey of the Ganga, blending...",
    contact: {
      name: "Ram Singh",
      phone: "+91 0312145852"
    },
    details: {
      average_visit_time: "2 hrs",
      distance: "3 KM"
    },
    actions: [
      { type: "button", text: "Get Direction", url: "#" },
      { type: "button", text: "Get Direction", url: "#" }
    ],
    img: slide1
  },
  {
    id: 5,
    title: "Ram Mandir",
    category: "Lucknow",
    description: "Experience the sacred journey of the Ganga, blending...",
    contact: {
      name: "Ram Singh",
      phone: "+91 0312145852"
    },
    details: {
      average_visit_time: "2 hrs",
      distance: "3 KM"
    },
    actions: [
      { type: "button", text: "Get Direction", url: "#" },
      { type: "button", text: "Get Direction", url: "#" }
    ],
    img: slide1
  },
  {
    id: 6,
    title: "Ram Mandir",
    category: "Lucknow",
    description: "Experience the sacred journey of the Ganga, blending...",
    contact: {
      name: "Ram Singh",
      phone: "+91 0312145852"
    },
    details: {
      average_visit_time: "2 hrs",
      distance: "3 KM"
    },
    actions: [
      { type: "button", text: "Get Direction", url: "#" },
      { type: "button", text: "Get Direction", url: "#" }
    ],
    img: slide1
  },
  {
    id: 7,
    title: "Ram Mandir",
    category: "Kushinagar",
    description: "Experience the sacred journey of the Ganga, blending...",
    contact: {
      name: "Ram Singh",
      phone: "+91 0312145852"
    },
    details: {
      average_visit_time: "2 hrs",
      distance: "3 KM"
    },
    actions: [
      { type: "button", text: "Get Direction", url: "#" },
      { type: "button", text: "Get Direction", url: "#" }
    ],
    img: slide1
  },
  {
    id: 8,
    title: "Ram Mandir",
    category: "Kushinagar",
    description: "Experience the sacred journey of the Ganga, blending...",
    contact: {
      name: "Ram Singh",
      phone: "+91 0312145852"
    },
    details: {
      average_visit_time: "2 hrs",
      distance: "3 KM"
    },
    actions: [
      { type: "button", text: "Get Direction", url: "#" },
      { type: "button", text: "Get Direction", url: "#" }
    ],
    img: slide1
  },
  {
    id: 9,
    title: "Ram Mandir",
    category: "Gurugram",
    description: "Experience the sacred journey of the Ganga, blending...",
    contact: {
      name: "Ram Singh",
      phone: "+91 0312145852"
    },
    details: {
      average_visit_time: "2 hrs",
      distance: "3 KM"
    },
    actions: [
      { type: "button", text: "Get Direction", url: "#" },
      { type: "button", text: "Get Direction", url: "#" }
    ],
    img: slide1
  },

];

const Tourism = ({ activeCity }) => {
  // const [activeCity, setactiveCity] = useState("New Delhi");
  const filteredTourismData = TourismData.filter((card) => card.category === activeCity);
  return (
    <>
      <div>
        <h2 className='text-xl md:text-3xl py-4 lg:py-6'>Tourism & Sightseeing</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {filteredTourismData.map((card) => (
            <TempleCard key={card.id} data={card} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Tourism

