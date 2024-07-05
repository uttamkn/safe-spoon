import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import ImageInputOpts from "../components/ImageInputOpts";
import axios from "axios";
import { parseString } from "../api/utils";
import Input from "../components/ui/Input.tsx";

const Home: React.FC = () => {
  const [image, setImage] = useState<string>("");
  const [report, setReport] = useState<string>("");
  const [foodInput, setFoodInput] = useState<string>("");
  const navigate = useNavigate();
  const { user, loading } = useAuth();

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
      const response = await axios.post("/input-processing/process_image", {
        image,
        username: user.username,
      });

      setReport(response.data[0]);
      toast.dismiss();
      toast.success("Image processed successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error("Error processing image");
      console.error("Error:", error);
    }
  };

  const handleTextSubmit = async () => {
    if (!foodInput) {
      toast.error("Please enter a food product.");
      return;
    }

    toast.loading("Processing input...");
    try {
      const response = await axios.post("/input-processing/process_text", {
        food: foodInput,
        username: user.username,
      });

      setReport(response.data[0]);
      toast.dismiss();
      toast.success("Input processed successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error("Error processing input");
      console.error("Error:", error);
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="flex h-full">
        <div className="w-1/3 border-r p-5">
          <div className="flex flex-col gap-5">
            <ImageInputOpts setImage={setImage} />
            <button
              onClick={handleImageSubmit}
              className="p-2 bg-ternery text-white rounded-md w-40 m-auto"
            >
              Get Report from Image
            </button>
            <hr />
            <div className="w-full text-center font-light">or</div>
            <Input
              type="text"
              name="ingredients"
              placeholder="Input food product"
              value={foodInput}
              onChange={(e) => setFoodInput(e.target.value)}
            />
            <button
              onClick={handleTextSubmit}
              className="p-2 bg-ternery text-white rounded-md w-40 m-auto"
            >
              Get Report from Text
            </button>
          </div>
        </div>
        <div className="w-2/3 p-4">
          <h1 className="text-3xl font-bold w-full my-5 text-center">REPORT</h1>
          <div className="text-lg">
            {
              <ul>
                {parseString(report).map((sentence, index) => (
                  <li key={index}>{sentence}</li>
                ))}
              </ul>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
