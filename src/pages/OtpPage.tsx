import { getTokenAfterSignUp, verifyEmail } from "@/api/auth";
import { useAuth } from "@/context/AuthContext";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// /sign-up/verify
const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await verifyEmail(parseInt(otp));
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
    <div>
      <h1>Verify your email</h1>
      <form onSubmit={handleOtpSubmit}>
        <input type="text" value={otp} onChange={handleOtpChange} />
        <button type="submit">Submit</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default OtpPage;
