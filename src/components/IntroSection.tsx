import RoundButton from "@/components/RoundButton";
import qrCode from "@/assets/images/qr-code.png";
import { scaledStyle } from "@/utils/scaleStyle";

interface IntroSectionProps {
  mainText?: string;
  subText?: string;
  isGuide?: boolean;
  isWhite?: boolean;
  scale?: number;
}

const IntroSection = ({
  mainText,
  subText,
  isGuide = false,
  isWhite,
  scale = 1,
}: IntroSectionProps) => {
  return (
    <div
      className={`w-full ${
        isGuide
          ? "bg-mainBlue text-background-white"
          : isWhite
          ? "bg-background-white text-mainBlue"
          : "bg-mainBlueGrad text-mainBlue"
      }  flex flex-col gap-0`}
      style={scaledStyle(scale, {
        height: 385,
        paddingLeft: 120,
        paddingRight: 120,
        paddingTop: 88,
      })}
    >
      <span
        className="font-700"
        style={scaledStyle(scale, {
          fontSize: 50,
          lineHeight: 50,
          letterSpacing: -4,
          marginBottom: 16,
        })}
      >
        {mainText}
      </span>
      <span
        className=" font-400 whitespace-pre-line"
        style={scaledStyle(
          scale,
          isGuide
            ? {
                fontSize: 24,
                lineHeight: 36,
                letterSpacing: -1.2,
                marginBottom: 28,
              }
            : {
                fontSize: 20,
                lineHeight: 25,
                letterSpacing: -1,
                marginBottom: 42,
              }
        )}
      >
        {subText}
      </span>
      <div
        className="flex flex-row items-end justify-start"
        style={scaledStyle(scale, {
          height: 91,
          gap: 16,
        })}
      >
        <img src={qrCode} alt="QR Code" className="h-full" />
        {/* 이거 moveTo 수정해야 됨 */}
        <RoundButton
          text="앱 다운 받기"
          href="https://apps.apple.com/kr/app/%EC%83%88%EB%A1%9D-%EC%9D%BC%EC%83%81-%EC%86%8D%EC%9D%98-%ED%83%90%EC%A1%B0-%EC%9D%BC%EC%A7%80/id6744866662"
          scale={scale}
        />
      </div>
    </div>
  );
};
export default IntroSection;
