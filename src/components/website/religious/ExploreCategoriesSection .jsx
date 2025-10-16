import React, { useState } from "react";
import 'react-multi-carousel/lib/styles.css';
import Carousel from "react-multi-carousel"
import slide1 from "../../../assets/images/website/religious/slide1.png";
import TempleCard from '../../common/TempleCard';
import { GiByzantinTemple } from "react-icons/gi";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";

import img1 from "../../../assets/images/website/religious/img1.png";
import img2 from "../../../assets/images/website/religious/img2.png";
import img3 from "../../../assets/images/website/religious/img3.png";
import img4 from "../../../assets/images/website/religious/img4.png";
import img5 from "../../../assets/images/website/religious/img5.png";
import img6 from "../../../assets/images/website/religious/img6.png";
import CommonCarousel3 from "../../common/CommonCarousel3";
import ReligiousTabs from "./ReligiousTabs";
import TradeOpportunities from "../GangaDarshan/TradeOpportunities";
import MajorExports from "../GangaDarshan/MajorExports";
import MajorCrops from "../GangaDarshan/MajorCrops";
import AgroProducts from "../GangaDarshan/AgroProducts";
import NearbyShops from "../GangaDarshan/NearbyShops";
import Handicrafts from "../GangaDarshan/Handicrafts";
import InvestmentOpportunities from "../GangaDarshan/InvestmentOpportunities";
import ServiceProvider from "../GangaDarshan/ServiceProvider";
import TreatmentWellness from "./TreatmentWellness";
import TradeCommerce from "./TradeCommerce";
import Tourism from "./Tourism";
import TraditionArts from "./TraditionArts";
import TasteCulinary from "./TasteCulinary";


