import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



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

// Add shooting star style
const shootingStarStyle = {
  position: 'absolute',
  background: 'linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)',
  height: '2px',
  borderRadius: '100px',
  transformOrigin: 'left',
};

export default function Payment() {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  
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
    
    // Initialize shooting stars
    createShootingStar();
    
    // Create new shooting stars at random intervals
    const shootingStarInterval = setInterval(() => {
      createShootingStar();
    }, 4000); // New shooting star every 4 seconds
    
    return () => clearInterval(shootingStarInterval);
  }, []);
  
  // Function to create shooting stars
  const createShootingStar = () => {
    const newShootingStar = {
      id: Date.now(),
      left: `${Math.random() * 80 + 10}%`,
      top: `${Math.random() * 40}%`,
      width: `${Math.random() * 150 + 50}px`,
    //   angle: Math.random() * 20 - 10, // Random angle between -10 and 10 degrees
      opacity: Math.random() * 0.7 + 0.3,
      animationDuration: `${Math.random() * 2 + 1}s`,
    };
    
    setShootingStars(prevStars => [...prevStars, newShootingStar]);
    
    // Remove the shooting star after animation
    setTimeout(() => {
      setShootingStars(prevStars => 
        prevStars.filter(star => star.id !== newShootingStar.id)
      );
    }, parseFloat(newShootingStar.animationDuration) * 500);
  };
  
  const movie = {
    name: "How to Train Your Dragon",
    age: "0",
    duration: 0,
    startDate: "2025-06-13 00:00:00",
    endDate: "2025-08-10 00:00:00",
    imageLandscape: "https://cdn.galaxycine.vn/media/2025/2/17/bi-kip-luyen-rong-750_1739776701532.jpg",
    imagePortrait: "https://cdn.galaxycine.vn/media/2025/2/17/bi-kip-luyen-rong-500_1739776695143.jpg",
    slug: "how-to-train-your-dragon",
    rate: 9.3,
    totalVotes: 46,
    views: 4563,
    isImax: 1,
    isSession: 0,
  };

  const paymentMethods = [
    {
      id: "hsbc",
      paymentName: "HSBC/Payoo - ATM/VISA/MASTER/JCB/QRCODE",
      image: "https://cdn.galaxycine.vn/media/2020/10/20/hsbc-icon_1603203578522.png",
    },
    {
      id: "shopeepay",
      paymentName: "Ví ShopeePay - Giảm 10K cho tất cả giao dịch",
      image: "https://cdn.galaxycine.vn/media/2022/4/29/shopee-pay_1651229746140.png",
    },
    {
      id: "momo",
      paymentName: "Ví Điện Tử MoMo",
      image: "https://cdn.galaxycine.vn/media/2020/10/20/momo-icon_1603203874499.png",
    },
    {
      id: "zalopay",
      paymentName: "Zalopay - Bạn mới Zalopay nhập mã GIAMSAU - Giảm 50% tối đa 40k",
      image: "https://cdn.galaxycine.vn/media/2024/7/10/zalopay_1720600308412.png",
    },
    {
      id: "onepay",
      paymentName: "OnePay - Visa, Master, JCB,... / ATM / QR Ngân hàng / Apple Pay",
      image: "https://cdn.galaxycine.vn/media/2024/9/27/logo-onepay500x500_1727411425335.png",
    },
    {
      id: "vnpay",
      paymentName: "VNPAY",
      image: "https://cdn.galaxycine.vn/media/2021/12/2/download_1638460623615.png",
    }
  ];

  const formatDuration = (minutes) => {
    if (!minutes || minutes <= 0) return "Duration not available";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return "Date not available";
    }
  };

  const handlePaymentSelect = (paymentId) => {
    setSelectedPayment(paymentId);
  };

  const handleProceedToCheckout = () => {
    if (selectedPayment) {
      navigate('/booking/exportticket', {
        state: {
          selectedPayment: selectedPayment,
          movieDetails: movie
        }
      });
    }
  };

  return (
    <div className="relative min-h-screen py-8 overflow-hidden">
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
        
        {/* Shooting stars */}
        {shootingStars.map((shootingStar) => (
          <div
            key={shootingStar.id}
            className="shooting-star"
            style={{
              ...shootingStarStyle,
              left: shootingStar.left,
              top: shootingStar.top,
              width: shootingStar.width,
              opacity: shootingStar.opacity,
              transform: `rotate(${shootingStar.angle}deg)`,
              animation: `shootingstar ${shootingStar.animationDuration} linear forwards`,
            }}
          />
        ))}
      </div>
      
     
      
      {/* Content container with improved styling for better contrast with the background */}
      <div className="container relative mx-auto px-4 z-10">
        <h1 className="text-4xl font-bold text-red-600 mb-8 text-center text-shadow-lg">Thanh Toán</h1>
       
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Movie Info */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Chi Tiết Phim</h2>
              <div className="flex mb-6 justify-center">
                <img
                  className="w-full h-auto rounded-lg shadow-md"
                  src={movie.imageLandscape}
                  alt={movie.name}
                  onError={(e) => { e.target.src = movie.imagePortrait || 'https://placeholder.com/movie'; }}
                />
              </div>
             
              <h3 className="text-2xl font-bold text-white mb-4 text-center">{movie.name}</h3>
             
              <div className="space-y-3">
                <div className="flex items-center bg-gray-800 p-2 rounded">
                  <span className="font-semibold text-gray-300 w-28">Rating:</span>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-medium text-white">{movie.rate}</span>
                    <span className="text-sm text-gray-400 ml-2">({movie.totalVotes} votes)</span>
                  </div>
                </div>
               
                <div className="flex items-center p-2">
                  <span className="font-semibold text-gray-300 w-28">Views:</span>
                  <span className="font-medium text-white">{movie.views.toLocaleString()}</span>
                </div>
               
                <div className="flex items-center bg-gray-800 p-2 rounded">
                  <span className="font-semibold text-gray-300 w-28">Duration:</span>
                  <span className="font-medium text-white">{formatDuration(movie.duration)}</span>
                </div>
               
                <div className="flex items-center p-2">
                  <span className="font-semibold text-gray-300 w-28">Age:</span>
                  <span className="font-medium text-white">{movie.age === "0" ? "All ages" : `${movie.age}+`}</span>
                </div>
               
                <div className="flex items-center bg-gray-800 p-2 rounded">
                  <span className="font-semibold text-gray-300 w-28">Showtimes:</span>
                  <span className="font-medium text-white">{formatDate(movie.startDate)} - {formatDate(movie.endDate)}</span>
                </div>


                <div className="flex gap-2 mt-4">
                  {movie.isImax === 1 && (
                    <span className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold">IMAX</span>
                  )}
                  {movie.isSession === 1 && (
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm font-semibold">3D</span>
                  )}
                </div>
              </div>
             
              <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-red-500 mb-2">Thông tin vé</h4>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Ghế:</span>
                  <span className="font-medium text-white">G7, G8</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Rạp chiếu:</span>
                  <span className="font-medium text-white">CGV Aeon Mall Hà Đông</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Suất chiếu:</span>
                  <span className="font-medium text-white">19:30, 15/11/2023</span>
                </div>
              </div>
            </div>
          </div>


          {/* Right Side: Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">Phương Thức Thanh Toán</h2>
              <p className="text-gray-300 mb-4">Vui lòng chọn một phương thức thanh toán bên dưới để tiếp tục:</p>
             
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`border overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer rounded-xl ${
                      selectedPayment === method.id
                        ? 'border-red-600 ring-2 ring-red-700'
                        : 'border-gray-700'
                    }`}
                    onClick={() => handlePaymentSelect(method.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Pay with ${method.paymentName}`}
                  >
                    <div className="bg-gray-800 p-4 flex justify-center items-center h-24">
                      <img
                        className="max-h-16 max-w-full"
                        src={method.image}
                        alt={method.paymentName}
                      />
                    </div>
                    <div className="p-4 bg-gray-900">
                      <p className="text-gray-300 text-sm font-medium">{method.paymentName}</p>
                    </div>
                  </div>
                ))}
              </div>
             
              <div className="mt-8 border-t border-gray-700 pt-6">
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Giá vé:</span>
                    <span className="font-medium text-white">140.000 VND</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Phí tiện ích:</span>
                    <span className="font-medium text-white">10.000 VND</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Phí đặt vé:</span>
                    <span className="font-medium text-white">10.000 VND</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                    <span className="font-semibold text-gray-300">Tổng cộng:</span>
                    <span className="text-xl font-bold text-red-600">160.000 VND</span>
                  </div>
                </div>
               
                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center ${
                    selectedPayment
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={handleProceedToCheckout}
                  disabled={!selectedPayment}
                >
                  <span className="mr-2">Thanh toán ngay</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
               
                <p className="text-sm text-gray-400 mt-4 text-center">
                  Bằng cách nhấn "Thanh toán ngay", bạn đồng ý với các <a href="#" className="text-red-400 hover:underline">điều khoản và điều kiện</a> của chúng tôi.
                </p>
              </div>
            </div>
           
            <div className="mt-4 bg-gray-900 bg-opacity-80 backdrop-blur-sm p-5 rounded-xl shadow-xl border border-gray-800">
              <div className="flex items-start">
                <div className="rounded-full bg-red-900 p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-500">Lưu ý thanh toán:</h4>
                  <p className="text-xs text-gray-400 mt-1">Vui lòng hoàn tất thanh toán trong vòng 15 phút. Quá thời gian này, giao dịch sẽ bị hủy và bạn cần đặt vé lại từ đầu.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add CSS for the star animation and shooting stars */}
      <style jsx="true">{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          50% { opacity: 0.8; }
          100% { opacity: 0.2; }
        }
        
        @keyframes shootingstar {
          0% { 
            transform: translateX(0) rotate(${Math.random() * 20 - 10}deg); 
            opacity: 0;
          }
          10% { opacity: 1; }
          100% { 
            transform: translateX(100vw) rotate(${Math.random() * 20 - 10}deg); 
            opacity: 0;
          }
        }
        
        .text-shadow-lg {
          text-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
        }
        
        .shooting-star::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </div>
  );
}

// Đây là page hiển thị ra các phương thức thanh toán như là zalopay, vnpay, sử dụng trong file payments.json



