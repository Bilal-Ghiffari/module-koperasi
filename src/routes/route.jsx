import React from "react";
import { useSearchParams } from "react-router-dom";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import useLoginData from "@/hooks/useLoginData";
import secureLocalStorage from "react-secure-storage";
import { AUTH_KEY } from "@/constants/api.constant";

const Authmiddleware = ({ children }) => {
  const { loginData, loading, error } = useLoginData();
  const location = import.meta.env.VITE_APP_PORTAL_HOST;
  if (loginData) {
    secureLocalStorage.setItem(AUTH_KEY, loginData?.user_detail);
  }
  console.log("🚀 ~ Authmiddleware ~ loginData:", loginData);
  const token = Cookies.get("userSession");
  if (!token) {
    // Redirect ke localhost:5173
    // window.location.href = "http://localhost:8000";
    window.location.href = location;
    return null; // Mengembalikan null karena komponen akan di-unmount setelah redirect
  }

  return <>{children}</>;
};

export default Authmiddleware;
