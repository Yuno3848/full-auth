import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../contexts/authContext";

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signin = async ({ email, password }) => {
    setLoading(true);
    const errorResult = handleErrors(email, password);

    if (errorResult) {
      setLoading(false);
      return false;
    }

    try {
      const result = await fetch("http://localhost:8080/api/v1/user/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await result.json();
      if (!data.success) {
        toast.error(data.message || "Something went wrong");
        return false;
      }
      setAuthUser(data.data);
      toast.success("Sign In successful!");
      setLoading(false);
      return true;
    } catch (error) {
      console.log("sign in error", error.message);
      toast.error("Bad Credentials.");
    } finally {
      setLoading(false);
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
