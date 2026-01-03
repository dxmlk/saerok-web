import { ReactComponent as WebMain } from "@/assets/images/web-main.svg";
import { scaledStyle } from "@/utils/scaleStyle";
import BackgroundCarousel from "../components/BackgroundCarousel";

interface HeroProps {
  scale?: number;
}

const Hero = ({ scale = 1 }: HeroProps) => {
  return (
    <main
      className="bg-mainBlue w-full flex flex-row items-center overflow-hidden"
      style={scaledStyle(scale, { height: 812 })}
    >
      <WebMain
        className="shrink-0"
        style={scaledStyle(scale, {
          width: 581.79,
          height: 1010,
          marginTop: 20,
        })}
      />
      <div className="relative h-full w-full">
        <div
          className="absolute z-50"
          style={{
            ...scaledStyle(scale, {
              width: 181.21,
              height: 1010,
              left: -1,
              top: 0,
            }),
            background:
              "linear-gradient(90deg, #4190FF 0%, rgba(65, 144, 255, 0) 100%)",
          }}
        />
        <div
          className="flex flex-col items-center absolute "
          style={{
            ...scaledStyle(scale, {
              top: 0,
              left: 0,
              paddingTop: 77,
              paddingBottom: 77,
              gap: 20.97,
            }),
            opacity: 0.2,
          }}
        >
          <BackgroundCarousel scale={scale} direction="left" speed={70} />
          <BackgroundCarousel scale={scale} direction="right" speed={70} />

          {/* <BackgroundCarousel scale={scale} /> */}
        </div>
      </div>
    </main>
  );
};

export default Hero;
