import { scaledStyle } from "@/utils/scaleStyle";

interface SaerokDetailCardProps {
  scale?: number;
}

const SaerokDetailCard = ({ scale = 1 }: SaerokDetailCardProps) => {
  return (
    <div
      className="flex flex-col items-center justify-start h-full"
      style={scaledStyle(scale, { width: 703 })}
    >
      {/* 이미지 */}
      <img
        src="src/assets/images/BirdImg.png"
        className="flex items-center justify-center object-cover overflow-hidden w-full"
        style={scaledStyle(scale, { height: 505, borderRadius: 35 })}
      />
      <div
        className="flex flex-col bg-transparent w-full"
        style={scaledStyle(scale, {
          marginTop: -29,
          paddingLeft: 20,
          paddingRight: 20,
        })}
      >
        {/* 새 이름, 유저명 */}
        <div className="flex flex-row justify-between items-center w-full">
          <div
            className="bg-background-white text-center font-moneygraphy font-400 text-font-black"
            style={scaledStyle(scale, {
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 20,
              paddingRight: 20,
              fontSize: 35,
              lineHeight: 60,
              borderRadius: 20,
            })}
          >
            흰머리오목눈이
          </div>
          <div
            className="bg-background-white flex flex-row items-center"
            style={scaledStyle(scale, {
              borderRadius: 20,
              paddingTop: 7,
              paddingBottom: 7,
              paddingLeft: 10,
              paddingRight: 12,
              gap: 7,
            })}
          ></div>
        </div>
        {/* 한 줄 평, 시간 */}
        {/* 정보 */}
      </div>
    </div>
  );
};

export default SaerokDetailCard;
