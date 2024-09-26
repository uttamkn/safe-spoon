import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import { useAuth } from "@/context/AuthContext";
import VerifyPage from "@/pages/VerifyPage";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import HeroPage from "@/pages/HeroPage";
import ErrorBoundary from "@/components/errorComponents/ErrorBoundary";
import NotFoundPage from "@/components/errorComponents/404";
import NavbarLayout from "@/pages/NavbarLayout";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";

const Routes = () => {
  const { token } = useAuth();

  const privateRoutes = [
    {
      path: "/",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
      ],
    },
  ];

  const nonPrivateRoutes = [
    {
      path: "/",
      element: <HeroPage />,
    },
    {
      path: "/sign-in",
      element: <SignInPage />,
    },
    {
      path: "/sign-up",
      element: <SignUpPage />,
    },
    {
      path: "/sign-up/verify",
      element: <VerifyPage />,
    },
  ];

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <NavbarLayout />,
      children: [...(!token ? nonPrivateRoutes : []), ...privateRoutes],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return (
    <ErrorBoundary>
      <RouterProvider router={routes} />
    </ErrorBoundary>
  );
};

export default Routes;
