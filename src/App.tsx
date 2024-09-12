import AuthProvider from "./context/AuthContext";
import Routes from "./routes/Routes";

//TODO: navbar should be added here
const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
