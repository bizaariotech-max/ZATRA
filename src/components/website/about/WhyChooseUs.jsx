import React from "react";
import { Users, Globe2, Shield, Compass } from "lucide-react"; // lucide-react icons
import choose_us from "../../../assets/images/website/about/choose-us.png";

const WhyChooseUs = () => {
  return (
    <section className="space-top">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 md:rounded-2xl overflow-hidden">
          <div className="flex flex-col ">
            <div className="p-6 md:p-8 bg-websecondary  md:basis-1/3">
              <h2 className="text-3xl md:text-4xl font-semibold text-webprimary mb-3">
                Why Choose Us?
              </h2>
              <p className="text-gray-600">
                Safe, authentic, and memorable journeys that celebrate culture and
                empower communities.
              </p>
            </div>

            <div className="p-6 md:p-8 bg-[#004B79] text-white flex items-start  gap-4 md:basis-1/3">
              <Users className="w-8 h-8 mt-1 text-[#00ADEF]" />
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Community Empowerment
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed">
                  Your travels support local artisans, businesses, and
                  communities, creating lasting impact.
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8 bg-[#00ADEF] text-white flex items-start gap-4 md:basis-1/3">
              <Compass className="w-8 h-8 mt-1 text-white" />
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Authentic Experiences
                </h3>
                <p className="text-blue-50 text-sm leading-relaxed">
                  Discover hidden gems, authentic local flavours, and immersive
                  cultural experiences.
                </p>
              </div>
            </div>
          </div>

          {/* Center Image */}
          <div className="h-[300px] md:h-auto">
            <img
              src={choose_us}
              alt="Why Choose Us"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="flex flex-col  ">
            <div className="  md:basis-1/2 bg-[#0071BC]">
              <div className="p-6 md:p-8  text-white flex items-start gap-4">
                <Globe2 className="w-8 h-8 mt-1 text-[#00ADEF]" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    360° Tourism Experience
                  </h3>
                  <p className="text-blue-50 text-sm leading-relaxed">
                    Explore destinations through culture, heritage, wellness, and
                    local traditions—all in one journey.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:basis-1/2 bg-[#004B79]">
              <div className="p-6 md:p-8  text-white flex items-start gap-4 rounded-b-xl md:rounded-none">
                <Shield className="w-8 h-8 mt-1 text-[#00ADEF]" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Safety First</h3>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    We prioritize traveller safety with responsible travel
                    practices, technology-backed guidance, and emergency support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
