import React from 'react'
import Banner from '../../components/common/Banner'
import bannerImg from "../../assets/images/website/about/banner.png"
import DistrictProductsSection from '../../components/website/ODOP/DistrictProducts'
import img1 from '../../assets/images/website/odop/img1.png'
import img2 from '../../assets/images/website/odop/img2.png'
import img3 from '../../assets/images/website/odop/img3.png'
import img4 from '../../assets/images/website/odop/img4.png'
import img5 from '../../assets/images/website/odop/img5.png'
import img6 from '../../assets/images/website/odop/img6.png'
import img7 from '../../assets/images/website/odop/img7.png'
import img8 from '../../assets/images/website/odop/img8.png'
import img9 from '../../assets/images/website/odop/img9.png'
import img10 from '../../assets/images/website/odop/img10.png'


const ODOP = () => {
  const bannerContent = {
    image: bannerImg,
    title: "One District One Product  (ODOP)",
    description: "One District One Product (ODOP) is a government initiative that identifies and promotes one unique product from each district of India"
  }
  const districtProductsData = [
    {
      district: "Agra",
      product: "Leather Products",
      image: img1,
      link: "#"
    },
    {
      district: "Aligarh",
      product: "Locks and Hardware",
      image: "aligarh.jpg",
      link: "#"
    },
    {
      district: "Azamgarh",
      product: "Black Pottery",
      image: "azamgarh.jpg",
      link: "#"
    },
    {
      district: "Ayodhya",
      product: "Jaggery",
      image: "ayodhya.jpg",
      link: "#"
    },
    {
      district: "Amethi",
      product: "Moonj Products",
      image: "amethi.jpg",
      link: "#"
    },
    {
      district: "Amroha",
      product: "Musical Instrument (Dholak)",
      image: "amroha.jpg",
      link: "#"
    },
    {
      district: "Auraiya",
      product: "Milk Processing (Desi Ghee)",
      image: "auraiya.jpg",
      link: "#"
    },
    {
      district: "Ambedkar Nagar",
      product: "Textile Products",
      image: "ambedkar_nagar.jpg",
      link: "#"
    }
  ];
  const productsData = {
    "Uttar Pradesh": [
      {
        id: 1,
        name: "Agra",
        category: "Leather Products",
        img: img1,
        description: "World-famous leather goods including shoes, bags, and accessories crafted with traditional techniques."
      },
      {
        id: 2,
        name: "Aligarh",
        category: "Locks and Hardware",
        img: img2,
        description: "High-quality brass locks, door hardware, and security products manufactured with precision."
      },
      {
        id: 3,
        name: "Azamgarh",
        category: "Black Pottery",
        img: img3,
        description: "Unique black pottery with intricate designs, a traditional craft of the region."
      },
      {
        id: 4,
        name: "Ayodhya",
        category: "Jaggery",
        img: img4,
        description: "Pure organic jaggery made from sugarcane, rich in minerals and natural sweetness."
      },
      {
        id: 5,
        name: "Amethi",
        category: "Moonj Products",
        img: img5,
        description: "Eco-friendly products made from moonj grass including mats, baskets, and decorative items."
      },
      {
        id: 6,
        name: "Amroha",
        category: "Musical Instrument (Dholaki)",
        img: img6,
        description: "Traditional dholaki and percussion instruments handcrafted by skilled artisans."
      },
      {
        id: 7,
        name: "Auraiya",
        category: "Milk Processing (Desi Ghee)",
        img: img7,
        description: "Pure desi ghee and dairy products made using traditional methods for authentic taste."
      },
      {
        id: 8,
        name: "Ambedkar Nagar",
        category: "Textile Products",
        img: img8,
        description: "Handwoven textiles including sarees, fabrics, and garments with traditional patterns."
      }
    ],
    "Maharashtra": [
      {
        id: 9,
        name: "Pune",
        category: "Handicrafts",
        img: img9,
        description: "Traditional Maharashtrian handicrafts and decorative items."
      },
      {
        id: 10,
        name: "Kolhapur",
        category: "Leather Footwear",
        img: img10,
        description: "Famous Kolhapuri chappals made with authentic leather and traditional designs."
      }
    ],
    "Karnataka": [
      {
        id: 11,
        name: "Mysore",
        category: "Silk Sarees",
        img: img2,
        description: "Premium Mysore silk sarees with gold zari work."
      }
    ]
  };

  return (
    <section>
      <Banner bannerContent={bannerContent} />

      <DistrictProductsSection productsData={productsData} />


    </section>
  )
}

export default ODOP
