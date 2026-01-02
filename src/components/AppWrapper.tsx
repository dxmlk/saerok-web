import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "./Footer";
import { useResponsive } from "@/design/ResponsiveContext";

const AppWrapper = () => {
  const { layout, scale } = useResponsive();

  return (
    <div className="w-full min-h-100dvh bg-white overflow-x-hidden">
      <Header layout={layout} scale={scale} />
      <main className="w-full h-full z-20 relative border-t-3 border-mainBlue">
        <Outlet />
      </main>
      <Footer layout={layout} scale={scale} />
    </div>
  );
};

export default AppWrapper;
