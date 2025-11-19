import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";

export default function DashboardLayout() {
  const { user } = useContext(AuthContext);

  // Check if user is admin or super admin
  const isAdmin = user?.role === "admin" || user?.role === "super admin";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-orange-600">Dashboard</h2>

        {isAdmin ? (
          <>
            <Link to="/dashboard/admin">Admin Home</Link>
            <Link to="/dashboard/manage-foods">Manage Foods</Link>
            <Link to="/dashboard/manage-users">Manage Users</Link>
            <Link to="/dashboard/add-food">Add Food</Link>
          </>
        ) : (
          <>
            <Link to="/my-profile">My Orders</Link>
          </>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
