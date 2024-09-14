import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { UserT } from "@/types";
import { sendEmail } from "@/api/auth";

type SignUpFormT = UserT & { confirm_password: string };

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  //TODO: Change diseases to an array of strings
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
  const [error, setError] = useState("");

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    //WARN: This wont work for arrays
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Form validation

    //TODO: Do better validation
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
      setError("Please enter a valid gender (male or female)");
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

  //TODO: Figure out a way to add multiple allergies and diseases
  return (
    <div className="max-w-2xl flex flex-col pl-10 pt-10 pr-10 pb-3 justify-center bg-secondary gap-5 rounded-md border border-primary shadow-md text-primary">
      <h1 className="font-heading2 font-bold text-4xl mb-2 text-primary cursor-default">
        Register Now
      </h1>

      <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="Elon"
          value={formData.username}
          onChange={handleChange}
          required={true}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="example@gmail.com"
          value={formData.email}
          onChange={handleChange}
          required={true}
        />

        <Input
          label="Allergies"
          type="text"
          name="allergies"
          placeholder="e.g., peanuts, gluten"
          value={formData.allergies.join(", ")}
          onChange={handleChange}
        />

        <div className="flex gap-5">
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Must be at least 8 characters long"
            pattern=".{8,}"
            value={formData.password}
            onChange={handleChange}
            required={true}
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirm_password"
            placeholder="Must match the password"
            value={formData.confirm_password}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="flex gap-5">
          <Input
            label="Gender"
            type="text"
            name="gender"
            placeholder="Male/Female"
            value={formData.gender}
            onChange={handleChange}
          />

          <Input
            label="Age"
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
          />

          <Input
            label="Weight"
            type="number"
            name="weight"
            placeholder="Weight in kg"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>

        <Input
          label="Diseases"
          type="text"
          name="diseases"
          placeholder="common flu, ..."
          value={formData.diseases}
          onChange={handleChange}
        />

        {error && <div className="text-center text-red-600">{error}</div>}
        <div className="w-100 text-center text-sm italic font-light text-primary cursor-default">
          Don't forget to wash your hands
        </div>
        <Button type="submit">Sign Up</Button>
      </form>
      <div className="w-full text-center">
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
