import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading ,errorMessage } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };


  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
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

      <button disabled={isLoading}>Log in</button>
      {/* Display error message if there was an issue with the login */}
    </form>
  );
};

export default Login;
