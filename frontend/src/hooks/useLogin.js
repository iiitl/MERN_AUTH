import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }
    if (response.ok) {
      // Save user data to local storage

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // saving it to localStorage of browser to save user session
      localStorage.setItem("user", JSON.stringify(json));
      // update loading state
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
