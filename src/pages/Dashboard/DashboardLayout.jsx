import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";

export default function DashboardLayout() {
  const { user } = useContext(AuthContext);

  // Only admin users get full dashboard access
  const isAdmin = user?.role === "admin";

  return (
    <div className="flex min-h-screen bg-neutral-900 text-neutral-200">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-800/90 backdrop-blur-md border-r border-neutral-700 shadow-lg flex flex-col gap-6 p-6">
        <h2 className="text-2xl font-extrabold text-red-500 mb-4">Dashboard</h2>

        <nav className="flex flex-col gap-3">
          {isAdmin ? (
            <>
              <Link
                to="/dashboard/admin"
                className="px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition transform hover:scale-105"
              >
                Admin Home
              </Link>
              <Link
                to="/dashboard/manage-foods"
                className="px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition transform hover:scale-105"
              >
                Manage Foods
              </Link>
              <Link
                to="/dashboard/manage-users"
                className="px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition transform hover:scale-105"
              >
                Manage Users
              </Link>
              <Link
                to="/dashboard/add-food"
                className="px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition transform hover:scale-105"
              >
                Add Food
              </Link>
              <Link
                to="/dashboard/add-admin"
                className="px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition transform hover:scale-105"
              >
                Add Admin
              </Link>
            </>
          ) : (
            <Link
              to="/my-profile"
              className="px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition transform hover:scale-105"
            >
              My Orders
            </Link>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-neutral-900/90 backdrop-blur-md">
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
