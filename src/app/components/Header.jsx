import { useState, useEffect } from "react";
import { faMagnifyingGlass, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import '../styles/Header.css'; // Correct relative path based on your structure

export const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Toggle search box
  const [searchText, setSearchText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Toggle menu for small screens
  const [hasMounted, setHasMounted] = useState(false); // Trạng thái để kích hoạt hiệu ứng

  // Kích hoạt hiệu ứng sau khi component render
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasMounted(true);
    }, 100); // Delay nhỏ để hiệu ứng mượt hơn
    return () => clearTimeout(timer);
  }, []);

  return (
    <div >
      <header className="h-14 lg:h-20 bg-black flex justify-between items-center px-4 sm:px-6 lg:px-8 text-white relative">
        {/* Logo và Menu chính giữa */}
        <div
          className={`flex items-center gap-4 transform transition-all duration-700 ease-in-out ${hasMounted ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
        >
          {/* Logo */}
          <Link to="/">
            <img
              src="src\app\assets\img\hell.jpg"
              className="w-8 sm:w-10 lg:w-12 hover:scale-110 transition-transform duration-300 ease-in-out rounded-full"
              alt="Logo"
            />
          </Link>
          
         
          {/* <nav className="hidden sm:flex gap-4">
            <a
              href="#"
              className="hover:text-gray-400 transition text-sm lg:text-base hover:underline transform transition-transform duration-700 ease-in-out"
            >
              Movie
            </a>
            <a
              href="#"
              className="hover:text-gray-400 transition text-sm lg:text-base hover:underline transform transition-transform duration-700 ease-in-out"
            >
              TV Show
            </a>
          </nav> */}
        </div>
         {/* Menu chính giữa */}
        <div className="text-xl font-bold ">
            <Link className=" mr-5 hover:text-red-400" to="/"> Movies</Link>
            <Link className=" mr-5 hover:text-red-400" to="/Theaters"> Theaters</Link>
            <Link className=" mr-5 hover:text-red-400" to="/Discount"> Discount</Link>
            <Link className=" mr-5 hover:text-red-400" to="/Contact"> Contact</Link>
          </div>
        {/* Nút Search bên phải cho màn hình lớn */}
        <div
          className={`hidden sm:flex items-center gap-2 relative transform transition-all duration-700 ease-in-out ${hasMounted ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="cursor-pointer text-lg sm:text-xl hover:text-gray-400 transition"
            onClick={() => setIsSearchVisible((prev) => !prev)} // Toggle search box
          />
          <div
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-in-out ${isSearchVisible
              ? "opacity-100 scale-100 w-60 lg:w-80 px-4 py-2 border border-gray-700 rounded-md bg-black"
              : "opacity-0 scale-90 w-0"
              }`}
          >
            {isSearchVisible && (
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search..."
                className="bg-transparent text-white w-full focus:outline-none transition"
              />
            )}
          </div>
        </div>

        {/* Nút Toggle Menu cho màn hình nhỏ */}
        <FontAwesomeIcon
          icon={isMenuOpen ? faTimes : faBars}
          className="sm:hidden cursor-pointer text-lg hover:text-gray-400 transition"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        />

        {/* Menu toggle cho màn hình nhỏ */}
        {isMenuOpen && (
          <div className="absolute top-14 left-0 w-full bg-black text-white flex flex-col items-start gap-4 px-4 py-6 z-50 sm:hidden">
            <a
              href="#"
              className="hover:text-gray-400 transition text-sm lg:text-base !no-underline"
            >
              Movie
            </a>
            <a
              href="#"
              className="hover:text-gray-400 transition text-sm lg:text-base !no-underline"
            >
              TV Show
            </a>







            <div className="w-full">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search..."
                className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
              />
            </div>
            
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
