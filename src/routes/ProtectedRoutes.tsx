import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";

const isTokenValid = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.get("/api/auth/verify-user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.status === 200;
  } catch (error) {
    console.error("Token validation failed:", error);
    return false;
  }
};

const ProtectedRoutes = () => {
  const { token, setToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        const valid = await isTokenValid(token);
        setIsValid(valid);
      } else {
        setIsValid(false);
      }
      setIsLoading(false);
    };

    validateToken();
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex min-h-full items-center justify-center dark:bg-primary">
        <Loader size={64} className="animate-spin" />
      </div>
    );
  }

  if (!isValid) {
    console.error("Unauthorized access");
    setToken(null);
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
