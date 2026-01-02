import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { CollectionItem } from "@/features/saerok/CollectionType";
import NicknameBadge from "./NicknameBadge";
import { ReactComponent as LocationIcon } from "@/assets/icons/location.svg";
import { ReactComponent as DateIcon } from "@/assets/icons/date.svg";
import { useNavigate } from "react-router-dom";
import { scaledStyle } from "@/utils/scaleStyle";

interface SaerokListCardProps {
  scale?: number;
  item: CollectionItem;
}

const DURATION = 0.45;
const EASE = "power2.out";

const SaerokListCard = ({ scale = 1, item }: SaerokListCardProps) => {
  const navigate = useNavigate();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const frontRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      !wrapRef.current ||
      !innerRef.current ||
      !frontRef.current ||
      !backRef.current
    )
      return;

    const ctx = gsap.context(() => {
      gsap.set(innerRef.current!, {
        willChange: "opacity, transform",
        scale: 1,
      });
      gsap.set(frontRef.current!, { opcaity: 1 });
      gsap.set(backRef.current!, { opacity: 0 });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  const handleEnter = () => {
    if (!frontRef.current || !backRef.current) return;
    gsap.to(frontRef.current, { opacity: 0, duration: DURATION, ease: EASE });
    gsap.to(backRef.current, { opacity: 1, duration: DURATION, ease: EASE });
    // if (innerRef.current)
    //   gsap.to(innerRef.current, {
    //     scale: 1.02,
    //     duration: DURATION,
    //     ease: EASE,
    //   });
  };

  const handleLeave = () => {
    if (!frontRef.current || !backRef.current) return;
    gsap.to(frontRef.current, { opacity: 1, duration: DURATION, ease: EASE });
    gsap.to(backRef.current, { opacity: 0, duration: DURATION, ease: EASE });
    // if (innerRef.current)
    //   gsap.to(innerRef.current, { scale: 1, duration: DURATION, ease: EASE });
  };
  const handleClick = () => {
    navigate(`/saerok/detail/${item.collectionId}`);
  };

  return (
    <div
      ref={wrapRef}
      className="group relative w-full h-auto overflow-visible break-inside-avoid z-20"
      style={scaledStyle(scale, {
        borderRadius: 20,
        marginBottom: 20,
      })}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      {/* 투명 레이어, 높이 결정용 */}
      <img
        src={item.imageUrl}
        alt=""
        className="block w-full h-auto opacity-0 pointer-events-none select-none "
        draggable={false}
        aria-hidden
      />
      <div ref={innerRef} className="absolute inset-0">
        {/* 앞면 */}
        <div
          ref={frontRef}
          className="face front absolute inset-0 overflow-hidden"
          style={scaledStyle(scale, {
            borderRadius: 20,
          })}
        >
          <img
            src={item.imageUrl}
            alt={item.bird.koreanName}
            className=" w-full h-auto object-cover select-none"
            draggable={false}
          />
          <NicknameBadge user={item.user} />
        </div>
        {/* 뒷면 */}
        <div
          ref={backRef}
          className="face back absolute inset-0 overflow-hidden"
          style={scaledStyle(scale, {
            borderRadius: 20,
          })}
        >
          <img
            src={item.imageUrl}
            alt={item.bird.koreanName}
            className=" w-full h-auto object-cover select-none"
            draggable={false}
          />
          <NicknameBadge user={item.user} />
          <div className="absolute inset-0 bg-blackLayer z-20" />
          <div
            className="absolute z-20 flex flex-col font-400 text-background-lightWhitegray"
            style={scaledStyle(scale, {
              paddingLeft: 17,
              paddingRight: 17,
              bottom: 21.5,
              gap: 5,
              fontSize: 21,
              lineHeight: 24,
            })}
          >
            <div
              className="flex flex-row items-start justify-start "
              style={scaledStyle(scale, {
                gap: 15,
              })}
            >
              <LocationIcon style={scaledStyle(scale, { width: 24 })} />
              <div
                className="flex flex-col justify-start"
                style={scaledStyle(scale, {
                  gap: 2,
                })}
              >
                {/* 이거 아직 제대로 못함 truncate 설정 */}
                <span className="truncate w-full block">
                  {item.locationAlias}
                </span>
                <span
                  className="truncate w-full block text-font-gray"
                  style={scaledStyle(scale, {
                    fontSize: 17,
                  })}
                >
                  {item.address}
                </span>
              </div>
            </div>
            <div
              className="flex flex-row items-start justify-start"
              style={scaledStyle(scale, { gap: 15 })}
            >
              <DateIcon style={scaledStyle(scale, { width: 24 })} />
              <div
                className="flex flex-col justify-start"
                style={scaledStyle(scale, { gap: 2 })}
              >
                {/* date 표시 형식 정리 필요 */}
                <span className="truncate">{item.discoveredDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaerokListCard;
