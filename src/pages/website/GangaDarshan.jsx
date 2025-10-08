import React from 'react'
import BannerSlides from '../../components/website/GangaDarshan/BannerSlides'
import GangaDarshanOne from '../../components/website/GangaDarshan/GangaDarshanOne'
import GangaDarshanGallery from '../../components/website/GangaDarshan/GangaDarshanGallery'
import DestinationOverview from '../../components/website/GangaDarshan/DestinationOverview'
import VisitTimingsSchedule from '../../components/website/GangaDarshan/VisitTimingsSchedule'
import AmenitiesSection from '../../components/website/GangaDarshan/AmenitiesSection'
import SlotFeesDetails from '../../components/website/GangaDarshan/SlotFeesDetails'
import NearbyShops from '../../components/website/GangaDarshan/NearbyShops'
import SpecialPackage from '../../components/website/GangaDarshan/SpecialPackage'
import ServiceProvider from '../../components/website/GangaDarshan/ServiceProvider'
import MajorExports from '../../components/website/GangaDarshan/MajorExports'
import AgroProducts from '../../components/website/GangaDarshan/AgroProducts'
import ProductShowcase from '../../components/website/GangaDarshan/ProductShowcase'
import TradeOpportunities from '../../components/website/GangaDarshan/TradeOpportunities'
import MajorCrops from '../../components/website/GangaDarshan/MajorCrops'
import MajorIndustries from '../../components/website/GangaDarshan/MajorIndustries'
import EducationalInstitutions from '../../components/website/GangaDarshan/EducationalInstitutions'
import Handicrafts from '../../components/website/GangaDarshan/Handicrafts'
import Ads from '../../components/website/GangaDarshan/Ads'


const GangaDarshan = () => {

  return (
    <div className="bg-white">
      <BannerSlides />
      <GangaDarshanOne />
      <GangaDarshanGallery />
      <DestinationOverview />
      <VisitTimingsSchedule />
      <AmenitiesSection />
      <SlotFeesDetails />
      <NearbyShops />
      <SpecialPackage />
      <ServiceProvider />
      <ProductShowcase />
      <MajorExports />
      <MajorCrops />
      <TradeOpportunities />
      <AgroProducts />
      <MajorIndustries />
      <EducationalInstitutions />
      <Handicrafts />
      <Ads />
    </div>
  )
}

export default GangaDarshan
