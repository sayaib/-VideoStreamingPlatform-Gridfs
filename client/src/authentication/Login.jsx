// components/Login.js
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
`;

const LoginForm = styled.form`
  background-color: #111;
  max-width: 400px;
  width: 100%;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #444;
  background-color: transparent;
  color: #fff;
  outline: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff0a16;
  }
`;
const NetLogo = styled.h1`
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/auth/login",
        { username, password },
        { withCredentials: true }
      );
      //   alert("Logged in successfully");
      navigate("/");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <NetLogo>NetFlix</NetLogo>
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton type="submit">Login</SubmitButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
