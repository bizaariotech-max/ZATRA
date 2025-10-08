import React from 'react';
import { Clock, Coffee, BellOff } from 'lucide-react';

export default function VisitTimingsSchedule() {
  const days = [
    { day: 'MON', isOpen: true },
    { day: 'TUE', isOpen: true },
    { day: 'WED', isOpen: true },
    { day: 'THU', isOpen: true },
    { day: 'FRI', isOpen: true },
    { day: 'SAT', isOpen: false },
    { day: 'SUN', isOpen: true }
  ];

  const timings = [
    {
      icon: <Clock className="w-6 h-6 text-gray-700" />,
      label: "Opening Time",
      time: "02:00 AM"
    },
    {
      icon: <Coffee className="w-6 h-6 text-gray-700" />,
      label: "Break Time",
      time: "1:00 PM – 2:00 PM"
    },
    {
      icon: <BellOff className="w-6 h-6 text-gray-700" />,
      label: "Closing Time",
      time: "08:30 PM"
    }
  ];

  const specialDarshans = [
    {
      title: "Special Darshans",
      time: "12:30 PM",
      note: "Arrive 10 minutes early"
    },
    {
      title: "Special Darshans",
      time: "04:00 PM",
      note: "Arrive 10 minutes early"
    }
  ];

  return (
    <div className="space-top">
      <div className="container rounded-2xl theme-shadow py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap">
          <h1 className="text-4xl font-semibold mb-4 sm:mb-0">Visit Timings & Schedule</h1>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-700 rounded-full"></div>
              <span className="font-semibold">Open</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
              <span className="font-semibold">Weekly Off</span>
            </div>
          </div>
        </div>

        {/* Days Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-7 gap-4 mb-8">
          {days.map((day, index) => (
            <div
              key={index}
              className={`${day.isOpen ? 'bg-green-700' : 'bg-red-600'
                } text-white font-bold text-center py-4 rounded-lg`}
            >
              {day.day}
            </div>
          ))}
        </div>

        {/* Timings and Special Darshans */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Opening, Break, and Closing Times */}
          {timings.map((timing, index) => (
            <div
              key={index}
              className="bg-[#edeffe] rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                {timing.icon}
                <span className="font-semibold text-gray-900">{timing.label}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{timing.time}</p>
            </div>
          ))}

          {/* Special Darshans */}
          {specialDarshans.map((darshan, index) => (
            <div
              key={index}
              className="bg-[#edeffe] rounded-lg p-6"
            >
              <div className="mb-3">
                <span className="font-semibold text-gray-900">{darshan.title}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-2">{darshan.time}</p>
              <p className="text-sm text-gray-600">{darshan.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
