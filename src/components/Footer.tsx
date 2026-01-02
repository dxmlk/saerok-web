import type { LayoutType } from "@/design/ResponsiveContext";
import AppInstallButton from "./AppInstallButton";
import { ReactComponent as InstagramIcon } from "@/assets/icons/instagram.svg";

interface FooterProps {
  layout?: LayoutType;
  scale?: number;
}

const Footer = ({ layout, scale = 1 }: FooterProps) => {
  const isMobile = layout === "mobile" || layout === "tablet";
  return (
    <footer
      className="w-full bg-font-gray px-120 py-46 flex flex-col justify-start text-background-white text-body-1 font-400 "
      style={{
        height: isMobile ? `${319 * scale}px` : `${263 * scale}px`,
        paddingTop: `${46 * scale}px`,
        paddingBottom: `${46 * scale}px`,
        paddingLeft: isMobile ? `${37 * scale}px` : `${120 * scale}px`,
        paddingRight: isMobile ? `${37 * scale}px` : `${120 * scale}px`,
        fontSize: `${15 * scale}px`,
        lineHeight: `${18 * scale}px`,
      }}
    >
      <AppInstallButton scale={scale} isFooter={true} />
      <span
        className="mt-36 mb-13 text-body-1 font-700 "
        style={{
          fontSize: `${15 * scale}px`,
          lineHeight: `${18 * scale}px`,
          marginTop: `${36 * scale}px`,
          marginBottom: `${13 * scale}px`,
        }}
      >
        (TEAM) 어푸
      </span>
      <div
        className="flex flex-row justify-between items-center mb-49"
        style={{
          marginBottom: `${49 * scale}px`,
        }}
      >
        <div
          className="flex flex-row justify-start gap-27"
          style={{
            gap: `${27 * scale}px`,
          }}
        >
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdz8yDFArb6tP9em_Km5XjyTovDGSgHn9PpJ9dqXEqgJQ7lmg/viewform"
            target="_blank"
            rel="noopener noreferrer"
          >
            의견 보내기
          </a>
          <a
            href="https://shine-guppy-3de.notion.site/29d7cea87e058088a7cde5f3fc6622ad?pvs=143"
            target="_blank"
            rel="noopener noreferrer"
          >
            개인정보처리방침
          </a>
        </div>
        {!isMobile && (
          <div
            className="flex flex-row justify-end gap-27"
            style={{
              gap: `${27 * scale}px`,
            }}
          >
            <span>웹사이트</span>
            <a
              href="https://www.instagram.com/saerok.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              인스타그램
            </a>
          </div>
        )}
      </div>
      <span>Copyright</span>
      {isMobile && (
        <a
          className="mt-30"
          href="https://www.instagram.com/saerok.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
        </a>
      )}
    </footer>
  );
};
export default Footer;
