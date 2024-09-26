import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UserT } from "@/types";
import { FC, useState } from "react";
import { X, PlusIcon, Repeat as Undo } from "lucide-react";
import { updateUserData } from "@/api/profile";
import { UpdatePasswordDialog } from "./UpdatePassword";

type EditProfileProps = {
  user: UserT;
  switchToProfile: () => void;
};

const EditProfile: FC<EditProfileProps> = ({ user, switchToProfile }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<UserT>({
    username: user.username,
    email: user.email,
    allergies: user.allergies,
    gender: user.gender,
    age: user.age,
    weight: user.weight,
    diseases: user.diseases,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "allergies" | "diseases",
    index: number,
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  const addArrayItem = (field: "allergies" | "diseases") => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    });
  };

  const removeArrayItem = (field: "allergies" | "diseases", index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  const handleUndo = () => {
    setFormData({
      username: user.username,
      email: user.email,
      allergies: user.allergies,
      gender: user.gender,
      age: user.age,
      weight: user.weight,
      diseases: user.diseases,
    });
  };

  const handleSubmit = async () => {
    try {
      await updateUserData(formData);
      switchToProfile();
      toast({ description: "Profile was updated successfully" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="relative rounded-lg border px-6 py-4 dark:border-border dark:bg-secondary">
      <CardHeader>
        <Button
          variant="link"
          onClick={switchToProfile}
          className="absolute left-2 top-2 cursor-pointer"
        >
          Go back
        </Button>
        <div className="flex w-full justify-between pt-6">
          <CardTitle className="text-xl font-semibold dark:text-quaternary">
            Edit Profile
          </CardTitle>
          <Undo onClick={handleUndo} className="cursor-pointer" />
        </div>
      </CardHeader>

      <CardContent className="mt-4 space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="dark:text-quaternary">Username</label>
            <Input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div>
            <label className="dark:text-quaternary">Gender</label>
            <Select
              name="gender"
              value={formData.gender}
              onValueChange={(value) =>
                setFormData({ ...formData, gender: value })
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="dark:text-quaternary">Age</label>
            <Input
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div>
            <label className="dark:text-quaternary">Weight (kg)</label>
            <Input
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <label className="mr-2 dark:text-quaternary">Allergies</label>
          {formData.allergies.map((allergy, index) => (
            <div key={index} className="mt-1 flex items-center space-x-2">
              <Input
                value={allergy}
                onChange={(e) => handleArrayChange(e, "allergies", index)}
                className="flex-grow"
              />
              <Button
                variant="outline"
                onClick={() => removeArrayItem("allergies", index)}
                className="border border-red-500 text-red-500 hover:text-red-600 dark:border-red-900 dark:text-red-900 dark:hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => addArrayItem("allergies")}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>

        <div>
          <label className="mr-2 dark:text-quaternary">Diseases</label>
          {formData.diseases.map((disease, index) => (
            <div key={index} className="mt-1 flex items-center space-x-2">
              <Input
                value={disease}
                onChange={(e) => handleArrayChange(e, "diseases", index)}
                className="flex-grow"
              />
              <Button
                variant="outline"
                onClick={() => removeArrayItem("diseases", index)}
                className="border border-red-500 text-red-500 hover:text-red-600 dark:border-red-900 dark:text-red-900 dark:hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => addArrayItem("diseases")}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex w-full justify-center pt-6">
          <UpdatePasswordDialog />
        </div>
        <Button onClick={handleSubmit} variant="green" className="mt-6 w-full">
          Update Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default EditProfile;
