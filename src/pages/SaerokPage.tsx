import IntroSection from "@/components/IntroSection";
import SaerokTail from "@/features/saerok/SaerokTail";
import SaerokList from "@/features/saerok/SaerokList";
import { useResponsive } from "@/design/ResponsiveContext";
import { useEffect } from "react";

const ExplorePage = () => {
  const { layout, scale } = useResponsive();

  useEffect(() => {
    // 페이지 진입/새로고침 시 스크롤 최상단으로
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // 부드럽게 스크롤
    });
  }, []);

  return (
    <div className=" bg-background-white ">
      <IntroSection
        mainText="내가 찍은 새를 공유해보세요"
        subText="내 주변의 새를 찾고, 공유하고, 소통할 수 있어요."
        isWhite={false}
        scale={scale}
      />
      <SaerokList scale={scale} />
      <SaerokTail scale={scale} />
    </div>
  );
};

export default ExplorePage;
