import React from 'react'
import PackageCard from '../PackageCard'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import image1 from '../../../assets/images/website/ganga_aarti.png'
import image2 from '../../../assets/images/website/somnath_aarti.png'
import image3 from '../../../assets/images/website/Rameshwaram_aarti.png'

const packages = [
  {
    id: 1,
    title: "Ganga Darshan Yatra",
    period: "1 July - 30 Sep (2025)",
    organizer: "UP Tourism",
    image: image1,
  },
  {
    id: 2,
    title: "Somnath Temple Yatra",
    period: "1 July - 30 Sep (2025)",
    organizer: "UP Tourism",
    image: image2,
    textContent: "Experience the sacred journey of the Ganga, blending spirituality, culture, and heritage...",
  },
  {
    id: 3,
    title: "Shri Rameshwaram Yatra",
    period: "1 July - 30 Sep (2025)",
    organizer: "UP Tourism",
    image: image3,
    textContent: "Experience the sacred journey of the Ganga, blending spirituality, culture, and heritage...",
  },
  {
    id: 4,
    title: "Ganga Aarti Nights",
    period: "1 July - 30 Sep (2025)",
    organizer: "UP Tourism",
    image: image1,
    textContent: "Experience the sacred journey of the Ganga, blending spirituality, culture, and heritage...",
  },
]

const ZataraPackages = () => {
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
      <section>
        <div className='md:mt-0 mt-6'>
          <div className='container'>
            <h2 className="text-2xl md:text-4xl font-semibold text-webprimary">ZATRA Packages</h2>
            <div className="mt-6">
              <Carousel
                responsive={responsive}
                infinite
                keyBoardControl
                swipeable
                draggable
                showDots={false}
                containerClass="pb-2 pt-4"
                itemClass="ps-0 pe-2"
                arrows={false}
                renderButtonGroupOutside={false}
                partialVisible
              >
                {packages.map((p) => (
                  <div key={p.title} className="h-full">
                    <PackageCard {...p} />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ZataraPackages
