import { useState } from "react";
import toast from "react-hot-toast";
const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const forgotPassword = async ({ email }) => {
    if (!email) {
      toast.error("Email is required.");
      return;
    }
    setLoading(true);
    try {
      const result = await fetch(
        "http://localhost:8080/api/v1/user/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await result.json();
      if (!data.success) {
        toast.error(data.message || "Something went wrong!");
        return;
      }
      toast.success("Password reset link sent to your email.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, forgotPassword };
};
export default useForgotPassword;
