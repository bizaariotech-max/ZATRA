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
            
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                {data?.title || null}
              </h2>

              <p className="text-gray-700 mb-2">
                {data?.subtitle || null}
              </p>
            </div>

            {data?.socialIcon ?
              <div>
                {data?.socialIcon}
              </div>
              : null
            }

            {data?.desc ?
              <p className="text-webprimary font-semibold text-lg mb-2">
                {data?.desc || null}
              </p>
              : null
            }
            {data?.btnText || buttonText ?
              <button className="zatra-btn-fill w-full">
                {data?.btnText || buttonText || null}
              </button>
              : null
            }
          </div>
        </div>
      </div>


    </div>
  );
}
