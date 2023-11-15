import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";

import Country from "./pages/Country";
import Map from "./pages/Map";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Map />,
    // errorElement: <Error />,  /todo
  },
  {
    path: "/:country",
    element: <Country />,
  },
]);

function App() {
  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export default App;
