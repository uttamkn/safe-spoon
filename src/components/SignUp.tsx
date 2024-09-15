import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { UserT } from "@/types";
import { sendEmail } from "@/api/auth";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type SignUpFormT = UserT & { confirm_password: string };

const SignUp: React.FC = () => {
  const navigate = useNavigate();

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

    // Form validation
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
      await sendEmail(data.email);

      localStorage.setItem("sign-up-data", JSON.stringify(data));
      navigate("/sign-up/verify");
    } catch (err: AxiosError | any) {
      setError(err.response.data.error);
    }
  };

  const switchToSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-secondary text-primary border border-primary rounded-md shadow-md space-y-6">
      <h1 className="text-3xl font-bold">Register Now</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="Elon"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="example@gmail.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div>
          <label htmlFor="allergies" className="block text-sm font-medium">
            Allergies
          </label>
          <div className="flex items-center gap-2 mt-2">
            <Input
              type="text"
              name="allergies"
              placeholder="e.g., peanuts, gluten"
              value={allergyInput}
              onChange={(e) => setAllergyInput(e.target.value)}
            />
            <Button onClick={handleAddAllergy} type="button">
              Add
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.allergies.map((allergy) => (
              <Badge key={allergy} onClick={() => handleRemoveAllergy(allergy)}>
                {allergy}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-5">
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Must be at least 8 characters long"
            pattern=".{8,}"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirm_password"
            placeholder="Must match the password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium">
            Gender
          </label>
          <Select
            value={formData.gender}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, gender: value }))
            }
            required
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-5">
          <Input
            label="Age"
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <Input
            label="Weight"
            type="number"
            name="weight"
            placeholder="Weight in kg"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="diseases" className="block text-sm font-medium">
            Diseases
          </label>
          <div className="flex items-center gap-2 mt-2">
            <Input
              type="text"
              name="diseases"
              placeholder="e.g., common flu"
              value={diseaseInput}
              onChange={(e) => setDiseaseInput(e.target.value)}
            />
            <Button onClick={handleAddDisease} type="button">
              Add
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.diseases.map((disease) => (
              <Badge key={disease} onClick={() => handleRemoveDisease(disease)}>
                {disease}
              </Badge>
            ))}
          </div>
        </div>

        {error && <div className="text-center text-red-600">{error}</div>}

        <Button type="submit" className="w-full">
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
