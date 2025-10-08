import React from 'react';

export default function SlotFeesDetails() {
  const visitorStats = [
    { label: "Visitors Allowed", value: "₹2000", color: "bg-[#edf3f6]" },
    { label: "Today's Count", value: "₹0750", color: "bg-[#edf3f6]" },
    { label: "Available Slot", value: "₹1250", color: "bg-[#edf3f6]", textColor: "text-green-700" }
  ];

  const amenities = [
    "No Vehicle is allowed inside Ram Mandir Territory (inside 500m radius)",
    "Parking available at designated lots near Gate no.2 (Paid Parking)",
    "Wheelchair access, elderly assistance, or child-friendly services"
  ];

  const normalBooking = [
    { category: "Adults", fee: "₹200" },
    { category: "Children", fee: "₹200" },
    { category: "Foreigners", fee: "₹500" }
  ];

  const specialDarshans = [
    { category: "Adults", fee: "₹2,000" },
    { category: "Children", fee: "₹1,000" },
    { category: "Foreigners", fee: "₹5,000" }
  ];

  const cameraFees = [
    { type: "Documentry Feature Film", fee: "₹12,000" },
    { type: "Feature Film", fee: "₹20,000" }
  ];

  return (
    <section className='space-top'>

      <div className="container rounded-2xl theme-shadow py-6">
        <h1 className="text-4xl font-semibold mb-8">Slot /Fees Details</h1>

        {/* Visitor Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {visitorStats.map((stat, index) => (
            <div key={index} className={`${stat.color} rounded-lg p-6 text-center`}>
              <p className="text-gray-700 font-medium mb-2">{stat.label}</p>
              <p className={`text-xl font-semibold ${stat.textColor || 'text-gray-900'}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Amenities Section */}
        <div className="mb-8">
          <h2 className="text-xl  mb-4">Amenities Provided by the Organization</h2>
          <ul className="space-y-3">
            {amenities.map((amenity, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">{amenity}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Normal Booking Fee */}
        <div className="mb-8">
          <h2 className="text-xl  mb-4">Normal Booking Fee</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {normalBooking.map((item, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-6 text-center">
                <p className="text-gray-700 font-medium mb-2">{item.category}</p>
                <p className="text-xl font-semibold text-gray-900">{item.fee}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Special Darshans Booking Fee */}
        <div className="mb-8">
          <h2 className="text-xl  mb-4">Special Darshans Booking Fee</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialDarshans.map((item, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-6 text-center">
                <p className="text-gray-700 font-medium mb-2">{item.category}</p>
                <p className="text-xl font-semibold  text-gray-900">{item.fee}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Fee With Camera & Shooting */}
        <div>
          <h2 className="text-xl  mb-4">Booking Fee With Camera & Shooting (Per Day)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cameraFees.map((item, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-6 text-center">
                <p className="text-gray-700 font-medium mb-2">{item.type}</p>
                <p className="text-xl font-semibold  text-gray-900">{item.fee}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
