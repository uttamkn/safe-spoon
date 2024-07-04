import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";

const Profile: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      toast.loading("Loading...");
    } else {
      if (!user || user.id === 0) {
        toast.dismiss();
        navigate("/auth");
      }
    }
  }, [loading, user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <Navbar />
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center my-auto">
          <h1 className="text-3xl font-bold">SafeSpoon</h1>
          <div className="flex items-center">
            <span className="mr-4 font-bold text-2xl ">
              Hello, {user.username}
            </span>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="bg-gray-200 p-6 rounded-lg w-1/2">
            <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
            <p className="mb-2">
              <strong>Name:</strong> {user.username}
            </p>
            <p className="mb-2">
              <strong>Age:</strong> {user.age}
            </p>
            <p className="mb-2">
              <strong>Allergies:</strong> {user.allergies.join(", ")}
            </p>
          </div>
          <div className="w-1/2">
            <div className="bg-gray-200 p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-semibold mb-4">Weight</h2>
              <p>{user.weight} kg</p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Diseases</h2>
              <p>{user.anyDiseases}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
