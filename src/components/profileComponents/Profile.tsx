import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Heart, User, Scale, ShieldAlert, Edit } from "lucide-react";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserT } from "@/types";
import { FC } from "react";

type ProfileProps = {
  user: UserT;
  switchToEditProfile: () => void;
};

const uppercaseFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Profile: FC<ProfileProps> = ({ user, switchToEditProfile }) => {
  return (
    <Card className="relative rounded-lg border px-12 py-6 dark:border-border dark:bg-secondary md:min-w-96">
      <Edit
        onClick={switchToEditProfile}
        className="absolute right-5 top-5 cursor-pointer"
      />
      <CardHeader className="flex items-center">
        <Avatar className="h-32 w-32 md:h-52 md:w-52">
          <AvatarImage
            src={`https://avatar.iran.liara.run/public/${user.gender == "male" ? "boy" : "girl"}`}
          />
          <AvatarFallback className="text-4xl">
            {user.username[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl font-semibold dark:text-quaternary">
            {uppercaseFirstLetter(user.username)}
          </CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
        </div>
      </CardHeader>

      <CardContent className="mt-4 space-y-4">
        <div className="flex items-center space-x-2">
          <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <p className="dark:text-gray-200">
            {uppercaseFirstLetter(user.gender)}, {user.age} years old
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Scale className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <p className="dark:text-gray-200"> {user.weight} kg</p>
        </div>

        <div className="flex items-start space-x-2">
          <ShieldAlert className="h-5 w-5 text-yellow-500" />
          <div>
            <p className="dark:text-gray-200">Allergies:</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {user.allergies.length > 0 ? (
                user.allergies.map((allergy, index) => (
                  <Badge key={index}>{allergy}</Badge>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No allergies</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Heart className="h-5 w-5 text-red-500" />
          <div>
            <p className="dark:text-gray-200">Diseases:</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {user.diseases.length > 0 ? (
                user.diseases.map((disease, index) => (
                  <Badge key={index}>{disease}</Badge>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No diseases</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
