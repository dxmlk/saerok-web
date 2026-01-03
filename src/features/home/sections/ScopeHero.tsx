"use client";
import type { HTMLAttributes } from "react";
import useSpotlightEffect from "@/hooks/useSpotlightEffect";
import background from "@/assets/images/background.jpg";

interface SpotlightConfig {
  spotlightSize?: number; // px
  spotlightIntensity?: number; // 0~1
  fadeSpeed?: number; // 0~1 (작을수록 더 부드럽게)
  glowColor?: string; // "#ffffff" 또는 "255,255,255" 모두 허용
  pulseSpeed?: number; // ms (0 또는 undefined면 비활성)
}

interface HeroProps extends HTMLAttributes<HTMLDivElement> {
  scale?: number;
  config?: SpotlightConfig;
}

const ScopeHero = ({
  scale = 1,
  config = {},
  className = "",
  ...divProps
}: HeroProps) => {
  const spotlightConfig: SpotlightConfig = {
    spotlightSize: 200,
    spotlightIntensity: 0.85,
    fadeSpeed: 1,
    glowColor: "#ffffff", // 원본처럼 glowColor 유지
    pulseSpeed: 0, // 필요시 2000 등으로 설정
    ...config,
  };

  // 캔버스 ref만 반환 (ref는 반드시 <canvas>에!)
  const canvasRef = useSpotlightEffect(spotlightConfig);

  return (
    <main
      className={`relative w-full bg-mainBlue overflow-hidden ${className}`}
      style={{
        height: `${812 * scale}px`,
        paddingLeft: `${120 * scale}px`,
        paddingRight: `${120 * scale}px`,
      }}
      {...divProps}
    >
      {/* 배경 이미지 */}
      <img
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        src={background}
        alt=""
      />

      {/* 오버레이 캔버스 — 반드시 여기(ref는 canvas에) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* 우측 하단 안내 */}
      <div
        className="absolute flex items-center justify-center "
        style={{
          width: `${180 * scale}px`,
          height: `${180 * scale}px`,
          right: `${60 * scale}px`,
          bottom: `${49 * scale}px`,
        }}
      >
        <div
          className="relative z-10 text-center whitespace-pre-line text-white font-400 pointer-events-none"
          style={{
            fontSize: `${20 * scale}px`,
            lineHeight: `${20 * scale}px`,
            letterSpacing: `${-1 * scale}px`,
          }}
        >
          {`망원경을 옮겨서 숨은\n새들을 찾아보세요!`}
        </div>
      </div>
    </main>
  );
};

export default ScopeHero;
