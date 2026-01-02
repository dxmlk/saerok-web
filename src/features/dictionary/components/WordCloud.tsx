// components/WordCloud/WordCloud.tsx
import React, { useState } from "react";
import { WORDS } from "@/constants/words";
import WordItem from "./WordItem";
import { useMatterSimulation } from "./useMatterSimulation";
import { ReactComponent as DictionaryBg } from "@/assets/images/dictionary_bg.svg";

interface WordCloudProps {
  scale?: number;
}

const WordCloud: React.FC<WordCloudProps> = ({ scale = 1 }) => {
  useMatterSimulation(scale);

  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  return (
    <div id="wordcloud-root">
      <div className="relative bg-background-white min-h-[300vh] overflow-hidden">
        {/* 1) Matter.js canvas (맨 뒤) */}
        <div
          id="matter-canvas"
          className="absolute inset-0 h-[300vh] pointer-events-none -z-20"
        />

        {/* 2) 배경 SVG: 래퍼 없이 바로 absolute로 깔기 */}
        <div className="absolute top-0 left-0 right-0 z-0 pointer-events-none">
          <DictionaryBg className="w-full h-full" />
        </div>

        {/* 3) 단어 레이어 */}
        <div className="relative h-[100vh]">
          {WORDS.map((item, idx) => (
            <WordItem
              key={idx}
              word={item.word}
              meaning={item.meaning}
              index={idx}
            />
          ))}
        </div>
      </div>

      {/* 4) 바닥 (그대로 유지) */}
      <div className="w-full h-[120px] bg-mainBlue z-20" />
    </div>
  );
};

export default WordCloud;
