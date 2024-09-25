import { useEffect, useState } from "react";
import { fetchUserData } from "@/api/profile";
import { UserT } from "@/types";
import Profile from "@/components/Profile";
import EditProfile from "@/components/EditProfile";
import { Loader } from "lucide-react";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserT | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const userData: UserT = await fetchUserData();
      setUser(userData);
    };
    getUser();
  }, [isEditing]);

  const switchToEditProfile = () => {
    setIsEditing(true);
  };

  const switchToProfile = () => {
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="flex min-h-full items-center justify-center dark:bg-primary">
        <Loader size={64} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-full items-center justify-center p-6 font-jet-brains-mono dark:bg-primary">
      {isEditing ? (
        <EditProfile user={user} switchToProfile={switchToProfile} />
      ) : (
        <Profile user={user} switchToEditProfile={switchToEditProfile} />
      )}
    </div>
  );
};

export default ProfilePage;
