import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import ImageInputOpts from "../components/ImageInputOpts";
import axios from "axios";

const Home: React.FC = () => {
  const { user, loading } = useAuth();
  const [image, setImage] = useState<string>("");
  const [report, setReport] = useState<string>("");
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

  const handleImageSubmit = async () => {
    if (!image) {
      toast.error("Please upload an image.");
      return;
    }

    toast.loading("Processing image...");
    try {
      const response = await axios.post(
        "http://localhost:3000/image_processing/process_image",
        {
          image,
        }
      );

      setReport(JSON.stringify(response.data, null, 2));
      toast.dismiss();
      toast.success("Image processed successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error("Error processing image");
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex h-full">
        <div className="w-1/3">
          <ImageInputOpts setImage={setImage} />
          <button
            onClick={handleImageSubmit}
            className="mt-4 p-2 bg-blue-500 text-white"
          >
            Submit Image
          </button>
        </div>
        <div className="w-2/3 bg-slate-500 p-4">
          <h2>Report</h2>
          <pre>{report}</pre>
        </div>
      </div>
    </div>
  );
};

export default Home;
