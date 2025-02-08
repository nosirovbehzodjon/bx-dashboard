import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import { App } from "@/App";
import { RouterProvider } from "@/provider/Router/RouterProvider";
import { ThemeProvider } from "@/provider/Theme";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider>
      <App />
    </RouterProvider>
  </ThemeProvider>
);
