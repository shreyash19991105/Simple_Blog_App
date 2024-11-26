import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      console.log(data);
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Container
        maxWidth="sm"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h2>Login Form</h2>
          <TextField
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="email"
            sx={{ mb: 3 }}
            fullWidth
            value={email}
          />
          <TextField
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="password"
            value={password}
            fullWidth
            sx={{ mb: 3 }}
          />
          <Button variant="outlined" color="secondary" type="submit">
            Login
          </Button>
        </form>
        <small>
          Need an account? <Link to="/registration">Register here</Link>
        </small>
      </Container>
    </React.Fragment>
  );
};

export default LoginPage;
