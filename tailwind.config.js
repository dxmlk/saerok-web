const pxToRem = (px) => `${px / 16}rem`;

const makeRemScale = (max = 500) =>
  Object.fromEntries(
    Array.from({ length: max + 1 }, (_, n) => [`${n}`, pxToRem(n)])
  );

const EXTRA = {
  1: "1px",
  2: pxToRem(2),
  3: pxToRem(3),
  4: pxToRem(4),
  5: pxToRem(5),
  6: pxToRem(6),
  7: pxToRem(7),
  8: pxToRem(8),
  9: pxToRem(9),
  10: pxToRem(10),
  11: pxToRem(11),
  12: pxToRem(12),
  13: pxToRem(13),
  14: pxToRem(14),
  15: pxToRem(15),
  16: pxToRem(16),
  18: pxToRem(18),
  20: pxToRem(20),
  25: pxToRem(25),
  27: pxToRem(27),
  28: pxToRem(28),
  30: pxToRem(30),
  36: pxToRem(36),
  40: pxToRem(40),
  43: pxToRem(43),
  46: pxToRem(46),
  49: pxToRem(49),
  50: pxToRem(50),
  60: pxToRem(60),
  65: pxToRem(65),
  67: pxToRem(67),
  74: pxToRem(74),
  78: pxToRem(78),
  79: pxToRem(79),
  85: pxToRem(85),
  87: pxToRem(87),
  88: pxToRem(88),
  91: pxToRem(91),
  100: pxToRem(100),
  105: pxToRem(105),
  107: pxToRem(107),
  111: pxToRem(111),
  113: pxToRem(113),
  120: pxToRem(120),
  155: pxToRem(155),
  170: pxToRem(170),
  218: pxToRem(218),
  263: pxToRem(263),
  323: pxToRem(323),
  343: pxToRem(343),
  350: pxToRem(350),
  385: pxToRem(385),
  435: pxToRem(435),
  455: pxToRem(455),
  495: pxToRem(495),
  662: pxToRem(662),
  955: pxToRem(955),
};

const REM_ENTRIES = { ...makeRemScale(500), ...EXTRA };

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        blink: "blink 1s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      spacing: REM_ENTRIES,
      width: REM_ENTRIES,
      height: { "100dvh": "100dvh", ...REM_ENTRIES },
      minWidth: REM_ENTRIES,
      minHeight: REM_ENTRIES,
      maxWidth: REM_ENTRIES,
      maxHeight: REM_ENTRIES,

      fontWeight: {
        400: "400",
        500: "500",
        600: "600",
        700: "700",
        800: "800",
      },
      fontFamily: {
        pretendard: ["'Pretendard Variable'", "sans-serif"],
        moneygraphy: ["'Moneygraphy'", "sans-serif"],
        haru: ["'Jalpullineunharu'", "sans-serif"],
      },
      backgroundImage: {
        mainBlueGrad:
          "linear-gradient(257deg, #CDDDF3 -98.92%, #F3F3F3 85.21%)",
        blackLayer:
          "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(41,41,41,0.5) 100%)",
      },
      colors: {
        mainBlue: "#4190FF",
        background: {
          white: "#FEFEFE",
          lightWhitegray: "#F2F2F2",
        },
        font: {
          black: "#0D0D0D",
          darkGray: "#6D6D6D",
          gray: "#979797",
        },
      },
      fontSize: {
        ...EXTRA,
        "body-1": [pxToRem(15), { lineHeight: pxToRem(18) }],
        "caption-1": [pxToRem(13), { lineHeight: pxToRem(16) }],
        "subtitle-1-3": [pxToRem(20), { lineHeight: pxToRem(19) }],
        "headline-2-2": [pxToRem(22)],
      },
      borderWidth: {
        1: "1px",
        3: "3px",
      },
      borderRadius: {
        none: "0",
        10: pxToRem(10),
        20: pxToRem(20),
        30: pxToRem(30),
        full: pxToRem(9999),
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".glassmorphism": {
          backgroundColor: "rgba(254, 254, 254, 0.6)",
          backdropFilter: "blur(2px)",
        },
      });
    },
  ],
};
