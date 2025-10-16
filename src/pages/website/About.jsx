import React from 'react'
import Banner from '../../components/common/Banner'
import bannerImg from "../../assets/images/website/about/banner.png"
import AboutIntro from '../../components/website/about/AboutIntro'
import OurMission from '../../components/website/about/OurMission'
import AboutTeam from '../../components/website/about/AboutTeam'
import WhyChooseUs from '../../components/website/about/WhyChooseUs'

const About = () => {
  const bannerContent = {
    image: bannerImg,
    title: "About US",
    description: "ZATRA is a unique initiative offering a 360-degree exploration of tourism and culture."
  }
  return (
    <>
      <Banner bannerContent={bannerContent} />
      <AboutIntro />
      <OurMission />
      <AboutTeam />
      <WhyChooseUs />
    </>
  )
}

export default About

