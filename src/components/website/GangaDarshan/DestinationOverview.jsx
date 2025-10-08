import React from 'react';
import { Calendar, Wind, Users, BookOpen, Sun, CloudRain, Snowflake } from 'lucide-react';

export default function DestinationOverview() {
  const stats = [
    {
      icon: <Calendar className="w-8 h-8" />,
      label: "Best Months to Visit",
      value: "Feb-Mar"
    },
    {
      icon: <Wind className="w-8 h-8" />,
      label: "Average AQI",
      value: "120 (Not Good)"
    },
    {
      icon: <Users className="w-8 h-8" />,
      label: "Population",
      value: "2.3 Crore"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      label: "Literacy Rate",
      value: "86%"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      label: "Gender Ratio",
      value: "23:20"
    },
    {
      icon: <Sun className="w-8 h-8" />,
      label: "Summer Months",
      subtitle: "Apr-Jun",
      value: "Max Temp 45°"
    },
    {
      icon: <CloudRain className="w-8 h-8" />,
      label: "Rainy Seasons",
      subtitle: "Jul-Oct",
      value: "Avg Rainfall 120cm"
    },
    {
      icon: <Snowflake className="w-8 h-8" />,
      label: "Winter months",
      subtitle: "Nov-Jan",
      value: "Mim Temp 05°"
    }
  ];

  return (
    <section className="space-top ">
      <div className="container bg-[#eff4f6] py-10 px-8 ">
        <h1 className="text-4xl font-semibold mb-8">Destination Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="webPara rounded-full p-3 bg-websecondary">
                  {stat.icon}
                </div>
                <div className="flex-1">
                  <p className=" text-webPara">{stat.label}</p>
                  {stat.subtitle && (
                    <p className="text-sm text-gray-500">{stat.subtitle}</p>
                  )}
                </div>
              </div>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
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