const cardsData = [
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
    id: 5,
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
    id: 5,
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
    id: 5,
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
    id: 5,
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
  {
    id: 5,
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
  {
    id: 5,
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
]

const MainCategories = [
  {
    id: 1,
    title: "Trade & Commerce",
    image: img1,
    description: "Discover business opportunities, trade exhibitions, and commercial partnerships that drive economic growth.",
    details: "Connect with local businesses, explore investment opportunities, and participate in trade fairs. Our platform facilitates B2B connections and promotes sustainable commerce.",
    highlights: ["Business Networking", "Trade Exhibitions", "Investment Opportunities", "Market Access"]
  },
  {
    id: 2,
    title: "Tourism & Sightseeing",
    image: img2,
    description: "Explore breathtaking landscapes, historical monuments, and natural wonders across diverse destinations.",
    details: "From mountain ranges to coastal paradises, discover UNESCO World Heritage Sites, adventure destinations, and scenic beauty.",
    highlights: ["Heritage Sites", "Natural Wonders", "Adventure Tourism", "Guided Tours"]
  },
  {
    id: 3,
    title: "Explore",
    image: img3,
    icon: <FaMapMarkerAlt size={40} className="text-red-500" />,
    description: "Navigate through interactive maps, discover hidden gems, and plan your perfect itinerary.",
    details: "Use our advanced mapping technology to find nearby attractions, restaurants, accommodations, and services.",
    highlights: ["Interactive Maps", "Location Services", "Route Planning", "Local Recommendations"]
  },
  {
    id: 4,
    title: "Treatment & Wellness",
    image: img4,
    description: "Experience holistic healing through traditional therapies, wellness retreats, and modern healthcare.",
    details: "Discover ancient wellness practices, yoga and meditation centers, spa treatments, and world-class healthcare.",
    highlights: ["Traditional Medicine", "Spa & Wellness", "Yoga Retreats", "Healthcare Services"]
  },
  {
    id: 5,
    title: "Tradition & Arts",
    image: img5,
    description: "Immerse yourself in rich cultural heritage, traditional arts, crafts, and performing arts.",
    details: "Experience live performances, visit art galleries, meet master artisans, and participate in cultural workshops.",
    highlights: ["Cultural Performances", "Handicrafts", "Art Galleries", "Workshops"]
  },
  {
    id: 6,
    title: "Taste & Culinary",
    image: img6,
    description: "Savor authentic flavors, traditional cuisines, street food, and fine dining experiences.",
    details: "Embark on a culinary journey through local markets, cooking classes, food festivals, and renowned restaurants.",
    highlights: ["Local Cuisine", "Food Tours", "Cooking Classes", "Street Food"]
  }
];

const ExploreCategoriesSection = () => {
  const [expandedCard, setExpandedCard] = useState(1);
  const [parentCategory, setParentCategory] = useState("Trade & Commerce");
  const [activeCity, setActiveCity] = useState("New Delhi");
  // console.log(parentCategory, "expandedCard")

  const ChildCategories = [
    { key: "New Delhi", label: "New Delhi" },
    { key: "Gurugram", label: "Gurugram" },
    { key: "Lucknow", label: "Lucknow" },
    { key: "Kushinagar", label: "Kushinagar" },

  ];

  const filteredCards = cardsData.filter((card) => card.category === activeCity);

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

  function showCard(id, title) {
    setParentCategory(title)
    if (expandedCard === id) {
      setExpandedCard(null);

    } else {
      setExpandedCard(id);
    }
  }
  function renderContent() {
    switch (parentCategory) {
      case "Trade & Commerce":
        return <><TradeCommerce activeCity={activeCity} /> </>

      case "Tourism & Sightseeing":
        return <Tourism activeCity={activeCity} />;
      case "Explore":
        return <ReligiousTabs activeCity={activeCity} />;
      case "Treatment & Wellness":
        return <TreatmentWellness activeCity={activeCity} />;
      case "Tradition & Arts":
        return <TraditionArts activeCity={activeCity} />
      case "Taste & Culinary":
        return <TasteCulinary activeCity={activeCity} />;
      default:
        return null;
    }

  }


  return (
    <section className="space-top">
      <div className="container">
        <div className="flex flex-wrap lg:flex-nowrap gap-2 lg:gap-3 justify-between items-stretch">

          {MainCategories.map((item) => {
            const isExpanded = expandedCard === item.id;
            return (
              <div
                key={item.id}
                className={`w-full relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out ${isExpanded
                  ? 'flex-[0_0_20%] lg:flex-[0_0_35%]'
                  : expandedCard
                    ? 'flex-[0_0_calc(20%-12px)] lg:flex-[0_0_12%]  '
                    : 'flex-[0_0_calc(50%-12px)] lg:flex-[0_0_16.666%]'
                  }`}
                onClick={() => showCard(item.id, item.title)}
                style={{
                  minHeight: '300px',
                  height: isExpanded ? 'auto' : '300px'
                }}
              >
                {/* Background Image */}
                <div className="relative h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-[300px] object-cover transition-all duration-500 ${isExpanded ? 'scale-100' : 'scale-110 group-hover:scale-100'
                      }`}
                  />

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 transition-opacity duration-500 ${isExpanded
                    ? 'bg-gradient-to-t from-black/90 via-black/50 to-transparent'
                    : 'bg-gradient-to-t from-black/80 via-black/40 to-transparent'
                    }`}></div>
                  {/* Collapsed State - Title Only */}
                  {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold text-sm lg:text-base text-center leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  )}

                  {/* Expanded State - Full Content */}
                  {isExpanded && (
                    <div className="absolute inset-0 p-6 flex flex-col justify-end animate-fade-in">
                      <div className="">
                        <h3 className="text-white font-semibold text-sm lg:text-3xl text-center ">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>



      <div className="container space-top">
        <div className="flex flex-wrap items-center ">
          <div className=" medical-tab-buttons mb-4 flex flex-wrap gap-3">
            {ChildCategories.map((cat) => (
              <button key={cat.key}
                className={`zatra-btn rounded-lg ${activeCity === cat.key ? "zatra-btn-fill" : ""}`}
                onClick={() => setActiveCity(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {renderContent()}
      </div>
    </section>
  );
};

export default ExploreCategoriesSection;
export const Header = () => <h1>Header</h1>;


