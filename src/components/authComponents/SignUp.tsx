import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChangeEvent, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { UserT } from "@/types";
import { sendOtpEmail } from "@/api/auth";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mail, User, Lock, Calendar, AlertCircle, Weight } from "lucide-react";

type SignUpFormT = UserT & { confirm_password: string };

const SignUp: React.FC = () => {
  const { toast } = useToast();
  const navigate: NavigateFunction = useNavigate();

  const [formData, setFormData] = useState<SignUpFormT>({
    username: "",
    password: "",
    email: "",
    confirm_password: "",
    allergies: [],
    gender: "",
    age: 0,
    weight: 0,
    diseases: [],
  });
  const [allergyInput, setAllergyInput] = useState("");
  const [diseaseInput, setDiseaseInput] = useState("");
  const [error, setError] = useState("");

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleAddAllergy = () => {
    if (allergyInput && !formData.allergies.includes(allergyInput)) {
      setFormData((prev) => ({
        ...prev,
        allergies: [...prev.allergies, allergyInput],
      }));
      setAllergyInput("");
    }
  };

  const handleAddDisease = () => {
    if (diseaseInput && !formData.diseases.includes(diseaseInput)) {
      setFormData((prev) => ({
        ...prev,
        diseases: [...prev.diseases, diseaseInput],
      }));
      setDiseaseInput("");
    }
  };

  const handleRemoveAllergy = (allergy: string) => {
    setFormData((prev) => ({
      ...prev,
      allergies: prev.allergies.filter((a) => a !== allergy),
    }));
  };

  const handleRemoveDisease = (disease: string) => {
    setFormData((prev) => ({
      ...prev,
      diseases: prev.diseases.filter((d) => d !== disease),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    } else if (
      !/^\d+$/.test("" + formData.age) ||
      formData.age <= 0 ||
      formData.age >= 125
    ) {
      setError("Please enter a valid age below 125");
      return;
    } else if (!["male", "female"].includes(formData.gender.toLowerCase())) {
      setError("Please select a valid gender");
      return;
    } else if (
      !/^\d+(\.\d+)?$/.test("" + formData.weight) ||
      formData.weight <= 0
    ) {
      setError("Please enter a valid weight");
      return;
    } else {
      setError("");
    }

    const { confirm_password, ...data } = formData;

    try {
      await sendOtpEmail(data.email);
      toast({
        title: "Email sent",
        description: "An OTP has been sent to your email",
      });
      localStorage.setItem("sign-up-data", JSON.stringify(data));
      navigate("/sign-up/verify");
    } catch (err: AxiosError | any) {
      setError(
        err.response?.data.error || "Something went wrong. Please try again.",
      );
    }
  };

  const switchToSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <div className="max-w-xl space-y-6 rounded-lg border p-8 shadow-md dark:border-border dark:bg-secondary dark:text-quaternary">
      <h1 className="text-3xl font-bold">Register Now</h1>

      <form
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        onSubmit={handleSubmit}
      >
        <div className="col-span-1 sm:col-span-2">
          <label htmlFor="username" className="mb-1 block text-sm font-medium">
            Username
          </label>
          <div className="relative">
            <Input
              id="username"
              value={formData.username}
              type="text"
              name="username"
              placeholder="John Doe"
              required
              onChange={handleChange}
              className={`pl-10 ${error && "border-red-500 dark:border-red-500"}`}
            />
            <User className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <div className="relative">
            <Input
              id="email"
              value={formData.email}
              type="email"
              name="email"
              placeholder="example@gmail.com"
              required
              onChange={handleChange}
              className={`pl-10 ${error && "border-red-500 dark:border-red-500"}`}
            />
            <Mail className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              value={formData.password}
              type="password"
              name="password"
              placeholder="********"
              required
              onChange={handleChange}
              className={`pl-10 ${error && "border-red-500 dark:border-red-500"}`}
            />
            <Lock className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label
            htmlFor="confirm_password"
            className="mb-1 block text-sm font-medium"
          >
            Confirm Password
          </label>
          <div className="relative">
            <Input
              id="confirm_password"
              value={formData.confirm_password}
              type="password"
              name="confirm_password"
              placeholder="********"
              required
              onChange={handleChange}
              className={`pl-10 ${error && "border-red-500 dark:border-red-500"}`}
            />
            <Lock className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="age" className="mb-1 block text-sm font-medium">
            Age
          </label>
          <div className="relative">
            <Input
              id="age"
              value={formData.age}
              type="number"
              name="age"
              placeholder="Age"
              required
              onChange={handleChange}
              className={`pl-10 ${error && "border-red-500 dark:border-red-500"}`}
            />
            <Calendar className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="weight" className="mb-1 block text-sm font-medium">
            Weight
          </label>
          <div className="relative">
            <Input
              id="weight"
              value={formData.weight}
              type="number"
              name="weight"
              placeholder="Weight in kg"
              required
              onChange={handleChange}
              className={`pl-10 ${error && "border-red-500 dark:border-red-500"}`}
            />
            <Weight className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="col-span-1 sm:col-span-2">
          <Select
            value={formData.gender}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, gender: value }))
            }
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label htmlFor="allergies" className="mb-1 block text-sm font-medium">
            Allergies
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              name="allergies"
              placeholder="e.g., peanuts, gluten"
              value={allergyInput}
              onChange={(e) => setAllergyInput(e.target.value)}
            />
            <Button onClick={handleAddAllergy} variant="green" type="button">
              Add
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.allergies.map((allergy) => (
              <Badge
                key={allergy}
                variant="safe"
                onClick={() => handleRemoveAllergy(allergy)}
              >
                {allergy}
              </Badge>
            ))}
          </div>
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label htmlFor="diseases" className="mb-1 block text-sm font-medium">
            Diseases
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              name="diseases"
              placeholder="e.g., common flu"
              value={diseaseInput}
              onChange={(e) => setDiseaseInput(e.target.value)}
            />
            <Button onClick={handleAddDisease} variant="green" type="button">
              Add
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.diseases.map((disease) => (
              <Badge
                key={disease}
                variant="safe"
                onClick={() => handleRemoveDisease(disease)}
              >
                {disease}
              </Badge>
            ))}
          </div>
        </div>

        {error && (
          <div className="col-span-1 mt-4 flex items-center text-red-600 sm:col-span-2">
            <AlertCircle className="mr-2 h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        <Button
          type="submit"
          variant="green"
          className="col-span-1 w-full sm:col-span-2"
        >
          Sign Up
        </Button>
      </form>

      <div className="text-center">
        Already have an account?{" "}
        <Button
          variant="link"
          className="pl-0 font-semibold"
          onClick={switchToSignIn}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
