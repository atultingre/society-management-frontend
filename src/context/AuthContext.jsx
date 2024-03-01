// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [houses, setHouses] = useState([]);
  const [showButtons, setShowButtons] = useState(true);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const loggedinUserEmail = localStorage.getItem("email");
  const isAdmin1 = localStorage.getItem("admin");
  const isAdmin = JSON.parse(isAdmin1);
  const wing = localStorage.getItem("wing");
  const houseNumber = localStorage.getItem("houseNumber");

  const wingEnum = ["A", "B"];
  const currentlyLiving = ["Yes", "No"];
  const vehicleType = ["Scooter", "Bike", "Car", "Bus", "Auto"];
  const vehicleFuelType = [
    "Petrol",
    "Diesel",
    "Compressed Natural Gas (CNG)",
    "Electric",
  ];

  const value = {
    email,
    setEmail,
    password,
    setPassword,
    houses,
    setHouses,
    token,
    isAdmin,
    wing,
    houseNumber,
    userId,
    loggedinUserEmail,
    wingEnum,
    currentlyLiving,
    vehicleType,
    vehicleFuelType,
    showButtons,
    setShowButtons,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
