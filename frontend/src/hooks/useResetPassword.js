import { useState } from "react";
import toast from "react-hot-toast";

const useResetPassword = ({ token }) => {
  const [loading, setLoading] = useState(false);

  const resetPassword = async ({ password, confirmPassword }) => {
    setLoading(true);
    const resultError = handleError(password, confirmPassword);
    if (resultError) {
      setLoading(false);
      return;
    }
    try {
      const result = await fetch(
        `http://localhost:8080/api/v1/user/reset-password/${token}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password, confirmPassword }),
        }
      );

      const data = await result.json();
      if (!data.success) {
        toast.error(data.message || "Something went wrong");
        setLoading(false);
        return;
      }
      toast.success("Password has been reset successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, resetPassword };
};

const handleError = (password, confirmPassword) => {
  if ([password, confirmPassword].some((field) => field.trim() === "")) {
    toast.error("All fields are required.");
    return true;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match.");
    return true;
  }
  return false;
};

export default useResetPassword;
