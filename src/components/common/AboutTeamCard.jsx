import React from 'react'
import { FiPhoneCall } from "react-icons/fi";
const AboutTeamCard = ({ data = [], buttonText }) => {

  return (
    <div className="max-w-full mx-auto ">
      <div className="max-w-[100%] bg-white rounded-2xl border border-gray-300 overflow-hidden hover:shadow-lg transition-shadow duration-300">


        {data?.img ?
          <div className='px-4 pt-4'>
            <img
              src={data?.img || null}
              alt="Package"
              className="w-full min-h-48 object-cover rounded-tl-lg rounded-tr-lg"
            />
          </div>
          : null
        }

        {/* Content Section */}
        <div className='px-4 py-4'>
          <div className='flex  flex-col sm:flex-row justify-between'>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                {data?.title || null}
              </h2>

              <p className="text-gray-700 mb-2">
                {data?.subtitle || null}
              </p>
            </div>

            {data?.socialIcon ?
              <div className='pt-3'>
                {data?.socialIcon}
              </div>
              : null
            }
          </div>

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
  )
}

export default AboutTeamCard
