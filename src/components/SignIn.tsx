import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useAuth } from "@/context/AuthContext";
import { getTokenAfterSignIn } from "@/api/auth";
import { Mail, Lock, AlertCircle } from "lucide-react";

const SignIn: React.FC = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const token = await getTokenAfterSignIn(formData);
      setToken(token);
      navigate("/");
    } catch (err: AxiosError | any) {
      setError(err.response?.data.message || "Something went wrong.");
    }
  };

  const switchToSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <div className="w-full max-w-md rounded-lg border p-8 shadow-lg dark:border-border dark:bg-secondary dark:text-quaternary">
      <h1 className="mb-6 text-center text-3xl font-bold">Welcome Back</h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium">
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

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium">
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

        <div className="flex w-full justify-center">
          <Button
            variant="link"
            type="button"
            className="text-sm font-light italic text-gray-500 dark:text-quaternary"
          >
            Forgot password?
          </Button>
        </div>

        <Button type="submit" variant="green" className="w-full">
          Login
        </Button>
      </form>

      <div className="mt-4 text-center">
        Don’t have an account?{" "}
        <Button
          variant="link"
          className="pl-0 font-semibold"
          onClick={switchToSignUp}
        >
          Sign up
        </Button>
      </div>

      {error && (
        <div className="mt-4 flex w-full items-center justify-center text-red-600">
          <AlertCircle className="mr-2 h-5 w-5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default SignIn;
