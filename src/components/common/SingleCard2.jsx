import React from 'react';

export default function SingleCard2({ data = [], buttonText }) {
  return (
    <div className="max-w-full mx-auto ">
      <div className="bg-white rounded-xl border border-gray-300 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-2/5 p-3 sm:p-4">
            <img
              src={data?.img || null}
              alt="Handicrafts pottery display"
              className="w-full h-64 md:h-full object-cover sm:rounded-tl-[10px] sm:rounded-bl-[10px] sm:rounded-tr-none sm:rounded-br-none "
            />
          </div>

          {/* Content Section */}
          <div className="md:w-3/5 p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
              {data?.title || null}
            </h2>

            <p className="text-gray-700 mb-2">
              {data?.subtitle || null}
            </p>

            <p className="text-webprimary font-semibold text-lg mb-2">
              {data?.desc || null}
            </p>

            <button className="zatra-btn-fill w-full">
              {data?.btnText || buttonText || null}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        // .zatra-btn-fill {
        //   background-color: #0284c7;
        //   color: white;
        //   font-weight: 600;
        //   padding: 14px 24px;
        //   border-radius: 8px;
        //   border: none;
        //   cursor: pointer;
        //   transition: all 0.3s ease;
        //   font-size: 1.125rem;
        // }

        // .zatra-btn-fill:hover {
        //   background-color: #0369a1;
        //   transform: translateY(-2px);
        //   box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
        // }

        // .zatra-btn-fill:active {
        //   transform: translateY(0);
        // }
      `}</style>
    </div>
  );
}
