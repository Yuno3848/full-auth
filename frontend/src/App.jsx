import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/forgotPassword/forgotPassword";
import ResetPassword from "./pages/resetPassword/resetPassword";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./contexts/authContext";
import Welcome from "./pages/Welcome/Welcome";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/signup"
          element={authUser ? <SignUp /> : <Navigate to={<SignIn />} />}
        />
        <Route
          path="/signin"
          element={authUser ? <SignIn /> : <Navigate to={<Welcome />} />}
        />
        <Route
          path="/forgot-password"
          element={
            authUser ? <ForgotPassword /> : <Navigate to={<Welcome />} />
          }
        />
        <Route
          path="/reset-password/:token"
          element={authUser ? <resetPassword /> : <Navigate to={<Welcome />} />}
        />
      </Routes>
    </>
  );
}

export default App;
