import { RouterProvider, createBrowserRouter } from "react-router-dom";

// components
import Signup from "./components/auth/Signup";
import Protected from "./components/Protected";
import NavBar from "./components/navbar/NavBar";
import Login from "./components/auth/Login";
import HouseList from "./components/HouseList";
import Forms from "./components/forms/Forms";

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
          <Forms></Forms>,
        </NavBar>
      </Protected>
    ),
  },
  {
    path: "/update-house-detail",
    element: (
      <Protected>
        <NavBar>
          <Forms />
        </NavBar>
      </Protected>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
