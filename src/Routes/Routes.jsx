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
import AddAdmin from "../pages/Dashboard/AddAdmin.jsx"; // ✅ AddAdmin import
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
      {
        path: "all-foods",
        element: <AllFoods />,
        loader: async () => {
          try {
            const res = await fetch(`http://localhost:5000/foods`);
            if (!res.ok) throw new Error("Failed to fetch foods");
            return res.json();
          } catch (err) {
            return { error: err.message };
          }
        },
      },
      {
        path: "food/:id",
        element: (
          <PrivetRout>
            <OrderNow />
          </PrivetRout>
        ),
        loader: async ({ params }) => {
          try {
            const res = await fetch(`http://localhost:5000/foods/${params.id}`);
            if (!res.ok) throw new Error("Food not found");
            return res.json();
          } catch (err) {
            return { error: err.message };
          }
        },
      },
      {
        path: "confirm-order/:id",
        element: (
          <PrivetRout>
            <ConfirmOrder />
          </PrivetRout>
        ),
        loader: async ({ params }) => {
          try {
            const res = await fetch(`http://localhost:5000/foods/${params.id}`);
            if (!res.ok) throw new Error("Food not found");
            return res.json();
          } catch (err) {
            return { error: err.message };
          }
        },
      },
      {
        path: "my-profile",
        element: (
          <PrivetRout>
            <MyProfile />
          </PrivetRout>
        ),
      },
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
          {
            path: "add-admin", // ✅ AddAdmin route
            element: (
              <AdminRoute>
                <AddAdmin />
              </AdminRoute>
            ),
          },
          // Normal user dashboard
          { path: "user", element: <UserDashboard /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
