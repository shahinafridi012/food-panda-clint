import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main.jsx";
import Home from "../pages/Home/Home.jsx";
import Login from "../pages/Login/Login.jsx";
import SignUp from "../pages/signUp/SignUp.jsx";
import ConfirmOrder from "../pages/Add/Add.jsx";
import OrderNow from "../pages/Home/OrderNow/OrderNow.jsx";
import MyProfile from "../pages/MyProfile/MyProfile.jsx";
import AllFoods from "../pages/Home/AllFoods/AllFoods.jsx";
import PrivetRout from "./PrivetRout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/food/:id",
        element: (
          <PrivetRout>
            <ConfirmOrder />
          </PrivetRout>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/food/${params.id}`),
      },
      {
        path: "/add-food/:id",
        element: (
          <PrivetRout>
            <OrderNow />
          </PrivetRout>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/food/${params.id}`),
      },
      {
        path: "/my-profile",
        element: (
          <PrivetRout>
            <MyProfile />
          </PrivetRout>
        ),
      },
      {
        path: "/all-foods",
        element: <AllFoods />,
      },
     
    ],
  },
]);

export default router;
