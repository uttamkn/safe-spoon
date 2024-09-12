import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import { useAuth } from "@/context/AuthContext";
import SignUp from "@/components/SignUp";
import SignIn from "@/components/SignIn";

const Routes = () => {
  const { token } = useAuth();

  //TODO: Add a gif to the hero page
  const publicRoutes = [
    {
      path: "/",
      element: <h1>Hero page</h1>,
    },
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

  //TODO: Redesign these (and show them as popups)
  const nonPrivateRoutes = [
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
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
