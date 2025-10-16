
import img3 from "../../../assets/images/website/ganga-darshan/NearbyShops.png";
// import { GiByzantinTemple } from "react-icons/gi";
import CommonCarousel from '../../common/CommonCarousel';

const traditionArtsData = [
  {
    id: 1,
    img: img3,
    title: 'shop name',
    subtitle: 'Shop No. : A-56',
    mobileNo: "+91 0312145852",
    category: "New Delhi"
  },
  {
    id: 2,
    img: img3,
    title: 'shop name',
    subtitle: 'Shop No. : A-56',
    mobileNo: "+91 0312145852",
    category: "Gurugram"
  },
  {
    id: 3,
    img: img3,
    title: 'shop name',
    subtitle: 'Shop No. : A-56',
    mobileNo: "+91 0312145852",
    category: "Lucknow"
  },
  {
    id: 4,
    img: img3,
    title: 'shop name',
    subtitle: 'Shop No. : A-56',
    mobileNo: "+91 0312145852",
    category: "Kushinagar"
  },
  {
    id: 5,
    img: img3,
    title: 'shop name',
    subtitle: 'Shop No. : A-56',
    mobileNo: "+91 0312145852",
    category: "New Delhi"
  },
  {
    id: 6,
    img: img3,
    title: 'shop name',
    subtitle: 'Shop No. : A-56',
    mobileNo: "+91 0312145852",
    category: "New Delhi"
  },
  {
    id: 7,
    img: img3,
    title: 'shop name',
    subtitle: 'Shop No. : A-56',
    mobileNo: "+91 0312145852",
    category: "Kushinagar"
  },
  {
    id: 8,
    img: img3,
    title: 'shop name',
    subtitle: 'Shop No. : A-56',
    mobileNo: "+91 0312145852",
    category: "Gurugram"
  },

];

const TasteCulinary = ({ activeCity }) => {

  const filteredTraditionArtsData = traditionArtsData.filter((card) => card.category === activeCity);

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

  return (
    <section>
      <div className=" ">
        <div className='space-top'>
          <h2 className='text-xl md:text-3xl  mb-3'>Nearby Shops</h2>
          <CommonCarousel responsive={responsive2} slideData={filteredTraditionArtsData} />
        </div>
        {/* <div className='space-top'>
          <h2 className='text-xl md:text-3xl  mb-3'>Major Crops</h2>
          <CommonCarousel responsive={responsive2} slideData={filteredMajorCropsData} buttonText="View Seller Details" />
        </div> */}
      </div>
    </section>
  )
}

export default TasteCulinary

