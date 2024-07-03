import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import toast from "react-hot-toast";

const Home: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      toast.loading("Loading...");
    } else {
      if (!user || user.id === 0) {
        toast.dismiss();
        navigate("/auth");
      } else {
        toast.dismiss();
        toast.success(`Welcome back, ${user.username}!`);
      }
    }
  }, [loading, user, navigate]);

  return (
    <div
      style={{ minHeight: "150vh" }}
      className="flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl font-bold mt-10 mb-5">
        Welcome to the Home Page
      </h1>
      <div className="text-lg">
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <p>Hello, {user.username}!</p>
        ) : (
          <p>Redirecting...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
