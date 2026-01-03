import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { scaledStyle } from "@/utils/scaleStyle";
import { useCuratedCollections } from "@/hooks/useCuratedSaeroks";
import { curatedIds } from "@/constants/curatedIds";
import BackgroundCarouselCard from "./BackgroundCarouselCard";
import { useMemo, useRef } from "react";
import type { CollectionItem } from "@/features/saerok/CollectionType";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface BackgroundCarouselProps {
  scale?: number;
  direction?: "left" | "right";
  speed?: number; // 값 클수록 빨라짐
}

const BASE_HEIGHT = 271; // scale=1일 때 높이

const BackgroundCarousel = ({
  scale = 1,
  direction,
  speed = 60,
}: BackgroundCarouselProps) => {
  const outerRef = useRef<HTMLDivElement | null>(null); // 레이아웃 영역(스케일 조정용)
  const innerRef = useRef<HTMLDivElement | null>(null); // transform scale 적용 영역
  const trackRef = useRef<HTMLDivElement | null>(null); // 애니메이션 트랙
  const tlRef = useRef<gsap.core.Timeline | null>(null); // 애니메이션 타임라인

  const { data, loading, error } = useCuratedCollections(curatedIds);

  const loopData = useMemo<CollectionItem[]>(() => {
    return data ? [...data, ...data] : [];
  }, [data]);

  useGSAP(
    () => {
      const outer = outerRef.current;
      const inner = innerRef.current;
      const track = trackRef.current;
      if (!outer || !inner || !track) return;
      if (!loopData || loopData.length === 0) return;

      const isLeft = direction === "left";

      const build = () => {
        tlRef.current?.kill();
        gsap.killTweensOf(track);

        const totalW = track.scrollWidth; // 트랙 전체 길이
        const halfW = totalW / 2; // 1세트 길이
        if (!halfW || !Number.isFinite(halfW)) return;

        gsap.set(track, { x: isLeft ? 0 : -halfW });

        const duration = halfW / Math.max(1, speed); // px/sec 기반

        const tl = gsap.timeline({ repeat: -1 });
        tl.to(track, {
          x: isLeft ? -halfW : 0,
          duration,
          ease: "none",
          // 루프 순간에 스냅해서 티 안 나게
          onComplete: () => {
            gsap.set(track, { x: isLeft ? 0 : -halfW });
          },
        });
        tlRef.current = tl;
      };

      build();

      // 리사이즈/폰트/이미지 로딩으로 폭이 바뀌면 재빌드
      const ro = new ResizeObserver(() => build());
      ro.observe(outer);
      ro.observe(track);

      return () => {
        ro.disconnect();
        tlRef.current?.kill();
        tlRef.current = null;
      };
    },
    { dependencies: [loopData?.length, direction, speed] }
  );

  if (loading) return <></>;
  if (error) return <></>;
  if (!data || data.length === 0) return <></>;

  return (
    // 레이아웃이 차지하는 높이를 scale 반영해서 잘림/겹침 방지
    <div
      ref={outerRef}
      className="w-full overflow-hidden select-none"
      style={{
        height: BASE_HEIGHT * scale,
      }}
    >
      {/* 눈에 보이는 크기 여기서 통째로 scale */}
      <div
        ref={innerRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "left top",
          width: "100%",
          height: BASE_HEIGHT,
          willChange: "transform",
        }}
      >
        <div
          ref={trackRef}
          className="flex flex-row"
          style={{
            ...scaledStyle(scale, { gap: 10 }),
            willChange: "transform",
            transform: "translate3d(0, 0, 0)",
          }}
        >
          {loopData.map((item, idx) => (
            <BackgroundCarouselCard
              key={`${item.collectionId}-${idx}`}
              item={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundCarousel;
