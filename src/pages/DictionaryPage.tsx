import { useDesignScaleValue } from "@/design/DesignScaleContext";
import WordCloud from "../features/dictionary/components/WordCloud";
import { useEffect } from "react";

const DictionaryPage = () => {
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
    <div className="w-full bg-background-lightWhitegray ">
      <WordCloud scale={scale} />
    </div>
  );
};

export default DictionaryPage;
