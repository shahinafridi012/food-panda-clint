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
import NotFound from "../pages/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "all-foods", element: <AllFoods />, 
        loader: async () => {
          try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/foods`);
            if (!res.ok) throw new Error("Failed to fetch foods");
            return res.json();
          } catch (err) {
            return { error: err.message };
          }
        },
      },

      // Dynamic route: order food
      {
        path: "food/:id",
        element: (
          <PrivetRout>
            <OrderNow />
          </PrivetRout>
        ),
        loader: async ({ params }) => {
          try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/foods/${params.id}`);
            if (!res.ok) throw new Error("Food not found");
            return res.json();
          } catch (err) {
            return { error: err.message };
          }
        },
      },

      // Confirm order page
      {
        path: "confirm-order/:id",
        element: (
          <PrivetRout>
            <ConfirmOrder />
          </PrivetRout>
        ),
        loader: async ({ params }) => {
          try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/foods/${params.id}`);
            if (!res.ok) throw new Error("Food not found");
            return res.json();
          } catch (err) {
            return { error: err.message };
          }
        },
      },

      // My Profile (private)
      {
        path: "my-profile",
        element: (
          <PrivetRout>
            <MyProfile />
          </PrivetRout>
        ),
      },

      // Dashboard (private)
      {
        path: "dashboard",
        element: (
          <PrivetRout>
            <DashboardLayout />
          </PrivetRout>
        ),
        children: [
          // Admin routes
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
          // Normal user dashboard
          { path: "user", element: <UserDashboard /> },
        ],
      },

      // 404 Not Found
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
