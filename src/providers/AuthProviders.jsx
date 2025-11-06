/* eslint-disable react-refresh/only-export-components */
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

  // 🔹 Create New User (Signup)
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 🔹 Sign In Existing User
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🔹 Log Out User + Remove JWT
  const logOut = () => {
    localStorage.removeItem("access-token");
    return signOut(auth);
  };

  // 🔹 Track Logged-in User (auto JWT fetch)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Current User:", currentUser);
      setUser(currentUser);

      if (currentUser?.email) {
        // 🔸 User login hole backend e token request
        const loggedUser = { email: currentUser.email };
        fetch("http://localhost:5000/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loggedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Access Token from server:", data.token);
            localStorage.setItem("access-token", data.token);
            setLoading(false);
          });
      } else {
        // 🔸 Logout hole token remove
        localStorage.removeItem("access-token");
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
