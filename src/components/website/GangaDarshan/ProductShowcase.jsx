import React from "react";
import jaggeryImg from "../../../assets/images/website/ganga-darshan/product-showcase.png";

const ProductShowcase = () => {
  return (
    <section className="space-top">

      <div className="container   ">
        <div className="flex flex-col md:flex-row ">
          {/* Left Image Section */}
          <div className="relative md:w-1/2 w-full h-[480px] overflow-hidden bg-websecondary">
            <img
              src={jaggeryImg}
              alt="Ayodhya Jaggery"
              className="w-full h-64 md:h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-lg font-semiboldp-3">
              <p className="py-3 ps-4"> View Product Gallery</p>

            </div>
          </div>

          {/* Right Content Section */}
          <div className="md:w-1/2 w-full  p-6 md:p-8 flex flex-col justify-center bg-websecondary">
            <h2 className="text-4xl   mb-1 " style={{ color: 'var(--web-primary)' }}>Ayodhya</h2>
            <h3 className="text-webPara font-semibold mb-3 text-xl">Jaggery</h3>
            <p className="text-webPara text-lg md:text-base leading-relaxed mb-6 ">
              Jaggery making in Ayodhya is being carried out traditionally since
              generations. About 20% of the total agricultural land of the district
              is used for sugarcane cultivation. The district mainly produces
              jaggery and jaggery-products like sesame gajak, ladoo, chikki, gud ke
              ladoo etc. Sugarcane, the raw material required for making jaggery, is
              present here in abundance.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="zatra-btn-fill">View Seller Details</button>
              <button className="zatra-btn">Explore Other Products</button>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};

export default ProductShowcase;
