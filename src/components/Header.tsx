import NavBar from "@/components/NavBar";
import AppInstallButton from "./AppInstallButton";
import { useNavigate } from "react-router-dom";
import saerokLogo from "@/assets/icons/logo.svg?url";
import saerokTypo from "@/assets/icons/typo.svg?url";
import type { LayoutType } from "@/design/ResponsiveContext";
import MobileHeader from "./tempPages/MobileHeader";

interface HeaderProps {
  layout: LayoutType;
  scale?: number;
}

const Header = ({ layout, scale = 1 }: HeaderProps) => {
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate(`/`);
  };

  if (layout === "mobile" || layout === "tablet") {
    return <MobileHeader scale={scale} />;
  }

  return (
    <header
      className="w-full h-113 px-120 bg-background-white relative z-10 "
      style={{
        height: `${113 * scale}px`,
        paddingLeft: `${120 * scale}px`,
        paddingRight: `${120 * scale}px`,
      }}
    >
      {/* 헤더 상단 */}
      <div className="flex flex-row justify-between">
        <div
          className="flex flex-row items-center gap-5 h-67"
          style={{
            height: `${67 * scale}px`,
            gap: `${5 * scale}px`,
          }}
          onClick={handleClickLogo}
        >
          <img src={saerokLogo} alt="saerok-logo" />
          <img src={saerokTypo} alt="saerok-typo" />
        </div>
        <AppInstallButton scale={scale} />
      </div>
      {/* 헤더 하단 */}
      <NavBar scale={scale} />
    </header>
  );
};

export default Header;
