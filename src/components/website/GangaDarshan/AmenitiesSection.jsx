import React from 'react';
import { ExternalLink } from 'lucide-react';
import { FaFemale, FaMale, FaUtensils, FaTint, FaShieldAlt, FaBriefcaseMedical, FaCreditCard, FaAmbulance, FaBaby, FaWheelchair, FaBus } from 'react-icons/fa';

export default function AmenitiesSection() {
  const amenities = [
    {
      icon: <FaFemale className="w-6 h-6" />,
      name: "Female Toilet",
      distance: "0.2 Km"
    },
    {
      icon: <FaMale className="w-6 h-6" />,
      name: "Male Toilet",
      distance: "0.2 Km"
    },
    {
      icon: <FaUtensils className="w-6 h-6" />,
      name: "Food Court",
      distance: "0.7 Km"
    },
    {
      icon: <FaTint className="w-6 h-6" />,
      name: "Water Dispenser",
      distance: "1.2 Km"
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      name: "Police Booth",
      distance: "1.2 Km"
    },
    {
      icon: <FaBriefcaseMedical className="w-6 h-6" />,
      name: "Medical Centre",
      distance: "1.2 Km"
    },
    {
      icon: <FaCreditCard className="w-6 h-6" />,
      name: "ATM",
      distance: "1.2 Km"
    },
    {
      icon: <FaAmbulance className="w-6 h-6" />,
      name: "Ambulance",
      distance: "1.2 Km"
    },
    {
      icon: <FaBaby className="w-6 h-6" />,
      name: "Creche",
      distance: "1.2 Km"
    },
    {
      icon: <FaWheelchair className="w-6 h-6" />,
      name: "Wheel Chair",
      distance: "1.2 Km"
    },
    {
      icon: <FaBus className="w-6 h-6" />,
      name: "Transport",
      distance: "1.2 Km"
    }
  ];

  return (
    <section className="space-top">
      <div className="container bg-[#eff4f6] py-10 px-6">
        <h1 className="text-4xl font-semibold mb-8">Amenities</h1>

        <div className="flex flex-wrap gap-4">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow flex-1 min-w-[220px]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="webPara rounded-full p-3 bg-websecondary">
                  {amenity.icon}
                </div>
                <div className='mb-3'>

                  <h3 className="font-semibold text-gray-900 ">{amenity.name}</h3>
                  <p className="text-sm text-gray-600 ">{amenity.distance}</p>
                </div>
              </div>
              <a
                href="#"
                className="text-webprimary font-semibold opacity-80 text-md lg:text-lg flex items-center gap-1 hover:opacity-100 transition-opacity"
              >
                Get Directions
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .webprimary {
          background-color: #e0f2fe;
          color: #0369a1;
        }
      `}</style>
    </section>
  );
}
