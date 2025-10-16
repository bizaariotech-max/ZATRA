import React from 'react'
import TempleImage from "../../../assets/images/website/zataraAbout.png"
import TajPeacockImage from "../../../assets/images/website/taj_peacock.png"
const AboutIntro = () => {
  return (
    <>
   <section className="space-top ">
       <div className="container">
         <div className="grid md:grid-cols-2 gap-10 ">
           <div className="">
             <h2 className="text-xl md:text-4xl font-semibold text-webprimary mb-4">About ZATRA</h2>
             <p className="text-webPara leading-7 font-normal  mb-8 text-base">
              ZATRA is a unique platform where Tourism, Treatment, Traditions, Taste, and Trade come together in harmony, each fueling the growth of the other. As travelers explore new destinations, they contribute directly to local economies through spending on hotels, transport, food, and shopping. At the same time, tourism creates demand for authentic crafts, cultural products, and traditional experiences, empowering local businesses and artisans to thrive. This cycle not only generates jobs and strengthens infrastructure but also builds meaningful global connections—where every journey supports trade, and every trade opportunity enriches the tourism experience.
             </p>
          
           </div>
           <div className="flex md:justify-end items-start w-full md:w-auto md:min-w-[320px] relative md:h-[320px] md:mb-0 mb-[45px]">
             <div className="relative w-full md:w-auto flex flex-col md:pl-[50px]" >
               <img
                 src={TempleImage}
                 alt="Temple"
                 className=" w-full h-auto object-cover mb-[-30px] md:mb-0  z-0"
               />
 <div className="w-full md:absolute   bg-webprimary text-white px-8 py-6 rounded-bl-[50px]  shadow-lg zatra-stats-box z-10  top-[100%]  md:top-auto sm:bottom-[-6px] right-0 min-w-[180px] min-h-[100px]">
                 <div className="flex justify-between"> 
                   <div>
                     <div className="text-2xl font-bold">300K</div>
                     <div className="text-sm">Visitors Visit</div>
                   </div>
                   <div className="flex justify-end pt-5">
                     <br />
   
                     <div className="text-base mt-2">Operated By 10+ States</div>
                   </div>
                 </div>
               </div>
               <img
                 src={TajPeacockImage}
                 alt="Taj Mahal and Peacock"
                  className="absolute right-0  bottom-12 md:bottom-[60px] max-w-[190px] md:max-w-[240px] h-auto object-cover  border-white zatra-bottom-img z-20"
               />
             </div>
           </div>
         </div>
       </div>
   
     </section>

    </>
  )
}

export default AboutIntro

