import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";

export default function Navbar({ onSearch }) {
  const { user, logOut } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Click outside to close profile dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Search handler
  function handleSearch(e) {
    e.preventDefault();
    if (onSearch) onSearch(searchText.trim());
  }

  // ✅ Logout handler
  const handleLogout = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("access-token"); 
        navigate("/login");
      })
      .catch((error) => console.error("Logout Error:", error));
  };

  // ✅ Active link style
  const activeClass = ({ isActive }) =>
    isActive
      ? "text-black font-semibold border-b-2 border-black"
      : "text-slate-600 hover:text-black transition-colors duration-200";

  return (
    <header className="bg-white shadow-md rounded-b-2xl sticky top-0 z-50 border-b border-gray-100 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* 🔹 Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div>
              <h1 className="text-xl font-semibold text-black group-hover:opacity-80 transition">
                FlavorNest
              </h1>
              <p className="text-xs text-gray-400 -mt-1">Taste the story</p>
            </div>
          </Link>

          {/* 🔹 Desktop nav links */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={activeClass} end>
              Home
            </NavLink>
            <NavLink to="/all-foods" className={activeClass}>
              All Foods
            </NavLink>
            <NavLink to="/gallery" className={activeClass}>
              Gallery
            </NavLink>
            <NavLink to="/my-profile" className={activeClass}>
              My Profile
            </NavLink>
          </nav>

          {/* 🔹 Right section */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 transition focus-within:ring-1 focus-within:ring-black"
            >
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="bg-transparent outline-none text-sm w-32 placeholder:text-gray-400"
                placeholder="Search food..."
              />
              <button
                type="submit"
                aria-label="Search"
                className="text-gray-500 hover:text-black transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </button>
            </form>

            {/* 🔹 Profile / Auth */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((s) => !s)}
                  className="flex items-center gap-2 focus:outline-none rounded-full hover:bg-gray-100 px-2 py-1 transition"
                  aria-expanded={profileOpen}
                >
                  <img
                    src={
                      user.photoURL ||
                      "https://ui-avatars.com/api/?background=random&color=fff&name=" +
                        encodeURIComponent(user.displayName || user.email || "User")
                    }
                    alt={user.displayName || "user avatar"}
                    className="w-9 h-9 rounded-full object-cover border border-gray-200 shadow-sm"
                  />
                  <span className="hidden md:block text-sm text-gray-700 font-medium">
                    {user.displayName || user.email}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 text-gray-500 transform transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* 🔹 Profile dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-2 animate-fade-in">
                    <div className="px-4 py-2 text-sm text-gray-600">
                      Signed in as <br />
                      <strong className="text-gray-800">
                        {user.displayName || user.email}
                      </strong>
                    </div>
                    <div className="border-t border-gray-100 my-2" />
                 
                    <Link
                      to="/profile/my-orders"
                      className="block px-4 py-2 text-sm hover:bg-gray-50 transition"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-1.5 rounded-full text-sm font-medium border border-black text-black hover:bg-black hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="hidden sm:inline-block px-4 py-1.5 rounded-full bg-black text-white text-sm font-medium shadow-sm hover:opacity-90 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile toggle */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setMobileOpen((s) => !s)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white rounded-b-2xl shadow-md animate-fade-in">
          <div className="px-4 py-3 space-y-2">
            {["/", "/all-foods", "/gallery", "/profile/my-orders"].map((path, i) => (
              <NavLink
                key={i}
                to={path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-gray-100 text-black"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
                end={path === "/"}
              >
                {["Home", "All Foods", "Gallery", "My Profile"][i]}
              </NavLink>
            ))}

            {/* Mobile search */}
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-3 py-1 mt-3"
            >
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
                placeholder="Search food..."
              />
              <button
                type="submit"
                aria-label="Search"
                className="text-gray-500 hover:text-black transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </button>
            </form>

            {/* Mobile auth */}
            <div className="pt-3">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        user.photoURL ||
                        "https://ui-avatars.com/api/?background=random&color=fff&name=" +
                          encodeURIComponent(user.displayName || user.email || "User")
                      }
                      alt="avatar"
                      className="w-10 h-10 rounded-full border border-gray-200"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-800">
                        {user.displayName || user.email}
                      </div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 text-sm font-medium hover:text-red-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    className="flex-1 text-center px-4 py-2 rounded-md border border-black text-black hover:bg-black hover:text-white transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex-1 text-center px-4 py-2 rounded-md bg-black text-white hover:opacity-90 transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
