import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./styles/app.css";

import Country from "./pages/Country";
import Map from "./pages/Map";
import PreloadImageContext from "./context/PreloadImageContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Map />,
    // errorElement: <Error />,  /to do
  },
  {
    path: "/:country",
    element: <Country />,
  },
]);

function App() {
  return (
    <AnimatePresence mode="wait">
      <PreloadImageContext>
        <RouterProvider router={router} />
      </PreloadImageContext>
    </AnimatePresence>
  );
}

export default App;
