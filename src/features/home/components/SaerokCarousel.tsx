import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SaerokCarouselCard from "./SaerokCarouselCard";
import { scaledStyle } from "@/utils/scaleStyle";
import { useCuratedCollections } from "@/hooks/useCuratedSaeroks";
import SaerokCarouselCardSkeleton from "./SaerokCarouselCardSkeleton";
import { ReactComponent as ArrowIcon } from "@/assets/icons/right-arrow.svg";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SaerokCarouselProps {
  scale?: number;
  region?: string | null;
}

const REGION_TO_IDS: Record<string, number[]> = {
  경기: [1273, 1523, 1525, 1055, 1265, 689],
  경북: [1287, 754, 753, 752],
  제주: [1527, 1532, 1542, 1544, 1546],
  경남: [1535, 693, 454, 1281, 1206],
  서울: [1103, 1274, 1261, 653, 488, 485],
  충남: [1104, 489, 462, 103],
};

const DEFAULT_CURATED_IDS = [1273, 1523, 1525, 1055, 1265, 689];

const SaerokCarousel = ({ scale = 1, region }: SaerokCarouselProps) => {
  const navigate = useNavigate();

  const trackRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const curatedIds =
    region && REGION_TO_IDS[region]
      ? REGION_TO_IDS[region]
      : DEFAULT_CURATED_IDS;

  const { data, loading, error } = useCuratedCollections(curatedIds);

  const dataSig = data?.map((d) => d.collectionId).join(",") || "";

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      // 트리거 = 가장 가까운 .slider-section (SaerokPreview 전체를 pin)
      const section = track.closest(".slider-section") as HTMLElement | null;
      if (!section) return;

      const slides = Array.from(track.querySelectorAll<HTMLElement>(".slide"));
      if (slides.length === 0) return;

      const build = () => {
        // 기존 인스턴스 정리
        tweenRef.current?.scrollTrigger?.kill();
        tweenRef.current?.kill();
        tweenRef.current = null;

        // 인라인 transform/opacity 흔적 제거 (경고 방지)
        gsap.set(slides, { clearProps: "transform,opacity" });

        // ===== 측정 =====
        const containerW = section.clientWidth;
        const anchorPercent = 0.32; // 활성 기준선(좌측 32%)
        const anchorX = containerW * anchorPercent;

        const centers = slides.map((el) => el.offsetLeft + el.offsetWidth / 2);
        const totalW = track.scrollWidth;
        const maxTranslate = Math.max(0, totalW - containerW);

        // 초기 활성: 두 번째
        const initialIndex = 0;
        const clamp = (v: number, a: number, b: number) =>
          Math.max(a, Math.min(b, v));
        const alignX = (i: number) =>
          clamp(centers[i] - anchorX, 0, maxTranslate);

        const initialX = alignX(initialIndex);

        //  “마지막 카드 센터가 anchorX에 도달할 수 있는” 종료점으로 확장
        const lastCenter = centers[centers.length - 1];
        const requiredEndX = Math.max(maxTranslate, lastCenter - anchorX);
        // (maxTranslate로는 부족할 수 있으니, 부족하면 더 멀리까지 이동 허용)

        const range = Math.max(1, requiredEndX - initialX);

        // 스냅 포인트(0..1)도 확장된 종료점 기준으로 재계산
        const snapPoints = centers.map((c) => {
          const wantX = clamp(c - anchorX, initialX, requiredEndX);
          return (wantX - initialX) / range; // 0..1
        });

        // 초기 활성 클래스
        slides.forEach((el, i) =>
          el.classList.toggle("is-active", i === initialIndex)
        );
        let active = initialIndex;
        let initialized = false;

        // ===== 스크롤 길이(px) 동적 계산 =====
        // 가로 이동량(requiredEndX - initialX)에 비례해 세로 스크롤 길이 확보
        const SCROLL_PER_PX = 0.8; // 느긋하게 이동(필요시 1.3~1.8로 올리세요)
        const MIN_SCROLL = 800; // 최소 스크롤 길이(px)
        const scrollLenPx = Math.max(
          MIN_SCROLL,
          Math.ceil((requiredEndX - initialX) * SCROLL_PER_PX)
        );

        const tween = gsap.fromTo(
          track,
          { x: -initialX },
          {
            // ✅ 종료 X도 확장된 requiredEndX 사용
            x: -requiredEndX,
            ease: "none",
            scrollTrigger: {
              trigger: section, // SaerokPreview 전체를 pin
              start: "top top",
              end: () => `+=${scrollLenPx}px`, // 퍼센트 대신 px로 안전히 계산
              pin: true,
              pinSpacing: true,
              scrub: 0.6,
              invalidateOnRefresh: true, // 리프레시 때 end/치수 재계산
              // markers: true,               // 필요 시 디버그
              snap: {
                snapTo: (v) => gsap.utils.snap(snapPoints, v),
                duration: 0.08,
                ease: "power1.out",
              },
              onUpdate: () => {
                if (!initialized) {
                  initialized = true;
                  return;
                }
                const tx = Number(gsap.getProperty(track, "x")) || 0; // 음수
                const currentX = -tx; // 양수

                // 기준선(anchorX)에 가장 가까운 슬라이드 = 활성
                let best = active;
                let bestDist = Infinity;
                for (let i = 0; i < slides.length; i++) {
                  const dist = Math.abs(centers[i] - currentX - anchorX);
                  if (dist < bestDist) {
                    bestDist = dist;
                    best = i;
                  }
                }

                if (best !== active) {
                  slides[active]?.classList.remove("is-active");
                  slides[best]?.classList.add("is-active");
                  active = best;
                }
              },
            },
          }
        );

        tweenRef.current = tween;

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          if (tweenRef.current === tween) tweenRef.current = null;
        };
      };

      // 최초 세팅
      let cleanup = build();

      // 이미지 로딩/리사이즈 시 재빌드
      const onLoad = () => {
        cleanup?.();
        ScrollTrigger.refresh();
        cleanup = build();
      };
      const onResize = () => {
        cleanup?.();
        ScrollTrigger.refresh();
        cleanup = build();
      };

      window.addEventListener("load", onLoad);
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("load", onLoad);
        window.removeEventListener("resize", onResize);
        cleanup?.();
        tweenRef.current?.scrollTrigger?.kill();
        tweenRef.current?.kill();
        tweenRef.current = null;
      };
    },
    { scope: trackRef, dependencies: [region, dataSig] }
  );

  if (loading) {
    return (
      <div
        ref={trackRef}
        className="slides-track w-full bg-background-white flex flex-row overflow-visible touch-pan-y overscroll-contain select-none gap-20"
        style={scaledStyle(scale, {
          height: 495,
          paddingTop: 20,
          paddingBottom: 20,
        })}
      >
        <div
          className="h-full shrink-0 m-0 p-0"
          style={scaledStyle(scale, { width: 120 })}
        />
        {curatedIds.map((_, idx) => (
          <SaerokCarouselCardSkeleton key={`skeleton-${idx}`} scale={scale} />
        ))}
        <div
          className="h-full shrink-0 m-0 p-0 flex items-center justify-center"
          style={scaledStyle(scale, { width: 120 })}
        />
      </div>
    );
  }
  if (error) return <></>;
  if (!data || data.length === 0) return <></>;

  return (
    <div
      ref={trackRef}
      className="slides-track w-full bg-background-white flex flex-row overflow-visible touch-pan-y overscroll-contain select-none gap-20"
      style={scaledStyle(scale, {
        height: 495,
        paddingTop: 20,
        paddingBottom: 20,
      })}
    >
      <div
        className="h-full shrink-0 m-0 p-0"
        style={scaledStyle(scale, { width: 120 })}
      />
      {data.map((item) => (
        <SaerokCarouselCard key={item.collectionId} scale={scale} item={item} />
      ))}
      <div
        className="flex items-center justify-end cursor-pointer"
        style={scaledStyle(scale, { width: 343, height: 455, marginLeft: 150 })}
        onClick={() => navigate("/saerok")}
      >
        <ArrowIcon style={scaledStyle(scale, { width: 155, height: 155 })} />
      </div>
    </div>
  );
};

export default SaerokCarousel;
