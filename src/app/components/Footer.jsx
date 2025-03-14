const Footer = () => {
    return (
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-6 lg:px-20">
          {/* Phần nội dung chính */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Cột 1: Logo */}
            <div>
              <h2 className="text-3xl font-bold mb-4 text-red-500">CINEMA+</h2>
              <p className="text-white-400">
                Discover the latest movies and TV shows. Your ultimate streaming platform for all entertainment.
              </p>
            </div>
  
            {/* Cột 2: Danh mục */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white-400 hover:text-white transition duration-300">
                    Movies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white-400 hover:text-white transition duration-300">
                    TV Shows
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white-400 hover:text-white transition duration-300">
                    Upcoming Releases
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white-400 hover:text-white transition duration-300">
                    Trending
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Cột 3: Chính sách */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white-400 hover:text-white transition duration-300">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white-400 hover:text-white transition duration-300">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white-400 hover:text-white transition duration-300">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white-400 hover:text-white transition duration-300">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Cột 4: Mạng xã hội */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-white-400 hover:text-white transition duration-300">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-white-400 hover:text-white transition duration-300">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-white-400 hover:text-white transition duration-300">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-white-400 hover:text-white transition duration-300">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
  
          {/* Phần bản quyền */}
          <div className="border-t border-white-700 mt-8 pt-6 text-center text-white-400 text-sm">
            <p>&copy; 2024 CINEMA+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  