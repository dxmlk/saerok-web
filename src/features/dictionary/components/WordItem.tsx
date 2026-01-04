import React, { useMemo } from "react";
import { WORDS, type DictionaryItem } from "@/constants/words";

interface WordItemProps {
  word: string;
  index: number;
  onClick?: (word: string) => void;
}

const WordItem: React.FC<WordItemProps> = ({ word, index, onClick }) => {
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
        zIndex: 10 + index,
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

  const baseFontSize = WORDS.find((w) => w.word === word)?.fontSize ?? 56;

  return (
    <div
      className={[
        "word absolute select-none cursor-pointer",
        "font-400 text-background-white",
      ].join(" ")}
      style={style}
      data-index={index}
      data-word={word}
      data-base-fontsize={baseFontSize}
      onClick={() => onClick?.(word)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.(word);
      }}
    >
      {/*  scale/glow는 이 span에만 적용됨 */}
      <span className="word-label inline-block origin-center">{word}</span>
    </div>
  );
};

export default WordItem;
