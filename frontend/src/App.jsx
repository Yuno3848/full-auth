import ForgotPassword from "./pages/login/forgotPassword";
import ResetPassword from "./pages/resetPassword/resetPassword";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster />
      <ForgotPassword />
    </>
  );
}

export default App;
