import NavButton from "@/components/NavButton";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { id: "home", label: "HOME" },
  { id: "saerok", label: "새록 둘러보기" },
  { id: "guide", label: "탐조 가이드" },
  { id: "dictionary", label: "탐조 단어사전" },
  { id: "about", label: "ABOUT 새록" },
];

interface NavBarProps {
  scale?: number;
}

const NavBar = ({ scale = 1 }: NavBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathSeg = location.pathname.split("/")[1] || "home";
  const active = NAV_ITEMS.some((i) => i.id === pathSeg) ? pathSeg : "home";

  const handleClick = (id: string) => {
    navigate(`/${id === "home" ? "" : id}`);
  };

  return (
    <nav
      className="w-full bg-transparent h-60"
      style={{ height: `${60 * scale}px` }}
    >
      <div className="w-full h-full flex items-start justify-between">
        <ul className=" h-full flex flex-row items-start -space-x-20 flex-none">
          {NAV_ITEMS.slice(0, NAV_ITEMS.length - 1).map((item, index) => (
            <NavButton
              key={item.id}
              label={item.label}
              active={active === item.id}
              onClick={() => handleClick(item.id)}
              zIndex={NAV_ITEMS.length - index}
              className="-space-x-20"
              scale={scale}
            />
          ))}
        </ul>
        <ul className="flex-none">
          <NavButton
            label="ABOUT 새록"
            active={active === "about"}
            onClick={() => handleClick("about")}
            zIndex={NAV_ITEMS.length}
            className="space-x-20"
            isAbout={true}
            scale={scale}
          />
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
