import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RollingText from "../components/RollingText";
import RoundButton from "@/components/RoundButton";
import SaerokCarousel from "../components/SaerokCarousel";
import REGION from "@/constants/region";
import { scaledStyle } from "@/utils/scaleStyle";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SaerokPreivewProps {
  scale?: number;
}

const SaerokPreview = ({ scale = 1 }: SaerokPreivewProps) => {
  const [startRolling, setStartRolling] = useState(false);
  const [startIndex] = useState(Math.floor(Math.random() * REGION.length));

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  useEffect(() => {
    setStartRolling(true);
  }, []);

  return (
    <main
      className="w-full bg-background-white slider-section overflow-x-hidden"
      style={{
        minHeight: `${window.innerHeight}px`,
      }}
    >
      <header
        className="px-120 text-mainBlue font-400 tracking-[-4px]"
        style={scaledStyle(scale, {
          fontSize: 50,
          lineHeight: 50,
          paddingTop: 107,
        })}
      >
        <div className="flex flex-row items-center">
          <span>요즘 [</span>
          <RollingText
            startAnimation={startRolling}
            values={REGION}
            startIndex={startIndex}
            scale={scale}
            onSelect={(value) => {
              setSelectedRegion(value);
            }}
          />
          <span>]에는</span>
        </div>
        <span>이런 새가 많이 보이네요.</span>
      </header>

      <div
        className="px-120 mt-65 mb-25"
        style={scaledStyle(scale, {
          marginTop: 65,
          marginBottom: 25,
        })}
      >
        <RoundButton text="새록 더 보러가기" moveTo="saerok" scale={scale} />
      </div>

      <div
        className="mb-87"
        style={scaledStyle(scale, {
          marginBottom: 87,
        })}
      >
        <SaerokCarousel scale={scale} region={selectedRegion} />
      </div>
    </main>
  );
};

export default SaerokPreview;
