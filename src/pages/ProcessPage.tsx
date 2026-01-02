import IntroSection from "@/components/IntroSection";
import { useDesignScaleValue } from "@/design/DesignScaleContext";
import ProcessContent from "@/features/guide/sections/ProcessContent";
import { useEffect } from "react";

const ProcessPage = () => {
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
        mainText="초보 탐조자를 위한 탐조 가이드"
        subText="아름다운 자연 속에서 새를 관찰하는 ‘탐조'는 누구나 즐길 수 있는 멋진 취미예요. 
                새록 가이드를 통해 자연을 존중하며 새를 만나는 즐거움을 배워보세요!"
        isGuide={true}
        scale={scale}
      />
      <ProcessContent scale={scale} />
    </div>
  );
};

export default ProcessPage;
