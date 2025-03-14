
const InfomationMedia = ({ information = {} }) => {
    console.log({ information });
    return (
        <div>
            <div className=" p-8 bg-black-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-100 mb-4 border-b-2 border-gray-600 inline-block">
                    Information
                </h2>
                <ul className="space-y-4 text-gray-400">
                    <li>
                        <span className="font-semibold text-gray-200">Original Titlte: </span>{information.original_title}
                    </li>
                    <li className="flex items-center">
                        <span className="font-semibold text-gray-200 mr-2">Original Country: </span>
                        {information.origin_country && information.origin_country.length > 0 ? (
                            <div className="flex items-center gap-2">
                                {information.origin_country.map((countryCode, index) => (
                                    <div key={countryCode} className="flex items-center gap-1">
                                        {/* Quốc kỳ */}
                                        <img
                                            src={`https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`}
                                            alt={`${countryCode} Flag`}
                                            className="w-6 h-4 rounded shadow"
                                        />
                                        {/* Mã quốc gia */}
                                        <span className="text-gray-400">{countryCode}</span>
                                        {/* Dấu phẩy phân tách (nếu không phải phần tử cuối) */}
                                        {index !== information.origin_country.length - 1 && (
                                            <span className="text-gray-400">,</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <span className="text-gray-400">N/A</span>
                        )}
                    </li>

                    <li>
                        <span className="font-semibold text-gray-200">Status: </span> {information.status}
                    </li>
                    <li className="flex items-center">
                        <span className="font-semibold text-gray-200 mr-2">
                            Budget:{" "}
                            {information.budget
                                ? new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(information.budget)
                                : "N/A"}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default InfomationMedia