import { ChangeEvent, useState } from "react";
import Input from "./ui/Input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import axios from "axios";
import { UserSignIn } from "../types.ts";

type SignInProps = {
  switchToSignUp: () => void;
};

const SignIn: React.FC<SignInProps> = ({ switchToSignUp }) => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [formData, setFormData] = useState<UserSignIn>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("/auth/token", formData);
      console.log(data);
      updateUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Request failed with status code:",
          error.response.status
        );
        setError("Invalid credentials");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="mr-6 w-96 flex flex-col pl-10 pt-10 pr-10 pb-3 justify-center bg-secondary gap-5 rounded-md border border-primary text-primary shadow-md">
      <h1 className="font-heading2 font-bold text-4xl mb-2 text-primary cursor-default">
        Hello,
        <br />
        Welcome Back
      </h1>

      <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
        <Input
          label="Username"
          value={formData.username}
          type="text"
          name="username"
          placeholder="musk"
          required
          onChange={handleChange}
        />

        <Input
          label="Password"
          value={formData.password}
          type="password"
          name="password"
          placeholder="********"
          required
          onChange={handleChange}
        />

        {error && <div className="text-center text-red-600">{error}</div>}
        <div className="w-100 text-center text-sm italic font-light text-primary cursor-default">
          Forgot password? Me too.
        </div>
        <button
          className="text-secondary w-full bg-primary rounded p-2 shadow-lg active:shadow-none"
          type="submit"
        >
          Sign in
        </button>
      </form>
      <div className="w-full">
        Don't have an account?{" "}
        <button className="font-semibold" onClick={switchToSignUp}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default SignIn;
