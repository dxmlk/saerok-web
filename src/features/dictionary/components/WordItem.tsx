// components/WordCloud/WordItem.tsx
import React, { useMemo } from "react";
import { WORDS, type DictionaryItem } from "@/constants/words";

interface WordItemProps {
  word: string;
  meaning: string;
  index: number;
}

const WordItem: React.FC<WordItemProps> = ({ word, meaning, index }) => {
  const style = useMemo(() => {
    const config: DictionaryItem | undefined = WORDS.find(
      (w) => w.word === word
    );

    if (!config) {
      return {
        position: "absolute",
        top: "50vh",
        left: "50vw",
        transform: "translate(-50%, -50%)",
        fontSize: 48,
        pointerEvents: "auto",
      } as React.CSSProperties;
    }

    const { x, y, fontSize, center } = config;

    return {
      position: "absolute",
      top: `${y}vh`,
      left: `${x}vw`,
      transform: "translate(-50%, -50%) rotate(0deg)",
      fontSize: fontSize ?? 56,
      whiteSpace: "nowrap",
      wordBreak: "keep-all",
      zIndex: center ? 999 : 10 + index,
      pointerEvents: "auto",
    } as React.CSSProperties;
  }, [word, index]);

  const isCenterWord = WORDS.find((w) => w.word === word)?.center ?? false;

  const baseClassName = isCenterWord
    ? "word word-center absolute select-none font-700 text-background-white"
    : "word absolute select-none font-400 text-background-white";

  // ⬅ hover 시 빠른 깜빡임
  const className = `${baseClassName} hover:animate-blink-fast cursor-pointer`;

  return (
    <div className={className} style={style} data-index={index}>
      {word}
    </div>
  );
};

export default WordItem;
