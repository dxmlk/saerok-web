import { useEffect } from "react";
import "./App.css";
import { Mobile, PC } from "./components/Responsive";
import MobilePage from "./components/tempPages/MobilePage";
import PCPage from "./components/tempPages/PCPage";

const APP_STORE_URL =
  "https://apps.apple.com/kr/app/%EC%83%88%EB%A1%9D-%EC%9D%BC%EC%83%81-%EC%86%8D%EC%9D%98-%ED%83%90%EC%A1%B0-%EC%9D%BC%EC%A7%80/id6744866662";
const ANDROID_PRE_REGISTRATION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc_LJXcdnmmNC4smdBlBnR_G8z9XvhY_1oyXEkVyyoSFOLF5Q/viewform?usp=dialog";
const REGISTER_PATH = "/register";
const ANDROID_REGISTER_FLOW_KEY = "saerok-android-register-flow";

function App() {
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    const pathname = window.location.pathname;

    const isIOS =
      /iPhone|iPad|iPod/i.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isAndroid = /Android/i.test(ua);
    const hasStartedAndroidRegisterFlow =
      sessionStorage.getItem(ANDROID_REGISTER_FLOW_KEY) === "started";

    if (isIOS) {
      window.location.href = APP_STORE_URL;
      return;
    }

    if (pathname === REGISTER_PATH) {
      if (!isAndroid || !hasStartedAndroidRegisterFlow) {
        window.history.replaceState({}, "", "/");
      }
      return;
    }

    if (isAndroid && pathname === "/" && !hasStartedAndroidRegisterFlow) {
      sessionStorage.setItem(ANDROID_REGISTER_FLOW_KEY, "started");
      window.history.pushState({}, "", REGISTER_PATH);
      window.location.replace(ANDROID_PRE_REGISTRATION_URL);
    }
  }, []);

  return (
    <>
      <Mobile>
        <MobilePage />
      </Mobile>
      <PC>
        <PCPage />
      </PC>
    </>
  );
}

export default App;
