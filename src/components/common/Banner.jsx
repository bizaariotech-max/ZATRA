

const Banner = ({ bannerContent }) => {

  return (
    <section className="relative w-full ">

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bannerContent?.image})`,
        }}
      />

      {/* <div className="absolute inset-0 bg-black/50" /> */}

      {/* Content */}
      <div className="relative z-10  ">
        {/* Text */}
        <div className="container flex justify-between items-end mx-auto py-12 sm:py-12 md:py-24" >

          <div className=" text-left text-white">
            <h2 className="text-3xl md:text-6xl font-semibold mb-4">{bannerContent?.title}</h2>
            <p className="text-base md:text-xl leading-relaxed">
              {bannerContent?.description}
            </p>
          </div>


        </div>
      </div>
    </section>
  );
};

export default Banner;
