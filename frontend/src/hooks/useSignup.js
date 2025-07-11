import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../contexts/authContext";
const useSign = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signup = async ({ username, fullname, email, password, avatar }) => {
    setLoading(true);
    const errorResult = handleError(username, fullname, email, password);
    if (errorResult) {
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("password", password);
      if (avatar) {
        formData.append("avatar", avatar);
      }
      const result = await fetch(
        "http://localhost:8080/api/v1/user/registeredUser",
        {
          method: "POST",

          body: formData,
        }
      );

      const data = await result.json();
      if (!data.success) {
        toast.error(data.message || "Something went wrong");
        return;
      }
      setAuthUser(data.data);
      toast.success("Signup successful!");
    } catch (error) {
      console.log("sign up error", error.message);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

const handleError = (username, fullname, email, password) => {
  if (
    [username, fullname, email, password].some((field) => field.trim() === "")
  ) {
    toast.error("All fields are required");
    return true;
  }
  return false;
};
export default useSign;
