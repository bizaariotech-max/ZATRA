import React from 'react'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import SingleCard from './SingleCard'
import SingleCard2 from './SingleCard2'
const CommonCarousel2 = ({ responsive = {}, slideData = [], buttonText, className }) => {

  // const responsive = {
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 3,
  //     partialVisibilityGutter: 24,
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 640 },
  //     items: 2,
  //     partialVisibilityGutter: 20,
  //   },
  //   mobile: {
  //     breakpoint: { max: 640, min: 0 },
  //     items: 1,
  //     partialVisibilityGutter: 16,
  //   },
  // }
  return (
    <div>
      <Carousel
        responsive={responsive}
        infinite
        keyBoardControl
        swipeable
        draggable
        showDots={false}
        containerClass="pb-2 pt-4"
        itemClass="ps-1 pt-2 pe-4"
        arrows={false}
        renderButtonGroupOutside={false}
        partialVisible
      >

        {slideData.map((item, index) => (
          <SingleCard2 key={index} data={item} buttonText={buttonText} />
        ))}

      </Carousel>

    </div>
  )
}

export default CommonCarousel2
