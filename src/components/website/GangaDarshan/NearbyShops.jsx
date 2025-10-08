import React from 'react'
import CommonCarousel from '../../common/CommonCarousel'
import slide1 from "../../../assets/images/website/ganga-darshan/NearbyShops.png";

const NearbyShops = () => {
  const slideData = [
    {
      id: 1,
      img: slide1,
      title: 'shop name',
      subtitle: 'Shop No. : A-56',
      mobileNo: "+91 0312145852",


    },
    {
      id: 2,
      img: slide1,
      title: 'shop name',
      subtitle: 'Shop No. : A-56',
      mobileNo: "+91 0312145852",
    },
    {
      id: 3,
      img: slide1,
      title: 'shop name',
      subtitle: 'Shop No. : A-56',
      mobileNo: "+91 0312145852",

    },
    {
      id: 4,
      img: slide1,
      title: 'shop name',
      subtitle: 'Shop No. : A-56',
      mobileNo: "+91 0312145852",

    },
    {
      id: 5,
      img: slide1,
      title: 'shop name',
      subtitle: 'Shop No. : A-56',
      mobileNo: "+91 0312145852",

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
            Nearby Shops
          </h2>
          <CommonCarousel responsive={responsive} slideData={slideData} />
        </div>
      </section>
    </>
  )
}

export default NearbyShops;


// export function NearbyShopsCard({ data }) {
//   return (
//     <div className="max-w-sm bg-white rounded-2xl theme-shadow overflow-hidden hover:shadow-lg transition-shadow duration-300">
//       {/* Image */}
//       <img
//         src={data?.img || slide1}
//         alt="Package"
//         className="w-full h-48 object-cover"
//       />

//       {/* Content */}
//       <div className="p-5">
//         {/* Package Name */}
//         <h2 className="text-xl font-semibold text-gray-900 mb-2">
//           {data?.title || "Package Name"}
//         </h2>

//         {/* Phone Number */}
//         <div className="flex items-center text-gray-700 mb-3">
//           <FiPhoneCall className="text-gray-500 mr-2" size={18} />
//           <span className="text-gray-700 font-medium">{data?.mobileNo || "+91 0312145852"}</span>
//         </div>

//         {/* Shop Details */}
//         <div className="mb-4">
//           <p className="text-gray-800 font-semibold">{data?.subtitle || "Shop No. : A-56"}</p>
//           <p className="text-gray-600 text-sm">{data?.shop || "shop name 1"}</p>
//         </div>

//         {/* Call Now Button */}
//         <button className="w-full bg-[#0077B6] hover:bg-[#005f8d] text-white font-semibold py-2 rounded-lg transition-colors">
//           Call Now
//         </button>
//       </div>
//     </div>
//   );
// }
