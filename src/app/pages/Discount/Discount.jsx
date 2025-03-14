import React from 'react'

const Discount = () => {
  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-opacity-90 bg-black p-8 rounded-lg shadow-xl backdrop-blur-lg">
        {/* Tiêu đề chính */}
        <h2 className="text-4xl font-extrabold text-center text-white">
          Unlock Your Special Discount
        </h2>

        {/* Mô tả */}
        <p className="mt-2 text-lg text-center text-gray-300">
          Your dream offer is just a few clicks away! Join now and claim your exclusive discount. It's quick, easy, and the deal of a lifetime!
        </p>

        {/* Form nhận mã giảm giá */}
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-white text-white bg-black placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Enter Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-white text-white bg-black placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Enter Your Email"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-white group-hover:text-red-100 transition-all duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a2 2 0 012-2h14a2 2 0 012 2v16a2 2 0 01-2 2H5a2 2 0 01-2-2V4z" />
                </svg>
              </span>
              Get My Discount
            </button>
          </div>
        </form>

        {/* Thông tin thêm */}
        <div className="mt-6 text-center text-gray-300">
          <p>Ready to save big? Don’t wait too long—this limited-time offer won’t last forever!</p>
          <p className="mt-2">📞 Call us for assistance: +123 456 7890</p>
          <p>📧 Reach out via email: support@ourcompany.com</p>
        </div>
      </div>
    </div>
  )
}

export default Discount
