import { createContext, useContext } from "react";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { useDesignScaleValue } from "./DesignScaleContext";

export type LayoutType = "mobile" | "tablet" | "desktop";

const ResponsiveContext = createContext<{ layout: LayoutType }>({
  layout: "desktop",
});

export const ResponsiveProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const width = useWindowWidth();

  const layout: LayoutType =
    width < 768 ? "mobile" : width < 1150 ? "tablet" : "desktop";

  return (
    <ResponsiveContext.Provider value={{ layout }}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsive = () => {
  const { layout } = useContext(ResponsiveContext);
  const scale = useDesignScaleValue();

  return { layout, scale };
};
