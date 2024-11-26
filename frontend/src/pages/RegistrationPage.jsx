import { Button, Container, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:5000/api/register", {
        username: userName,
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
    <>
      <Container
        maxWidth="sm"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h2>Registration Form</h2>
          <TextField
            label="Name"
            onChange={(e) => setUserName(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="text"
            sx={{ mb: 3 }}
            fullWidth
            value={userName}
          />
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
          Already Have an Account? <Link to="/login">Login here</Link>
        </small>
      </Container>
    </>
  );
};

export default RegistrationPage;
