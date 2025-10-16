import React, { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import SingleCard from "../../common/SingleCard";

const DistrictProductsSection = ({ productsData }) => {
  const [selectedState, setSelectedState] = useState("Uttar Pradesh");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const states = [
    "Uttar Pradesh",
    "Maharashtra",
    "Karnataka",
    "Tamil Nadu",
    "Gujarat",
    "Rajasthan",
    "West Bengal",
    "Kerala"
  ];

  // const productsData = {
  //   "Uttar Pradesh": [
  //     {
  //       id: 1,
  //       name: "Agra",
  //       category: "Leather Products",
  //       image: "https://images.unsplash.com/photo-1608528381995-d4d0d76c87e8?ixlib=rb-4.0.3&q=80&w=500",
  //       description: "World-famous leather goods including shoes, bags, and accessories crafted with traditional techniques."
  //     },
  //     {
  //       id: 2,
  //       name: "Aligarh",
  //       category: "Locks and Hardware",
  //       image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&q=80&w=500",
  //       description: "High-quality brass locks, door hardware, and security products manufactured with precision."
  //     },
  //     {
  //       id: 3,
  //       name: "Azamgarh",
  //       category: "Black Pottery",
  //       image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&q=80&w=500",
  //       description: "Unique black pottery with intricate designs, a traditional craft of the region."
  //     },
  //     {
  //       id: 4,
  //       name: "Ayodhya",
  //       category: "Jaggery",
  //       image: "https://images.unsplash.com/photo-1599909533540-d86d1f1e9c70?ixlib=rb-4.0.3&q=80&w=500",
  //       description: "Pure organic jaggery made from sugarcane, rich in minerals and natural sweetness."
  //     },
  //     {
  //       id: 5,
  //       name: "Amethi",
  //       category: "Moonj Products",
  //       image: "https://images.unsplash.com/photo-1615485500834-bc10199bc772?ixlib=rb-4.0.3&q=80&w=500",
  //       description: "Eco-friendly products made from moonj grass including mats, baskets, and decorative items."
  //     },
  //     {
  //       id: 6,
  //       name: "Amroha",
  //       category: "Musical Instrument (Dholaki)",
  //       image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&q=80&w=500",
  //       description: "Traditional dholaki and percussion instruments handcrafted by skilled artisans."
  //     },
  //     {
  //       id: 7,
  //       name: "Auraiya",
  //       category: "Milk Processing (Desi Ghee)",
  //       image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&q=80&w=500",
  //       description: "Pure desi ghee and dairy products made using traditional methods for authentic taste."
  //     },
  //     {
  //       id: 8,
  //       name: "Ambedkar Nagar",
  //       category: "Textile Products",
  //       image: "https://images.unsplash.com/photo-1592582112626-37c17a6b4f7e?ixlib=rb-4.0.3&q=80&w=500",
  //       description: "Handwoven textiles including sarees, fabrics, and garments with traditional patterns."
  //     }
  //   ],
  //   "Maharashtra": [
  //     {
  //       id: 9,
  //       name: "Pune",
  //       category: "Handicrafts",
  //       image: "https://images.unsplash.com/photo-1582274528667-1e8a10ded835?ixlib=rb-4.0.3&q=80&w=500",
  //       description: "Traditional Maharashtrian handicrafts and decorative items."
  //     },
  //     {
  //       id: 10,
  //       name: "Kolhapur",
  //       category: "Leather Footwear",
  //       image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&q=80&w=500",
  //       description: "Famous Kolhapuri chappals made with authentic leather and traditional designs."
  //     }
  //   ],
  //   "Karnataka": [
  //     {
  //       id: 11,
  //       name: "Mysore",
  //       category: "Silk Sarees",
  //       image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&q=80&w=500",
  //       description: "Premium Mysore silk sarees with gold zari work."
  //     }
  //   ]
  // };

  const currentProducts = productsData[selectedState] || [];

  const handleStateChange = (state) => {
    setSelectedState(state);
    setShowDropdown(false);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="space-top">
      <div className="container">
        {/* Header with Dropdown */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary">
            District-Wise Selected Products
          </h2>

          {/* State Selector Dropdown */}
          <div className="relative w-full sm:w-64">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 flex items-center justify-between hover:border-primary transition-colors"
            >
              <span className="text-gray-700 font-medium">{selectedState}</span>
              <FaChevronDown className={`text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
                {states.map((state) => (
                  <button
                    key={state}
                    onClick={() => handleStateChange(state)}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${selectedState === state ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-700'
                      }`}
                  >
                    {state}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <SingleCard data={product} key={product.id} buttonText="Know More" />
              // <div
              //   key={product.id}
              //   className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              // >
              //   {/* Product Image */}
              //   <div className="relative h-48 bg-gray-100 overflow-hidden">
              //     <img
              //       src={product.image}
              //       alt={product.name}
              //       className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              //     />
              //   </div>

              //   {/* Product Details */}
              //   <div className="p-4">
              //     <h3 className="text-lg font-bold text-gray-900 mb-1">
              //       {product.name}
              //     </h3>
              //     <p className="text-sm text-gray-600 mb-4">
              //       {product.category}
              //     </p>

              //     {/* Know More Button */}
              //     <button
              //       onClick={() => openProductModal(product)}
              //       className="flex items-center justify-between w-full text-primary hover:text-primary/80 font-semibold transition-colors group"
              //     >
              //       <span>Know More</span>
              //       <FaChevronRight className="group-hover:translate-x-1 transition-transform" size={16} />
              //     </button>
              //   </div>
              // </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available for {selectedState}</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {/* {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={closeProductModal}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="relative h-64 sm:h-80">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>


              <button
                onClick={closeProductModal}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
              >
                <span className="text-gray-800 text-xl">×</span>
              </button>


              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {selectedProduct.name}
                </h2>
                <p className="text-lg text-white/90">{selectedProduct.category}</p>
              </div>
            </div>


            <div className="p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-primary mb-4">About</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {selectedProduct.description}
              </p>


              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                <p className="text-gray-600">{selectedProduct.name}, {selectedState}</p>
              </div>


              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Contact Supplier
                </button>
                <button className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}


      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}


    </section>
  );
};

export default DistrictProductsSection;
