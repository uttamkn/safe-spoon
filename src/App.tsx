import AuthProvider from "./context/AuthContext";
import Routes from "./routes/Routes";
import axios from "axios";
import { ThemeProvider } from "./context/ThemeContext";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
