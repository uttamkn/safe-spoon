import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
    //TODO: Send sign-in data to the server
  };

  const switchToSignUp = () => {
    navigate("/sign-up");
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
        {
          //TODO: Add forgot password functionality
        }
        <div className="w-100 text-center text-sm italic font-light text-primary cursor-default">
          Forgot password? Me too.
        </div>
        <Button type="submit">Sign in</Button>
      </form>
      <div className="w-full">
        Don't have an account?{" "}
        <Button
          variant="link"
          className="pl-0 font-semibold"
          onClick={switchToSignUp}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
