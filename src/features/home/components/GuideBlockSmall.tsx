import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { scaledStyle } from "@/utils/scaleStyle";

interface GuideBlockSmallProps {
  imgSrc?: string;
  title?: string;
  description?: string;
  scale?: number;
  moveTo?: string;
}

const GuideBlockSmall = ({
  imgSrc,
  title,
  description,
  scale = 1,
  moveTo,
}: GuideBlockSmallProps) => {
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const handleClick = () => {
    navigate(`/guide/${moveTo}`);
  };

  useEffect(() => {
    if (!buttonRef.current) return;
    gsap.set(buttonRef.current, {
      scale: 1,
      transformOrigin: "center center",
      willChange: "transform",
    });
  }, []);

  const handleEnter = () => {
    const el = buttonRef.current;
    if (!el) return;
    gsap.to(el, { scale: 1.04, duration: 0.28, ease: "power2.out" });
  };

  const handleLeave = () => {
    const el = buttonRef.current;
    if (!el) return;
    gsap.to(el, { scale: 1, duration: 0.28, ease: "power2.out" });
  };

  return (
    <div
      ref={buttonRef}
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="cursor-pointer border-none bg-background-white flex flex-col "
      style={{
        width: `${185 * scale}px`,
        height: `${273 * scale}px`,
        borderRadius: `${20 * scale}px`,
        paddingTop: `${16 * scale}px`,
        paddingBottom: `${23 * scale}px`,
        paddingLeft: `${17 * scale}px`,
        paddingRight: `${17 * scale}px`,
        gap: `${17 * scale}px`,
      }}
    >
      <img
        src={imgSrc}
        alt="etiquette"
        className="border-none"
        style={scaledStyle(scale, {
          width: 150,
          height: 150,
          borderRadius: 15,
        })}
      />
      <div
        className="flex flex-col items-start"
        style={scaledStyle(scale, { gap: 5 })}
      >
        <span
          className="font-700 text-black"
          style={scaledStyle(scale, { fontSize: 20 })}
        >
          {title}
        </span>
        <span
          className="font-400 text-font-darkGray whitespace-pre-line"
          style={scaledStyle(scale, {
            fontSize: 15,
            lineHeight: 20,
            letterSpacing: -0.5,
          })}
        >
          {description}
        </span>
      </div>
    </div>
  );
};

export default GuideBlockSmall;
