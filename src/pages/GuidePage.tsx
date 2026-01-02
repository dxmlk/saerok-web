import IntroSection from "@/components/IntroSection";
import { useDesignScaleValue } from "@/design/DesignScaleContext";
import GuideMain from "@/features/guide/sections/GuideMain";
import { useEffect } from "react";

const GuidePage = () => {
  const scale = useDesignScaleValue();

  useEffect(() => {
    // 페이지 진입/새로고침 시 스크롤 최상단으로
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // 부드럽게 스크롤
    });
  }, []);

  return (
    <div className="bg-background-lightWhitegray ">
      <IntroSection
        mainText="탐조는 어떻게 하나요?"
        subText="탐린이를 위한 새록의 탐조 가이드"
        isWhite={true}
        scale={scale}
      />
      <GuideMain scale={scale} />
    </div>
  );
};
export default GuidePage;
