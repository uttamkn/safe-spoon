import { Toaster } from "sonner";
import AuthProvider from "./context/AuthContext";
import Routes from "./routes/Routes";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

//TODO: navbar should be added here
const App = () => {
  return (
    <AuthProvider>
      <Routes />
      <Toaster />
    </AuthProvider>
  );
};

export default App;
