import type { CSSProperties } from "react";

type ScaledProps = Partial<
  Pick<
    CSSProperties,
    | "paddingLeft"
    | "paddingRight"
    | "paddingTop"
    | "paddingBottom"
    | "gap"
    | "columnGap"
    | "marginBottom"
    | "marginTop"
    | "marginRight"
    | "marginLeft"
    | "borderRadius"
    | "bottom"
    | "top"
    | "right"
    | "left"
    | "fontSize"
    | "lineHeight"
    | "width"
    | "height"
    | "letterSpacing"
    | "borderWidth"
    | "maxWidth"
    | "minWidth"
    | "boxShadow"
  >
>;

export function scaledStyle(scale: number, base: ScaledProps): CSSProperties {
  const entries = Object.entries(base).map(([key, value]) => [
    key,
    typeof value === "number" ? `${value * scale}px` : value,
  ]);
  return Object.fromEntries(entries) as CSSProperties;
}
