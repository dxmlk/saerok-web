import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

interface RollingTextProps {
  startAnimation?: boolean;
  values: string[];
  startIndex: number; // 랜덤 시작점
  scale: number;
  onSelect?: (value: string) => void;
}

const RollingText: React.FC<RollingTextProps> = ({
  startAnimation = false,
  values,
  startIndex,
  scale = 1,
  onSelect,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemWidth = 100 * scale; // 각 아이템 너비
  const itemHeight = 50 * scale; // 각 아이템 높이
  const fontSize = 50 * scale; // 폰트 크기
  const currentYRef = useRef(0);

  // startIndex 기준으로 8개만 순회
  const visibleValues = useMemo(
    () =>
      Array.from(
        { length: 8 },
        (_, i) => values[(startIndex + i) % values.length]
      ),
    [values, startIndex]
  );

  useEffect(() => {
    if (!startAnimation || !containerRef.current) return;

    const totalItems = values.length;
    let speed = 40; // 초기 빠른 속도

    const interval = setInterval(() => {
      currentYRef.current += itemHeight;
      if (currentYRef.current > itemHeight * (totalItems - 1))
        currentYRef.current = 0;

      gsap.to(containerRef.current, {
        y: -currentYRef.current,
        duration: speed / 1000,
        ease: "none",
      });

      speed = Math.min(speed + 4, 80); // 점점 느려지도록 감속
    }, speed);

    // 0.6초 후 멈춤: 마지막 텍스트 고정
    const stopTimer = setTimeout(() => {
      clearInterval(interval);

      const finalIndex = totalItems - 1;
      const finalY = itemHeight * finalIndex;

      gsap.to(containerRef.current, {
        y: -itemHeight * (totalItems - 1), // 마지막 텍스트 위치
        duration: 0.3,
        ease: "power2.out",
      });

      const finalValue = visibleValues[finalIndex];
      if (onSelect) {
        onSelect(finalValue); // 상위로 선택된 텍스트 전달
      }
    }, 600);

    return () => {
      clearInterval(interval);
      clearTimeout(stopTimer);
    };
  }, [startAnimation, values, startIndex, onSelect]);

  return (
    <div
      style={{
        width: `${itemWidth}px`,
        height: `${itemHeight}px`,
        overflow: "hidden",
        display: "inline-block",
        verticalAlign: "middle",
      }}
    >
      <div ref={containerRef}>
        {visibleValues.map((value, idx) => (
          <div
            key={idx}
            className="text-center rolling-item"
            style={{
              height: `${itemHeight}px`,
              lineHeight: `${itemHeight}px`,
              fontSize: `${fontSize}px`,
              fontWeight: 700,
              letterSpacing: "-0.08em",
              color: "black",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RollingText;
