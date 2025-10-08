import React from 'react'
import '../../assets/styles/home.css'
import ZatraAbout from '../../components/website/Home/ZatraAbout'
import OneDistrict from '../../components/website/Home/OneDistrict'
import Hero from '../../components/website/Home/Hero'
import SearchTabs from '../../components/website/Home/SearchTabs'
import ZataraPackages from '../../components/website/Home/ZataraPackages'
// import AutoSlider from '../../components/auto-slider'
// import banner1 from '../../assets/images/website/banner1.png';

const LandingPage = () => {

  return (
    <>
      <Hero />
        {/* <main className="h-screen max-h-[600px] mx-auto px-4 py-10"       style={{
                backgroundImage: `url(${banner1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
            <h1 className="text-center text-2xl md:text-3xl font-semibold tracking-tight text-pretty mb-8">
              The 5T Promise: Experience. Connect. Thrive.
            </h1>
            <AutoSlider />
          </main> */}
       <SearchTabs />
      <ZataraPackages />
      <ZatraAbout />
      <OneDistrict />
    </>
  )
}

export default LandingPage
