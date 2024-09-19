import { Toaster } from "sonner";
import AuthProvider from "./context/AuthContext";
import Routes from "./routes/Routes";
import axios from "axios";
import { ThemeProvider } from "./context/ThemeContext";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

//TODO: navbar should be added here
const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <Routes />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
