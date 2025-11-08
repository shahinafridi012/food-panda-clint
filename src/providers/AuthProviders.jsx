import { createContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Create User
  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // 🔹 Sign In
  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // 🔹 Log Out
  const logOut = async () => {
    localStorage.removeItem("access-token");
    setUser(null);
    return signOut(auth);
  };

  // 🔹 Track Auth State + Fetch JWT + Role
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (currentUser?.email) {
        try {
          // 🔸 Request JWT from backend
          const tokenRes = await fetch(
            `${import.meta.env.VITE_LIVE_PRODUCTION}/jwt`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: currentUser.email }),
            }
          );

          const tokenData = await tokenRes.json();
          localStorage.setItem("access-token", tokenData.token);

          // 🔸 Fetch user role from backend
          const roleRes = await fetch(
            `${import.meta.env.VITE_LIVE_PRODUCTION}/users/${currentUser.email}`
          );

          const roleData = await roleRes.json();

          // 🔸 Merge role into user object
          setUser({ ...currentUser, role: roleData.role || "user" });
        } catch (error) {
          console.error("AuthProviders Error:", error);
          setUser(currentUser); // fallback to normal user
        } finally {
          setLoading(false);
        }
      } else {
        localStorage.removeItem("access-token");
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
