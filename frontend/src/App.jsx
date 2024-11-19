import React from "react";
import "./App.css";
import {Outlet, Route,Routes, useLinkClickHandler, useNavigate} from "react-router-dom"
import NavBar from "./components/NavBar";
import Homepage from "./pages/Homepage";
import TeamSelection from "./pages/selectionpage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  const navigate=useNavigate()
  function clickHandler(){
    navigate("/hello")
  }

  return (
    <div
      className="bg-gradient-to-b from-[#3d0000] to-[#870000] text-white min-h-screen poppins"
      style={{
        background:
          "linear-gradient(180deg, #3d0000 0%, #870000 50%, #ff0000 100%)",
      }}
    >
      <NavBar></NavBar>
      <Routes>
      <Route path="/" element={  <div ><Outlet/></div>}>
        <Route index element={<Homepage/>}/>
        <Route path="/selectteam" element={ <TeamSelection/>}/>
        <Route path="*" element={ <NotFoundPage/>}/>
    </Route>
    </Routes>
    </div>
  );
}
