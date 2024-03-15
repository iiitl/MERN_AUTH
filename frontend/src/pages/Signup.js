import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading,errorMessage } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <div className="Error">{errorMessage}</div>
      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
        autoComplete="false"
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
        autoComplete="false"
        pattern=".{8,20}" 
        title="8 to 20 characters"
      />

      <button disabled={isLoading}>Sign up</button>
      {/* Display error message if there was an issue with the Sign up */}
    </form>
  );
};

export default Signup;
