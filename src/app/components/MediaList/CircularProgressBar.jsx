export const CircularProgressBar = ({
  percent = 69,
  size = 40,
  strokeWidth = 4,
  strokeColor = "#FFD700",
  textColor = "white",
}) => {
  // Đảm bảo giá trị `percent` hợp lệ
  const validPercent = isNaN(percent) || percent === null || percent === undefined ? 0 : percent;

  const radius = size / 2 - strokeWidth; // Bán kính của vòng tròn
  const circumference = 2 * Math.PI * radius; // Chu vi vòng tròn
  const offset = circumference - (validPercent / 100) * circumference; // Phần bị ẩn dựa trên validPercent

  return (
    <div style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Nền vòng tròn */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E5E5"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Vòng tròn tiến trình */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 0.35s",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
        {/* Text ở giữa */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fill={textColor}
          fontSize={size / 3.5}
          fontWeight="bold"
          dy=".3em"
        >
          {validPercent}
        </text>
      </svg>
    </div>
  );
};
