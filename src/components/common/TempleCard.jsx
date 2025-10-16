import React from "react";
import { Phone, MessageCircle, Clock3, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const TempleCard = ({ data }) => {
  return (
    <div className=" w-full bg-white rounded-2xl  overflow-hidden border border-gray-300 transition-transform  duration-300 hover:shadow-card">
      {/* Image Section */}
      <div className="relative px-4 pt-4 ">
        <div className="overflow-hidden rounded-tl-xl rounded-tr-xl">

          <img
            src={data?.img || null}
            alt="Ram Mandir"
            className="w-full h-56 object-cover rounded-tl-xl rounded-tr-xl hover:scale-105 transition-transform duration-300 "
          />
        </div>
        {/* Alert Icon */}
        <div className="absolute top-5 right-5 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shadow-md">
          !
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-950">{data?.title || "Ram Mandir"}</h3>
        <p className="text-webPara text-sm mt-1 leading-snug">
          {data?.description || "A place of worship for Hindus"}
        </p>

        {/* Contact Info */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-sm font-medium text-gray-950">{data?.contact?.name}</p>
            <p className="text-xs text-webPara"><Phone size={10} className="text-webPara inline" />{data?.contact?.phone}</p>
          </div>

          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center bg-webprimary text-white rounded-md hover:bg-sky-600 transition-colors">
              <Phone size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
              <MessageCircle size={16} />
            </button>
          </div>
        </div>

        {/* Visit Info */}
        <div className="flex items-center gap-4 mt-3 text-webPara text-sm">
          <div className="flex items-center gap-1">
            <Clock3 size={14} /> <span>{data?.details?.average_visit_time}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} /> <span>3 KM</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-row sm:flex-col md:flex-row gap-3 mt-5">
          <button className="zatra-btn w-full " style={{ padding: "8px", }}>
            Get Direction
          </button>
          <Link to="/ganga-darshan" className="w-full">
            <button className="zatra-btn-fill w-full  " style={{ padding: "8px", }}>
              Explore
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TempleCard;
