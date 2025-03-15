import React, { useEffect, useState } from "react";
import JsBarcode from "jsbarcode";
import { useLocation } from "react-router-dom";

// Add CSS for the galaxy background
const galaxyBackgroundStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
  overflow: 'hidden',
  zIndex: -1,
};

const starStyle = {
  position: 'absolute',
  background: '#FFF',
  borderRadius: '50%',
};



function ExportTicket() {
  const location = useLocation();
  const { selectedPayment, movieDetails } = location.state || {};
  const [show, setShow] = useState(true);
  const [barcodeSrc, setBarcodeSrc] = useState("");
  const [stars, setStars] = useState([]);


  const movieTitle = movieDetails?.name || "How to Train Your Dragon";
  const studio = "2";
  const row = "B";
  const seats = ["B4", "B5"].join(", ");
  const bookingCode = `S${studio}-R${row}-S${seats.trim().replace(", ", "-")}`;
  const showTime = "Sat, 20 Jul 20:00";
  const totalAmount = "160.000 VND";
  const moviePoster = movieDetails?.imagePortrait || "https://cdn.galaxycine.vn/media/2025/2/17/bi-kip-luyen-rong-500_1739776695143.jpg";
  
  const paymentMethod = selectedPayment || "momo";

  React.useEffect(() => {
    const generateStars = () => {
      const starCount = 400;
      const newStars = [];
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: `${Math.random() * 3}px`,
          animationDelay: `${Math.random() * 15}s`,
          opacity: Math.random() * 0.8 + 0.2,
        });
      }
      
      setStars(newStars);
    };
    
    generateStars();
    
    
    
   
  }, []);
  
 
    
    

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, bookingCode, {
      format: "CODE128",
      lineColor: "#fff",
      background: "#111",
      width: 2,
      height: 50,
      displayValue: true, 
      font: "monospace",
      fontSize: 16,
      textMargin: 8,
      textPosition: "bottom",
      textAlign: "center",
      fontOptions: "bold",
      margin: 10,
    });

    setBarcodeSrc(canvas.toDataURL("image/png"));
  }, [bookingCode]);

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center overflow-hidden">
      {/* Galaxy Background */}
      <div style={galaxyBackgroundStyle}>
        {stars.map((star) => (
          <div
            key={star.id}
            className="star-twinkle"
            style={{
              ...starStyle,
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              animation: `twinkle ${Math.random() * 5 + 3}s linear infinite ${star.animationDelay}`,
            }}
          />
        ))}
        
       
      </div>

      {/* Confirmation Banner */}
      {show && (
        <div className="fixed top-5 right-5 px-6 py-3 bg-green-500 text-white text-lg font-medium rounded-lg shadow-lg animate-pulse z-50">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Đặt vé thành công! Chúc bạn xem phim vui vẻ!
          </div>
        </div>
      )}

      {/* Heading */}
      <div className="text-center mb-10 relative z-10">
        <h1 className="text-3xl font-bold text-red-600 mb-2 text-shadow-lg">Vé Điện Tử</h1>
        <p className="text-gray-400">Vui lòng xuất trình mã QR này tại quầy vé hoặc kiosk để nhận vé</p>
      </div>

      {/* Ticket Container */}
      <div className="max-w-md w-full relative z-10">
        {/* Movie Info Card */}
        <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-t-2xl overflow-hidden shadow-lg border-t border-l border-r border-gray-700">
          <div className="relative">
            <img
              className="w-full h-48 object-cover"
              src={moviePoster}
              alt={movieTitle}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            <div className="absolute bottom-0 left-0 p-4 w-full">
              <h2 className="text-2xl font-bold text-white shadow-text">{movieTitle}</h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="block text-sm text-gray-400">Mã đặt vé</span>
                <span className="font-bold text-xl text-white">{bookingCode}</span>
              </div>
              <div className="px-3 py-1 bg-red-900 text-red-100 rounded-full text-sm font-medium">
                {movieDetails?.isImax === 1 ? 'IMAX' : 'Standard'}
              </div>
            </div>
            
            <div className="border-t border-dashed border-gray-700 -mx-6 mb-4"></div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="block text-sm text-gray-400">Rạp chiếu</span>
                <span className="font-medium text-white">CGV Aeon Mall Hà Đông</span>
              </div>
              <div>
                <span className="block text-sm text-gray-400">Suất chiếu</span>
                <span className="font-medium text-white">{showTime}</span>
              </div>
              <div>
                <span className="block text-sm text-gray-400">Phòng chiếu</span>
                <span className="font-medium text-white">Cinema {studio}</span>
              </div>
              <div>
                <span className="block text-sm text-gray-400">Ghế</span>
                <span className="font-medium text-white">{seats}</span>
              </div>
            </div>
            
            <div className="border-t border-dashed border-gray-700 -mx-6 my-4"></div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-sm text-gray-400">Phương thức thanh toán</span>
                <span className="font-medium text-white capitalize">{paymentMethod}</span>
              </div>
              <div>
                <span className="block text-sm text-gray-400">Tổng tiền</span>
                <span className="font-bold text-lg text-red-500">{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scissors Line */}
        <div className="relative py-2 flex items-center bg-gray-900 bg-opacity-80 mx-2">
          <div className="flex-1 border-t border-dashed border-gray-700 "></div>
          <div className="absolute -left-3 bg-transparent rounded-full w-6 h-6"></div>
          <div className="absolute -right-3 bg-transparent rounded-full w-6 h-6"></div>
        </div>
        
        {/* Barcode Card */}
        <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-b-2xl shadow-lg p-6 border-b border-l border-r border-gray-700 flex flex-col items-center">
          {barcodeSrc && (
            <div className="w-full mb-4">
              <img
                src={barcodeSrc}
                alt="Barcode"
                className="w-full"
              />
            </div>
          )}
          <p className="text-sm text-gray-400 text-center">Quét mã QR này tại quầy vé để nhận vé</p>
          
          <div className="mt-6 w-full">
            <button 
              onClick={() => window.print()} 
              className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              In vé điện tử
            </button>
          </div>
        </div>
      </div>
      
      {/* Additional Instructions */}
      <div className="max-w-md w-full mt-8 bg-gray-900 bg-opacity-80 backdrop-blur-sm p-4 rounded-lg border border-gray-700 relative z-10">
        <h3 className="text-lg font-semibold text-red-500 mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Thông tin quan trọng
        </h3>
        <ul className="text-sm text-gray-400 space-y-2 pl-5 list-disc">
          <li>Vui lòng có mặt tại rạp trước 15 phút</li>
          <li>Phiếu này có giá trị sử dụng một lần</li>
          <li>Không hoàn/hủy/đổi vé sau khi thanh toán</li>
          <li>Giữ phiếu điện tử này cho đến khi kết thúc suất chiếu</li>
        </ul>
      </div>
      
      {/* Add CSS for the star animation and shooting stars */}
      <style jsx="true">{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          50% { opacity: 0.8; }
          100% { opacity: 0.2; }
        }
        
       
        
        @media print {
          body * {
            visibility: hidden;
          }
          .max-w-md, .max-w-md * {
            visibility: visible;
          }
         
          button {
            display: none;
          }
        }
        
        .shadow-text {
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </div>
  );
}

export default ExportTicket;

// Đây là component hiển thị ra tổng hợp các thông tin về vé phim đã được chọn trước đó 🐽