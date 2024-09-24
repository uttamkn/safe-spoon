import AuthProvider from "./context/AuthContext";
import Routes from "./routes/Routes";
import axios from "axios";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "./components/ui/toaster";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
