const LoadingComponents = () => {
    return (
        <div>
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="relative flex flex-col items-center justify-center">
                    {/* Vòng tròn xoay */}
                    <div className="h-16 w-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    {/* Chữ Loading */}
                    <p className="text-white mt-4 text-lg font-semibold animate-pulse">
                        Loading...
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoadingComponents