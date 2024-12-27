/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import routes from "./routes/routes.tsx";
import "./index.css";
import { ThemeProvider, useTheme } from "./common/ThemeProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(routes);

const ThemedToastContainer = () => {
  const { isDarkMode } = useTheme();
  return (
    <ToastContainer
      className={isDarkMode ? "dark" : ""}
      theme={isDarkMode ? "dark" : "light"}
      position="top-right"
      style={{ top: "75px" }}
    />
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
        <ThemedToastContainer />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
