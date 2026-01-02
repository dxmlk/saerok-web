import { scaledStyle } from "@/utils/scaleStyle";
import ContentHeader from "../components/ContentHeader";
import TipsClickZone from "../components/TipsClickZone";

interface TipsContentProps {
  scale?: number;
}

const TipsContent = ({ scale = 1 }: TipsContentProps) => {
  return (
    <div
      className="w-full bg-background-white "
      style={scaledStyle(scale, {
        paddingLeft: 120,
        paddingRight: 120,
        paddingTop: 125,
        paddingBottom: 132,
      })}
    >
      <ContentHeader
        scale={scale}
        title="탐조 팁 - 탐조를 더 즐겁게 만드는 작은 습관들"
        detail="작은 준비와 배려로 탐조가 훨씬 즐거워질 수 있어요."
      />
      <TipsClickZone scale={scale} />
    </div>
  );
};

export default TipsContent;
