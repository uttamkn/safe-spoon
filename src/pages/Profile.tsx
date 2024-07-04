import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { toast } from "react-hot-toast";

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
    <div>
      <h1>Profile Page</h1>
    </div>
  );
};

export default Profile;
