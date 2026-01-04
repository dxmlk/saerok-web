import React, { useMemo, useState } from "react";
import { WORDS } from "@/constants/words";
import WordItem from "./WordItem";
import { useMatterSimulation } from "./useMatterSimulation";
import { ReactComponent as DictionaryBg } from "@/assets/images/dictionary_bg.svg";

interface WordCloudProps {
  scale?: number;
}

const WordCloud: React.FC<WordCloudProps> = ({ scale = 1 }) => {
  const sim = useMatterSimulation(scale);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const selectedItem = useMemo(
    () => WORDS.find((w) => w.word === selectedWord) ?? null,
    [selectedWord]
  );

  const handleWordClick = async (word: string) => {
    if (!sim.isPhysicsReady()) return;

    // 같은 단어 재클릭(해제): meaning 즉시 숨김 → 낙하
    if (selectedWord === word) {
      setSelectedWord(null);
      await sim.onWordClick(word);
      return;
    }

    // 다른 단어 클릭: 기존 meaning 먼저 숨김
    if (selectedWord !== null) {
      setSelectedWord(null);
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
    }

    // meaning은 리프트 진행률 콜백에서 켬(조금 올라가고 나서 뜨는 연출)
    await sim.onWordClick(word, () => {
      setSelectedWord(word);
    });
  };

  return (
    <div id="wordcloud-root">
      <div className="relative bg-background-white min-h-[300vh] overflow-hidden">
        {/* 1) Matter.js canvas (맨 뒤) */}
        <div
          id="matter-canvas"
          className="absolute inset-0 h-[300vh] pointer-events-none -z-20"
        />

        {/* 2) 배경 SVG */}
        <div className="absolute top-0 left-0 right-0 z-0 pointer-events-none">
          <DictionaryBg className="w-full h-full" />
        </div>

        {/* 3) 단어 레이어 */}
        <div className="relative h-[100vh]">
          {WORDS.map((item, idx) => (
            <WordItem
              key={idx}
              word={item.word}
              index={idx}
              onClick={handleWordClick}
            />
          ))}
        </div>
      </div>

      {/* 4) 바닥 */}
      <div id="wordcloud-floor" className="w-full h-[120px] bg-mainBlue z-20" />

      {/* meaning overlay (하나만)  root 좌표계에 붙임 */}
      <div
        id="wordcloud-meaning"
        className="absolute left-0 top-0 z-[5000] pointer-events-none"
        style={{ opacity: selectedItem ? 1 : 0, transition: "opacity 500ms" }}
      >
        <div
          className="text-font-black text-20 font-400 whitespace-normal break-words text-center"
          style={{
            width: "min(70vw, 420px)",
            transform: "translate(-50%, 0)", // x는 중앙정렬용
            position: "absolute",
            left: 0,
            top: 0,
          }}
        >
          {selectedItem?.meaning ?? ""}
        </div>
      </div>
    </div>
  );
};

export default WordCloud;
