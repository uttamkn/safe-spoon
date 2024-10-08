import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Mail } from "lucide-react";
import { AxiosError } from "axios";
import { getTokenAfterSignUp, verifyOtpEmail } from "@/api/auth";
import { useAuth } from "@/context/AuthContext";

const VerifyPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useAuth();
  const navigate: NavigateFunction = useNavigate();

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await verifyOtpEmail(parseInt(otp));
      console.log("Email verified");

      const data = localStorage.getItem("sign-up-data");
      if (!data) {
        throw new Error("sign up data was not found in the local storage");
      }

      const parsedData = JSON.parse(data);
      const token = await getTokenAfterSignUp(parsedData);
      setToken(token);
      navigate("/");
    } catch (error: AxiosError | any) {
      setError("Failed to verify the email");
    } finally {
      localStorage.removeItem("sign-up-data");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 font-jet-brains-mono dark:bg-primary">
      <Card className="w-full max-w-md p-6 shadow-lg dark:border-border dark:bg-secondary">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Verify Your Email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="mb-4 flex items-center justify-center">
              <Mail size={50} />
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <label htmlFor="otp" className="block text-sm font-medium">
                Enter the OTP sent to your email:
              </label>
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
                pattern={REGEXP_ONLY_DIGITS}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {error && <div className="text-sm text-red-500">{error}</div>}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyPage;
