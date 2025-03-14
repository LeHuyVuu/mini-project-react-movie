import React from 'react'

const Contact = () => {
    return (
        <div className="min-h-screen bg-black text-white flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full space-y-8 bg-opacity-90 bg-black p-8 rounded-lg shadow-xl backdrop-blur-lg">
                {/* Tiêu đề chính */}
                <h2 className="text-4xl font-extrabold text-center text-white">
                    Get in Touch with Us
                </h2>

                {/* Mô tả */}
                <p className="mt-2 text-lg text-center text-gray-300">
                    We would love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out. Our team is here to assist you.
                </p>

                {/* Form liên hệ */}
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
                                placeholder="Full Name"
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
                                placeholder="Email Address"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="message" className="sr-only">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-white text-white bg-black placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                            placeholder="Your Message"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black border-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105"
                        >

                            Submit
                        </button>
                    </div>
                </form>

                {/* Thông tin liên hệ */}
                <div className="mt-6 text-center text-gray-300">
                    <p>If you prefer, you can also reach us at:</p>
                    <p className="mt-2">📞 +123 456 7890</p>
                    <p>📧 contact@ourcompany.com</p>
                </div>
            </div>
        </div>
    )
}

export default Contact
