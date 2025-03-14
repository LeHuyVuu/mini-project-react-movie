import { Link } from "react-router-dom"

const PageNotFound = () => {
    return (
        <div>
            <main className="flex flex-col justify-center items-center min-h-screen bg-black">
                <h1 className="text-6xl font-extrabold text-red-500 mb-4 animate__animated animate__fadeIn animate__delay-1s">
                    404
                </h1>
                <p className="text-2xl mb-6 text-white animate__animated animate__fadeIn animate__delay-2s">
                    Oops! The page you`re looking for cannot be found.
                </p>
                <Link
                    to="/"
                    className="text-lg bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:translate-y-1 animate__animated animate__fadeIn animate__delay-3s"
                >
                    Go back to Homepage
                </Link>
            </main>
        </div>
    )
}

export default PageNotFound
