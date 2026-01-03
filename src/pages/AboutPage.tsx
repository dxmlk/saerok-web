import { useEffect } from "react";
import { useResponsive } from "@/design/ResponsiveContext";
import Hero from "@/features/home/sections/Hero";

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
    <div className="w-full bg-background-white  ">
      <Hero scale={scale} />
      {/* <BackgroundCarousel scale={scale} /> */}
    </div>
  );
};

export default AboutPage;
