import { RouterProvider, createBrowserRouter } from "react-router-dom";

// components
import HouseForm from "./components/HouseForm";
import Signup from "./components/Signup";
import Protected from "./components/Protected";
import NavBar from "./components/navbar/NavBar";
import Login from "./components/Login";
import HouseList from "./components/HouseList";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "/",
    element: (
      <NavBar>
        <HouseList />
      </NavBar>
    ),
  },
  {
    path: "/add-house-detail",
    element: (
      <Protected>
        <NavBar>
          <HouseForm></HouseForm>,
        </NavBar>
      </Protected>
    ),
  },
  {
    path: "/update-house-detail",
    element: (
      <Protected>
        <NavBar>
          <HouseForm />
        </NavBar>
      </Protected>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
