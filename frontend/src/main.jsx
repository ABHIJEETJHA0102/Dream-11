import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"

createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
    <App />
    <ToastContainer
      position="bottom-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition:Bounce
      FontFace="font-mono"
    />
    </BrowserRouter>
  </>
);
