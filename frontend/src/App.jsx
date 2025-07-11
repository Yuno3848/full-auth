import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/forgotPassword/forgotPassword";
import ResetPassword from "./pages/resetPassword/resetPassword";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { Toaster } from "react-hot-toast";
import Welcome from "./pages/Welcome/Welcome";
import { useAuthContext } from "./contexts/authContext";
import Intro from "./pages/Intro/Intro";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Toaster />
      <Routes>
        <Route index element={<Intro />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Welcome />} />
        <Route path="/signin" element={!authUser ? <SignIn /> : <Welcome />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/welcome" element={authUser ? <Welcome /> : <SignIn />} />
      </Routes>
    </>
  );
}

export default App;
