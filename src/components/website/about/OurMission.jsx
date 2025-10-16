import React from "react";
import about1 from "../../../assets/images/website/about/about1.png";
import our_vision from "../../../assets/images/website/about/our_vision.png";

const OurMission = () => {
  return (
    <section className="space-top">
      <div className="container mx-auto px-4 mt-10">
        {/* Our Mission Section */}
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          {/* Image 40% */}
          <div className="md:w-2/5 w-full flex">
            <img
              src={about1}
              alt="Our Mission"
              className="w-full lg:max-h-[340px] max-h-[300px] object-cover rounded-xl"
            />
          </div>

          {/* Text 60% */}
          <div className="md:w-3/5 w-full bg-websecondary p-6 md:p-8 rounded-xl">
            <h2 className="text-xl md:text-4xl font-semibold text-webprimary mb-4">
              Our Mission
            </h2>
            <p className="text-webPara leading-7 font-normal text-md ">
              Our mission is to make every journey enriching, safe, and sustainable by blending tourism with culture, wellness, and technology. We strive to promote responsible travel that preserves heritage, celebrates traditions, and supports local communities. Through continuous education, awareness campaigns, and collaboration with local partners, government bodies, and organizations, we aim to create memorable experiences that empower travelers, uplift communities, and build a culture of safety, sustainability, and shared prosperity.
            </p>
          </div>
        </div>

        {/* Our Vision Section */}
        <div className="space-top flex flex-col md:flex-row order-1 md:order-2 gap-6 items-stretch">
          {/* Image 60% */}
          <div className="md:w-3/5 w-full flex">
            <img
              src={our_vision}
              alt="Our Vision"
              className="w-full lg:max-h-[340px] max-h-[300px] object-cover rounded-xl"
            />
          </div>

          {/* Text 40% */}
          <div className="md:w-2/5 w-full bg-webprimary p-6 md:p-8 order-2 md:order-1 rounded-xl text-white">
            <h2 className="text-xl md:text-4xl font-semibold mb-4">Our Vision</h2>
            <p className="leading-7 font-normal text-md">
              To create a future where tourism becomes a driving force for cultural exchange, community empowerment, and sustainable growth. We envision safe and seamless journeys where responsible travel preserves heritage, celebrates traditions, and supports local economies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
