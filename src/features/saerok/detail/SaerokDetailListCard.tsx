import { scaledStyle } from "@/utils/scaleStyle";

interface SaerokDetailListCardProps {
  scale?: number;
}

const SaerokDetailListCard = ({ scale = 1 }: SaerokDetailListCardProps) => {
  return (
    <div
      className="flex flex-row items-center justify-start bg-background-white shirnk-0"
      style={scaledStyle(scale, {
        width: 409,
        height: 164,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 7,
        gap: 13,
        borderRadius: 20,
      })}
    >
      {/* 이미지 섹션  */}
      <img
        src="src/assets/images/BirdImg.png"
        className="object-cover overflow-hidden flex justify-center items-center"
        style={scaledStyle(scale, {
          width: 150,
          height: 150,
          borderRadius: 15,
        })}
      />
      {/* 새 정보 섹션 */}
      <div
        className="flex flex-col h-full justify-between"
        style={scaledStyle(scale, { paddingTop: 8, paddingBottom: 8 })}
      >
        {/* 새 이름, 한 줊 평 */}
        <div
          className="flex flex-col items-start"
          style={scaledStyle(scale, { gap: 8 })}
        >
          <div
            className="text-black font-700"
            style={scaledStyle(scale, {
              fontSize: 20,
              lineHeight: 20,
              letterSpacing: -1.6,
            })}
          >
            긴꼬리딱새
          </div>
          <div
            className="text-font-gray font-400"
            style={scaledStyle(scale, {
              fontSize: 16,
              lineHeight: 20,
              letterSpacing: -1.28,
            })}
          >
            파란색 새 꼬리가 무지 길다!
          </div>
        </div>
        {/* 유저 정보 */}
        <div
          className="flex flex-row justify-start items-center "
          style={scaledStyle(scale, { gap: 7 })}
        >
          {/* 유저 이미지 */}
          <img
            src="src/assets/images/BirdImg.png"
            className="overflow-hidden rounded-full flex justify-center object-cover items-center border border-background-lightWhitegray"
            style={scaledStyle(scale, { width: 25, height: 25 })}
          />
          {/* 유저 닉네임 */}
          <div
            className="text-font-black font-400"
            style={scaledStyle(scale, { fontSize: 15, lineHeight: 20 })}
          >
            금강산새록전문가
          </div>
        </div>
      </div>
    </div>
  );
};
export default SaerokDetailListCard;
