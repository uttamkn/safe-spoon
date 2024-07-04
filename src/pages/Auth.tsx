import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { useState } from "react";

const Auth: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  const switchToSignUp = () => {
    setIsSignIn(false);
  };
  const switchToSignIn = () => {
    setIsSignIn(true);
  };

  return (
    <div className="bg-signin-image bg-cover">
      <div className="flex justify-center items-center h-screen">
        {isSignIn ? (
          <SignIn switchToSignUp={switchToSignUp} />
        ) : (
          <SignUp switchToSignIn={switchToSignIn} />
        )}
      </div>
    </div>
  );
};

export default Auth;
