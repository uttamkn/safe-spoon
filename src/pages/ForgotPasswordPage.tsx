import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Mail } from "lucide-react";
import { sendForgotPasswordEmail } from "@/api/auth";
import { useToast } from "@/hooks/use-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendForgotPasswordEmail(email);
      toast({ title: "Success", description: "Email sent" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid Email",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex min-h-full items-center justify-center p-6 font-roboto dark:bg-primary">
      <div className="w-full max-w-md rounded-lg border p-8 shadow-lg dark:border-border dark:bg-secondary dark:text-quaternary">
        <h1 className="mb-6 text-center text-3xl font-bold">Forgot Password</h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <div className="relative">
              <Input
                id="email"
                value={email}
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                onChange={handleChange}
                className="pl-10"
              />
              <Mail className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <Button type="submit" variant="green" className="w-full">
            Send Email
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
