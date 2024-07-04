import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import WebcamCapture from "../components/WebcamCapture";

const Home: React.FC = () => {
  const { user, loading } = useAuth();
  const [image, setImage] = useState<string>("");
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
    <div className="h-screen">
      <Navbar />
      <div className="flex">
        <div className="w-1/3">
          <WebcamCapture setImage={setImage} image={image} />
        </div>
        <div className="w-2/3 bg-slate-500">REPORT</div>
      </div>
    </div>
  );
};

export default Home;
