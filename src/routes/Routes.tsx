import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import { useAuth } from "@/context/AuthContext";
import SignUp from "@/components/SignUp";
import SignIn from "@/components/SignIn";
import Verify from "@/pages/Verify";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import About from "@/pages/About";
import Hero from "@/pages/Hero";

const Routes = () => {
  const { token } = useAuth();

  const publicRoutes = [
    {
      path: "/about",
      element: <About />,
    },
  ];

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

  //TODO: Show sign-in and sign-up components as popups when clicked on the buttons in the hero page
  //TODO: Add a gif to the hero page (make this similar to main page but without functionality)
  const nonPrivateRoutes = [
    {
      path: "/",
      element: <Hero />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/sign-up/verify",
      element: <Verify />,
    },
  ];

  const routes = createBrowserRouter([
    ...publicRoutes,
    ...(!token ? nonPrivateRoutes : []),
    ...privateRoutes,
  ]);

  return <RouterProvider router={routes} />;
};

export default Routes;
