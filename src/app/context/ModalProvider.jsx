import { createContext, useContext, useEffect, useState } from "react";

// Tạo Context
const ModalContext = createContext();

// Custom Hook để sử dụng ModalContext
export const useModalContext = () => {
  return useContext(ModalContext);
};

const ModalProvider = ({ children }) => {
  const [isShowing, setIsShowing] = useState(false); // Trạng thái hiển thị modal
  const [content, setContent] = useState(null); // Nội dung của modal

  // Ngăn cuộn trang khi modal hiển thị
  useEffect(() => {
    if (isShowing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [isShowing]);

  // Hàm mở modal
  const openModal = (modalContent) => {
    setContent(modalContent);
    setIsShowing(true);
  };

  // Hàm đóng modal
  const closeModal = () => {
    setIsShowing(false);
    setContent(null);
  };

  return (
    <ModalContext.Provider value={{ isShowing, openModal, closeModal }}>
      {children}

      {isShowing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div
            onClick={(e) => e.stopPropagation()} // Ngăn nổi bọt sự kiện
            className="bg-white rounded-lg shadow-lg max-w-5xl w-full p-6 transform transition-transform duration-300 ease-in-out scale-100"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-1 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              ✕
            </button>

            {/* Nội dung modal */}
            {content}
          </div>
        </div>
      )}



    </ModalContext.Provider>
  );
};

export default ModalProvider;
