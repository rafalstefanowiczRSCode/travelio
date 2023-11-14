import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Country from "./pages/Country";
import Map from "./pages/Map";

import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Map />}></Route>
          <Route path="/country" element={<Country />}></Route>
          {/* <Route path="/contact" element={<Contact />}></Route> */}
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
