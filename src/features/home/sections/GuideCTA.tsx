import RoundButton from "@/components/RoundButton";
import GuideBlock from "../components/GuideBlock";
import duckBlue from "@/assets/images/duck-square/duck-blue.png";
import duckPink from "@/assets/images/duck-square/duck-pink.png";
import duckPurple from "@/assets/images/duck-square/duck-purple.png";
import { scaledStyle } from "@/utils/scaleStyle";
import { useCallback, useEffect, useRef, useState } from "react";
import GuideBlockSmall from "../components/GuideBlockSmall";

interface GuideCTAProps {
  scale?: number;
}

const GuideCTA = ({ scale = 1 }: GuideCTAProps) => {
  const leftRef = useRef<HTMLElement | null>(null);
  const rightRef = useRef<HTMLElement | null>(null);
  const bottomRef = useRef<HTMLElement | null>(null);

  const [showRight, setShowRight] = useState(true);

  const checkOverlap = useCallback(() => {
    if (!leftRef.current || !rightRef.current) return;

    const leftRect = leftRef.current.getBoundingClientRect();
    const rightRect = rightRef.current.getBoundingClientRect();

    const gap = rightRect.left - leftRect.right; // 양수면 떨어져 있음

    const HIDE_THRESHOLD = 80; // 이보다 좁아지면 숨김
    const SHOW_THRESHOLD = 120; // 이보다 넓어지면 다시 보이게

    setShowRight((prev) => {
      if (gap < HIDE_THRESHOLD) {
        // 너무 붙으면 무조건 숨김
        return false;
      }
      if (gap > SHOW_THRESHOLD) {
        // 충분히 멀어지면 무조건 보이게
        return true;
      }
      // 사이 구간에선 이전 상태 유지 → 깜빡임 방지
      return prev;
    });
  }, []);

  useEffect(() => {
    checkOverlap();

    window.addEventListener("resize", checkOverlap);
    return () => {
      window.removeEventListener("resize", checkOverlap);
    };
  }, [checkOverlap, scale]);

  return (
    <main
      className="relative w-full pt-111 bg-background-lightWhitegray"
      style={scaledStyle(scale, {
        height: 721,
        paddingTop: 111,
      })}
    >
      {/* 왼쪽 섹션 (측정용 wrapper) */}
      <section ref={leftRef} className="absolute left-0 flex flex-col">
        {/* 실제 패딩/내용은 안쪽 div에서만 제어 */}
        <div className={showRight ? "pl-120" : "pl-74"}>
          <span
            className="text-mainBlue font-700"
            style={scaledStyle(scale, {
              fontSize: 50,
              lineHeight: 50,
              letterSpacing: -4,
            })}
          >
            탐조가 처음이세요?
          </span>
          <div
            className="flex flex-col text-font-black font-400 gap-0 mt-20 mb-50"
            style={scaledStyle(scale, {
              gap: 0,
              marginTop: 20,
              marginBottom: 50,
              fontSize: 20,
              lineHeight: 25,
              letterSpacing: -1,
            })}
          >
            <span>탐조 방법부터 주의사항까지,</span>
            <span>새록이 자세하게 알려드릴게요!</span>
          </div>
          <div
            className="flex flex-row gap-15 items-center justify-start"
            style={scaledStyle(scale, {
              gap: 15,
            })}
          >
            <RoundButton text="탐조 가이드" moveTo="guide" scale={scale} />
            <RoundButton
              text="탐조 단어사전"
              moveTo="dictionary"
              scale={scale}
            />
          </div>
        </div>
        {/* 하단 섹션 */}
        <section
          ref={bottomRef}
          className=" pl-74 flex flex-row"
          style={{
            ...scaledStyle(scale, {
              right: -98,
              maxWidth: 955,
              gap: 20,
              marginTop: 31,
            }),
            opacity: showRight ? 0 : 1,
            pointerEvents: showRight ? "none" : "auto",
          }}
        >
          <GuideBlockSmall
            imgSrc={duckBlue}
            title="탐조 에티켓"
            description={`탐조할 때 지켜야 할 에티켓
              에 대해 알아보아요.`}
            scale={scale}
            moveTo="etiquette"
          />
          <GuideBlockSmall
            imgSrc={duckPink}
            title="탐조 장비"
            description={`탐조할 때 들고다닐 장비에
              는 무엇이 있나요?`}
            scale={scale}
            moveTo="process"
          />
          <GuideBlockSmall
            imgSrc={duckPurple}
            title="팁"
            description={`그 외 도움이 되는 팁들을
              알려드릴게요.`}
            scale={scale}
            moveTo="tips"
          />
        </section>
      </section>

      {/* 오른쪽 섹션 */}
      <section
        ref={rightRef}
        className="absolute -right-98 w-full flex flex-col gap-20"
        style={{
          ...scaledStyle(scale, {
            right: -98,
            maxWidth: 955,
            gap: 20,
          }),
          opacity: showRight ? 1 : 0,
          pointerEvents: showRight ? "auto" : "none",
        }}
      >
        <GuideBlock
          imgSrc={duckBlue}
          title="탐조 에티켓"
          description="탐조할 때 지켜야 할 에티켓에 대해 알아보아요."
          scale={scale}
          moveTo="etiquette"
        />
        <GuideBlock
          imgSrc={duckPink}
          title="탐조 장비"
          description="탐조할 때 들고다닐 장비에는 무엇이 있나요?"
          scale={scale}
          moveTo="process"
        />
        <GuideBlock
          imgSrc={duckPurple}
          title="팁"
          description="그 외 도움이 되는 팁들을 알려드릴게요."
          scale={scale}
          moveTo="tips"
        />
      </section>
    </main>
  );
};

export default GuideCTA;
