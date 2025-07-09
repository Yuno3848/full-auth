import React, { useState } from "react";
import toast from "react-hot-toast";
const useSignIn = () => {
  const [loading, setLoading] = useState(false);

  const signin = async ({ email, password }) => {
    setLoading(true);
    const errorResult = handleErrors(email, password);

    if (errorResult) {
      setLoading(false);
      return;
    }

    try {
      const result = await fetch("http://localhost:8080/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await result.json();
      if (!data.success) {
        toast.error(data.message || "Something went wrong");
        return;
      }
      toast.success("Sign In successful!");
    } catch (error) {
      toast.error("Bad Credentials.");
    } finally {
      setLoading(false);
      return;
    }
  };
  return { loading, signin };
};

const handleErrors = (email, password) => {
  if ([email, password].some((field) => field.trim() === "")) {
    toast.error("All fields are required.");
    return true;
  }
  return false;
};
export default useSignIn;
