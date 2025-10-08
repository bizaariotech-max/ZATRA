import React from "react";
import InfoCard from "./InfoCard";

const GangaDarshanOne = () => {
  return (
    <section >
      <div className="container bg-white space-top">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-6">
          <h1 className="text-2xl lg:text-5xl font-semibold  text-webprimary" >
            Ganga Darshan Yatra
          </h1>
          <span className="text-lg font-semibold zatra-btn text-webprimary" >
            Verification Report
          </span>
        </div>
        <p className=" text-webPara">
          A unique travel experience of exploring the sacred Ganga across 3 states and 5 cities – Haridwar and Rishikesh (Uttarakhand), Varanasi (Uttar Pradesh), Patna and Gaya (Bihar). A journey that blends spirituality, culture, and heritage, offering divine experiences along the holy river. Discover sacred ghats, ancient temples, vibrant rituals, and the timeless essence of India’s spiritual heartland. Experience the evening aarti at Har Ki Pauri, the serenity of Rishikesh, the eternal flame of Kashi Vishwanath, and the historical charm of Patna and Gaya. Each destination tells a story of faith, devotion, and tradition, making the yatra not just a journey but a soulful connection with the Ganga.
        </p>
      </div>

      <InfoCard />
    </section>
  );
};

export default GangaDarshanOne;
