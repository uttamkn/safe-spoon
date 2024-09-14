import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import { useAuth } from "@/context/AuthContext";
import SignUp from "@/components/SignUp";
import SignIn from "@/components/SignIn";
import OtpPage from "@/pages/OtpPage";

const Routes = () => {
  const { token } = useAuth();

  const publicRoutes = [
    {
      path: "/about",
      element: <h1>About</h1>,
    },
  ];

  const privateRoutes = [
    {
      path: "/",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/",
          element: <h1>Main Page</h1>,
        },
        {
          path: "/profile",
          element: <h1>Profile</h1>,
        },
      ],
    },
  ];

  //TODO: Redesign signin and signup components (and show them as popups)
  //TODO: Add a gif to the hero page (make this similar to main page but without functionality)
  const nonPrivateRoutes = [
    {
      path: "/",
      element: <h1>Hero page</h1>,
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
      element: <OtpPage />,
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
