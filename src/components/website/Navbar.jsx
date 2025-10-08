import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../../assets/images/logo-web.png'
import '../../assets/styles/website/navbar.css'
import { NavLink, Link } from 'react-router-dom';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinksData = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: 'about' },
    { name: 'ODOP', href: 'shop' },
    { name: 'Trip & Commerce', href: 'trip-commerce' },
    { name: 'Contact Us', href: 'contact' }
  ];


  return (
    <nav className="sticky top-0 bg-white shadow-sm border-b border-gray-200 py-2 z-50  flex items-center">
      <div className="container">
        <div className="mx-auto ">
          <div className="flex justify-between items-center  relative">
            <img src={Logo} alt="Logo" className="max-w-[80px] h-auto" />
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinksData.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.href}
                    className="block px-3 py-2 rounded-md text-lg hover:bg-websecondary hover:text-webprimary font-medium transition-colors duration-200 text-webPara"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                ))}

                {/* <NavLink
                     to={'/about'}
                      className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                    About
                    </NavLink>
                    <NavLink
                     to={'/shop'}
                      className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                   Shop
                    </NavLink>
                    <NavLink
                     to={'/contact'}
                      className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                    Contact
                    </NavLink> */}
              </div>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to={'/login'}>
                <button className="min-w-[90px] btn-first">
                  Login
                </button>
              </Link>

            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden absolute top-24 right-0 bg-white border-t w-3/4 h-screen border-gray-200 origin-top transition-all duration-500 ease-in-out ${isMenuOpen
            ? "animate-growDown opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
            }`}
        >
          <div className="px-2 pt-8 pb-3 space-y-1 flex items-center flex-col">
            {navLinksData.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-lg font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-4 px-8 w-full pt-6">
              <Link to={"/login"}>
                <button
                  className="w-full min-w-[90px] btn-first py-3 rounded-md text-sm font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
