import { RouterProvider } from "react-router-dom";
import "./App.css";
import { createRouter } from "./routes";
import { DesignScaleProvider } from "./design/DesignScaleContext";
import { ResponsiveProvider } from "./design/ResponsiveContext";

function App() {
  const router = createRouter();
  return (
    <ResponsiveProvider>
      <DesignScaleProvider>
        <RouterProvider router={router} />
      </DesignScaleProvider>
    </ResponsiveProvider>
  );
}

export default App;
