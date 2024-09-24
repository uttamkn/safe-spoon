import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import { useAuth } from "@/context/AuthContext";
import Verify from "@/pages/Verify";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Hero from "@/pages/Hero";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotFoundPage from "@/components/404";
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
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ];

  const nonPrivateRoutes = [
    {
      path: "/",
      element: <Hero />,
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
      element: <Verify />,
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
