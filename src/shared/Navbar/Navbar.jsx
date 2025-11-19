"use client";

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

  // Close profile dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchText.trim());
  };

  // Logout handler
  const handleLogout = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("access-token");
        navigate("/login");
      })
      .catch((err) => console.error("Logout Error:", err));
  };

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "All Foods", link: "/all-foods" },
    { name: "Gallery", link: "/gallery" },
    { name: "My Profile", link: "/my-profile" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-md rounded-b-full">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-red-600">
          <Link to="/">FlavorNest</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {menuItems.map(({ name, link }) => (
            <NavLink
              key={name}
              to={link}
              end={link === "/"}
              className={({ isActive }) =>
                `font-medium ${
                  isActive
                    ? "text-black border-b-2 border-red-600"
                    : "text-gray-700 hover:text-red-600"
                } transition`
              }
            >
              {name}
            </NavLink>
          ))}

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="ml-4 flex items-center bg-gray-50 border border-gray-200 rounded-full px-3 py-1 focus-within:ring-1 focus-within:ring-red-600 transition"
          >
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search food..."
              className="bg-transparent outline-none w-32 text-sm placeholder-gray-400"
            />
            <button type="submit" className="ml-1 text-gray-500 hover:text-red-600 transition">
              🔍
            </button>
          </form>

          {/* Auth/Profile */}
          {user ? (
            <div className="relative ml-4" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-full hover:bg-gray-100 px-2 py-1 transition"
              >
                <img
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?background=random&color=fff&name=${encodeURIComponent(
                      user.displayName || user.email || "User"
                    )}`
                  }
                  alt="avatar"
                  className="w-9 h-9 rounded-full border border-gray-200"
                />
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user.displayName || user.email}
                </span>
                <span className={`transition-transform ${profileOpen ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-2 animate-fade-in">
                  <div className="px-4 py-2 text-sm text-gray-600">
                    Signed in as <br />
                    <strong className="text-gray-800">{user.displayName || user.email}</strong>
                  </div>
                  <div className="border-t border-gray-100 my-2" />
                  <Link
                    to="/my-profile"
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
            <div className="flex items-center gap-2 ml-4">
              <Link
                to="/login"
                className="px-4 py-1 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1 rounded-lg border border-red-600 text-red-600 font-medium hover:bg-red-600 hover:text-white transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-2xl">
            {mobileOpen ? "✖" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white px-6 py-4 flex flex-col space-y-3 shadow-md rounded-b-xl">
          {menuItems.map(({ name, link }) => (
            <NavLink
              key={name}
              to={link}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `text-gray-700 hover:text-red-600 font-medium ${isActive ? "font-semibold" : ""}`
              }
            >
              {name}
            </NavLink>
          ))}

          <form
            onSubmit={handleSearch}
            className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-3 py-1"
          >
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search food..."
              className="bg-transparent outline-none w-full text-sm placeholder-gray-400"
            />
            <button type="submit" className="ml-1 text-gray-500 hover:text-red-600 transition">
              🔍
            </button>
          </form>

          {user ? (
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <img
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?background=random&color=fff&name=${encodeURIComponent(
                      user.displayName || user.email || "User"
                    )}`
                  }
                  alt="avatar"
                  className="w-10 h-10 rounded-full border border-gray-200"
                />
                <div>
                  <div className="text-sm font-medium text-gray-800">{user.displayName || user.email}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              </div>
              <button
                onClick={() => { handleLogout(); setMobileOpen(false); }}
                className="px-3 py-1 rounded-lg border border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition text-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 rounded-lg border border-red-600 text-red-600 font-medium hover:bg-red-600 hover:text-white transition text-center"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
