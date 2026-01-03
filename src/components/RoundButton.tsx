import { ReactComponent as FowardICon } from "@/assets/icons/forward.svg";
import { useNavigate } from "react-router-dom";

interface RoundButtonProps {
  text: string;
  moveTo?: string;
  href?: string;
  scale?: number;
}

const RoundButton = ({ text, moveTo, href, scale = 1 }: RoundButtonProps) => {
  const navigate = useNavigate();
  const itemHeight = 49 * scale;
  const fontSize = 20 * scale;

  const handleClick = () => {
    if (href) window.open(href, "_blank", "noopener,noreferrer");

    if (moveTo) {
      const path = moveTo.startsWith("/") ? moveTo : `/${moveTo}`;
      navigate(path);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-row justify-between items-center pl-20 pr-15 h-49 rounded-30 gap-8 border-1 border-mainBlue bg-background-white"
      style={{
        height: `${itemHeight}px`,
        fontSize: `${fontSize}px`,
        lineHeight: `${fontSize}px`,
        gap: `${8 * scale}px`,
        borderRadius: `${30 * scale}px`,
        paddingLeft: `${20 * scale}px`,
        paddingRight: `${15 * scale}px`,
      }}
    >
      <span
        className="text-subtitle-1-3 font-700 text-mainBlue"
        style={{
          fontSize: `${fontSize}px`,
        }}
      >
        {text}
      </span>
      <FowardICon />
    </button>
  );
};

export default RoundButton;
