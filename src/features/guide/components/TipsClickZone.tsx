import { ReactComponent as Person } from "@/assets/images/tips_image.svg";
import { scaledStyle } from "@/utils/scaleStyle";

interface TipsClickZone {
  scale?: number;
}

const TipsClickZone = ({ scale = 1 }: TipsClickZone) => {
  return (
    <div
      className="w-full flex flex-col"
      style={scaledStyle(scale, { marginTop: 122, gap: 70 })}
    >
      {/* 타이틀 */}

      {/* 사람 클릭 영역 */}
      <div className="relative flex justify-center">
        <Person />
      </div>
    </div>
  );
};

export default TipsClickZone;
