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
import AdminRoute from "./AdminRoute.jsx";
import DashboardLayout from "../pages/Dashboard/DashboardLayout.jsx";
import AdminDashboard from "../pages/Dashboard/AdminDashboard.jsx";
import ManageFoods from "../pages/Dashboard/ManageFoods.jsx";
import ManageUsers from "../pages/Dashboard/ManageUsers.jsx";
import AddFood from "../pages/Dashboard/AddFood.jsx";
import UserDashboard from "../pages/Dashboard/UserDashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },

      // Dynamic route for ordering food
      {
        path: "food/:id",
        element: (
          <PrivetRout>
            <OrderNow />
          </PrivetRout>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/foods/${params.id}`),
      },

      // Optional confirm order page
      {
        path: "confirm-order/:id",
        element: (
          <PrivetRout>
            <ConfirmOrder />
          </PrivetRout>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/foods/${params.id}`),
      },

      { path: "all-foods", element: <AllFoods /> },

      {
        path: "my-profile",
        element: (
          <PrivetRout>
            <MyProfile />
          </PrivetRout>
        ),
      },

      // Dashboard routes
      {
        path: "dashboard",
        element: (
          <PrivetRout>
            <DashboardLayout />
          </PrivetRout>
        ),
        children: [
          {
            path: "admin",
            element: (
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            ),
          },
          {
            path: "manage-foods",
            element: (
              <AdminRoute>
                <ManageFoods />
              </AdminRoute>
            ),
          },
          {
            path: "manage-users",
            element: (
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            ),
          },
          {
            path: "add-food",
            element: (
              <AdminRoute>
                <AddFood />
              </AdminRoute>
            ),
          },
          { path: "user", element: <UserDashboard /> },
        ],
      },
    ],
  },
]);

export default router;
