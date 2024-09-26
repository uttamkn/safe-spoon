import { useParams } from "react-router-dom";
import { ChangeEvent, useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { resetPassword } from "@/api/auth";

const ResetPasswordPage = () => {
  const { token } = useParams<{ token: string }>();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  if (!token) {
    return (
      <div className="flex min-h-full items-center justify-center p-6 font-roboto dark:bg-primary">
        <div className="w-full max-w-md rounded-lg border p-8 shadow-lg dark:border-border dark:bg-secondary dark:text-quaternary">
          <h1 className="mb-6 text-center text-3xl font-bold">Invalid Token</h1>
        </div>
      </div>
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      await resetPassword(formData.password, token);
      toast({
        title: "Success",
        description: "Password was changed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-full items-center justify-center p-6 font-roboto dark:border-border dark:bg-primary">
      <div className="w-full max-w-md rounded-lg border p-8 shadow-lg dark:border-border dark:bg-secondary dark:text-quaternary">
        <h1 className="mb-6 text-center text-3xl font-bold">Reset Password</h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium"
              >
                New Password
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
                  className="pl-10"
                />
                <Lock className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1 block text-sm font-medium"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  type="password"
                  name="confirmPassword"
                  placeholder="********"
                  required
                  onChange={handleChange}
                  className="pl-10"
                />
                <Lock className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <Button type="submit" variant="green" className="w-full">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
