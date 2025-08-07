import React from "react";
import { useSearchParams } from "react-router-dom";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import useLoginData from "@/hooks/useLoginData";
import secureLocalStorage from "react-secure-storage";
import { AUTH_KEY } from "@/constants/api.constant";
import { setLocalStorageItem } from "@/utils/storageBroworser";
import { useNavigate } from "react-router-dom";

const Authmiddleware = ({ children }) => {
  const { loginData, loading, error } = useLoginData();
  const navigate = useNavigate();
  const token = Cookies.get("userSession");
  if (!token) {
    // Redirect ke localhost:5173
    // window.location.href = "http://localhost:8000";
    // window.location.href = location;
    navigate("/");
    return null;
  }
  secureLocalStorage.setItem(AUTH_KEY, loginData?.user_detail);

  return <>{children}</>;
};

export default Authmiddleware;
