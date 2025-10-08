import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaTelegramPlane } from 'react-icons/fa';
import { CalendarDays } from 'lucide-react';

const InfoCard = () => {
  return (
    <div className="container bg-white pt-6 md:pt-10">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Section */}
        <div className="flex flex-col gap-4 w-full md:w-[40%]">
          <div className="bg-lightTheme p-4 rounded">
            <div className="flex items-center gap-2 text-webHeading">
              <CalendarDays size={20} className="text-webIcon" />
              <span className="text-sm">Time Period</span>
            </div>
            <div className="mt-1 font-semibold text-lg text-webHeading">
              1 July - 30 Sep (2025)
            </div>
          </div>
          <div className="bg-lightTheme p-4 rounded">
            <div className="text-xl font-semibold mb-2 text-webHeading">Stay Connected</div>
            <div className="text-sm mb-4 text-webPara">Follow us for updates, tips & hidden gems.</div>
            <div className="flex flex-wrap gap-4">
              <span className="bg-white text-webprimary p-3 rounded-full shadow-lg hover:border-webprimary hover:bg-webprimary hover:text-white border">
                <FaFacebookF className="text-webIcon " size={20} />
              </span>
              <span className="bg-white text-webprimary p-3 rounded-full shadow-lg hover:border-webprimary hover:bg-webprimary hover:text-white border">
                <FaInstagram className="text-webIcon " size={20} />
              </span>
              <span className="bg-white text-webprimary p-3 rounded-full shadow-lg hover:border-webprimary hover:bg-webprimary hover:text-white border">
                <FaTwitter className="text-webIcon " size={20} />
              </span>
              <span className="bg-white text-webprimary p-3 rounded-full shadow-lg hover:border-webprimary hover:bg-webprimary hover:text-white border">
                <FaLinkedinIn className="text-webIcon " size={20} />
              </span>
              <span className="bg-white text-webprimary p-3 rounded-full shadow-lg hover:border-webprimary hover:bg-webprimary hover:text-white border">
                <FaTelegramPlane className="text-webIcon " size={20} />
              </span>
            </div>
          </div>
        </div>
        {/* ==========right-col============= */}

        <div className="md:w-[60%]">
          <div className="flex justify-between flex-col md:flex-row gap-5 mb-4">
            <div className="flex flex-col gap-4  bg-lightTheme p-4 w-full ">
              <div className=" rounded flex items-center h-full ">
                <div>
                  <span className="text-sm text-webPara">Organized By</span>
                  <div className="font-bold text-lg text-webHeading">UP Tourism</div>
                </div>
              </div>
            </div>

            {/*inner Right Section */}
            <div className="  bg-lightTheme p-4 w-full">
              <div className="flex gap-4 mb-4 md:mb-0 justify-end ">
                <button className="zatra-btn ">Live Feed</button>
                <button className="zatra-btn-fill ">Book ZATRA</button>
              </div>

            </div>
          </div>

          <div>
            <div className="bg-lightTheme p-4 py-5 rounded mt-2 md:mt-0 h-full">
              <div className="font-semibold text-xl text-webHeading mb-2">Visitor Guidelines</div>
              <div className="text-md text-webPara">
                Please follow all guidelines during your visit to ensure a safe and respectful experience. Maintain silence, avoid littering, and follow the designated paths. Photography may be restricted in certain areas, and all visitors must respect the temple timings and rules.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InfoCard;
