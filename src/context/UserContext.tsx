import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { getToken } from "../api/utils";
import { User } from "../types.ts";

const UserContext = createContext<any>({
  user: {
    id: 0,
    username: "",
    allergies: [],
    gender: "",
    age: "",
    anyDiseases: "",
    weight: "",
  },
  loading: true,
  updateUser: () => {},
});

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>({
    id: 0,
    username: "",
    allergies: [],
    gender: "",
    age: "",
    anyDiseases: "",
    weight: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getToken();
        if (token) {
          const response = await axios.get("/auth/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (
            response.data &&
            typeof response.data === "object" &&
            !Array.isArray(response.data)
          ) {
            setUser(response.data);
          } else {
            throw new Error("Unexpected data format received");
          }
        } else {
          throw new Error("Token not available");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser({
          id: 0,
          username: "",
          allergies: [],
          age: "",
          anyDiseases: "",
          gender: "",
          weight: "",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const updateUser = (userData: any) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the user context (user, updateUser and loading state)
export const useAuth = () => useContext(UserContext);
