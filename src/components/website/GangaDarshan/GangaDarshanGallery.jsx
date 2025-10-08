import React, { useState } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../../../assets/images/website/ganga-darshan/gallery/group/img1.png'
import img3 from '../../../assets/images/website/ganga-darshan/gallery/group/img2.png'
import img2 from '../../../assets/images/website/ganga-darshan/gallery/group/img3.png'
import img4 from '../../../assets/images/website/ganga-darshan/gallery/group/img4.png'
import img5 from '../../../assets/images/website/ganga-darshan/gallery/group/img2.png'
import img6 from '../../../assets/images/website/ganga-darshan/gallery/group/img3.png'
import img7 from '../../../assets/images/website/ganga-darshan/gallery/group/img4.png'



const CustomArrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`nav-btns-style absolute top-1/2 -translate-y-1/2 ${direction === 'left' ? 'left-1' : 'right-4'
      } z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110`}
  >
    {direction === 'left' ? (
      <ChevronLeft className="w-6 h-6 text-gray-800" />
    ) : (
      <ChevronRight className="w-6 h-6 text-gray-800" />
    )}
  </button>
);

export default function GangaDarshanGallery() {
  const [activeTab, setActiveTab] = useState('image');
  const galleryImages = [img1, img2, img3, img4, img5, img6, img7];

  // const images = [
  //   { id: 1, url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800', height: 'tall' },
  //   { id: 2, url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800', height: 'short' },
  //   { id: 3, url: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800', height: 'medium' },
  //   { id: 4, url: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800', height: 'tall' },
  //   { id: 5, url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800', height: 'short' },
  //   { id: 6, url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800', height: 'medium' },
  //   { id: 7, url: 'https://images.unsplash.com/photo-1532664189809-02133fee698d?w=800', height: 'tall' },
  //   { id: 8, url: 'https://images.unsplash.com/photo-1545231027-637d2f6210f8?w=800', height: 'short' },
  // ];

  const videos = [
    { id: 1, thumbnail: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800', title: 'Temple Architecture Tour' },
    { id: 2, thumbnail: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800', title: 'Historical Monument Guide' },
    { id: 3, thumbnail: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800', title: 'Cultural Heritage' },
    { id: 4, thumbnail: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800', title: 'Ancient Structures' },
    { id: 5, thumbnail: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800', title: 'Architectural Details' },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
    customPaging: (i) => (
      <div className="w-3 h-3 bg-gray-400 rounded-full hover:bg-webprimary transition-colors mt-4" />
    ),
    dotsClass: "slick-dots !flex justify-center gap-2"
  };
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    slidesToShow: 5, // base desktop default
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };




  return (
    <section className="space-top">
      <div className="container rounded-2xl theme-shadow py-6">
        <div className="flex gap-0 mb-8  rounded-lg overflow-hidden w-fit">
          <button
            onClick={() => setActiveTab('image')}
            className={`px-8 py-4 text-lg font-semibold transition-all ${activeTab === 'image'
              ? 'bg-webprimary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            Image Gallery
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`px-8 py-4 text-lg font-semibold transition-all ${activeTab === 'video'
              ? 'bg-webprimary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            Video Gallery
          </button>
        </div>

        {activeTab === 'image' && (
          <div className="bg-white  slide-conatiner">
            <div className=" ">
              <Slider {...settings2}>
                {galleryImages.map((img, index) => (
                  <div key={index + 1} className="single-slide-item ">
                    <img
                      src={img}
                      alt={`Temple architecture ${index + 1}`}
                      className="w-[240px] h-[355px]"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        )}

        {/* Video Gallery Carousel */}
        {activeTab === 'video' && (
          <div className="bg-white rounded-xl shadow-2xl p-8">
            {/* <h2 className="text-3xl font-bold text-gray-800 mb-6">Video Tour Collection</h2> */}
            <Slider {...settings}>
              {videos.map((video) => (
                <div key={video.id} className="px-3">
                  <div className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-webprimary fill-webprimary" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-white font-semibold">{video.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>

      <style jsx global>{`
        .slick-dots li button:before {
          // display: none;
        }
        .slick-dots li.slick-active > div {
          background-color: var(--web-primary);
          transform: scale(1.2);
        }
          .nav-btns-style{
            opacity: 0;
            transition: opacity 0.4s ease-in-out;
          }
          .slide-conatiner:hover .nav-btns-style{
            opacity: 1;
            }
            // .single-slide-item{
            //   padding-right:15px;
            // }
            //   .single-slide-item:last-child{
            //     padding-right:0px;
            //   }
      `}</style>
    </section>
  );
}
