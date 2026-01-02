import SaerokDetailListCard from "@/features/saerok/detail/SaerokDetailListCard";
import SaerokDetailCard from "@/features/saerok/detail/SaerokDetailCard";
import SaerokDetailList from "@/features/saerok/detail/SaerokDetailList";
import { useEffect } from "react";
import { useResponsive } from "@/design/ResponsiveContext";

const AboutPage = () => {
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
    <div className="w-full bg-background-lightWhitegray ">
      <span>테스트 페이지</span>
      <SaerokDetailListCard scale={scale} />
      <SaerokDetailCard scale={scale} />
      <SaerokDetailList scale={scale} />
    </div>
  );
};

export default AboutPage;
