import { StrictMode } from "react"
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "../routes/routes";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Theme from "./context/Theme";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme>
      <Header/>
      <RouterProvider router={router} />
      <Footer/>
    </Theme>
  </StrictMode>,
);
