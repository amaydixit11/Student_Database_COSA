import React, { useState, useContext } from "react";
import { AdminContext } from "../../App";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import GoogleIcon from "@mui/icons-material/Google";
import { registerUser } from "../../services/auth";
import isIITBhilaiEmail from "../../utils/emailValidator";

function Register() {
  const [name, setName] = useState("");
  const [ID, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsUserLoggedIn } = useContext(AdminContext);
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!isIITBhilaiEmail(email)) {
      setError("Please use an @iitbhilai.ac.in email address.");
      return;
    }

    const status = await registerUser(name, ID, email, password);
    if (status) {
      setIsUserLoggedIn(true);
    }
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <img
        src="/Logo_of_IIT_Bhilai.png"
        width={100}
        alt="IIT-Bhilai-Logo"
        style={{ position: "relative", bottom: 20 }}
      />
      <Container className="d-flex justify-content-center align-items-center">
        <Form onSubmit={handleSubmit} style={{ width: "30%" }}>
          <FormGroup className="text-center">
            <h2>Register</h2>
          </FormGroup>
          <FormGroup>
            <Label for="name">Details</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              name="ID"
              id="ID_No"
              placeholder="Student ID"
              value={ID}
              onChange={(e) => setId(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Create Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>

          {error && (
            <p
              className="text-danger text-center"
              style={{ fontSize: "0.9rem" }}
            >
              {error}
            </p>
          )}

          <FormGroup className="text-center">
            <Button type="submit" style={{ width: "100%" }} color="success">
              Register
            </Button>
          </FormGroup>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <hr style={{ width: "40%" }} />
            <p style={{ margin: "0 10px" }}>OR</p>
            <hr style={{ width: "40%" }} />
          </div>
          <FormGroup className="text-center">
            <a href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`}>
              <Button type="button" style={{ width: "100%" }} color="primary">
                Sign up with Google <GoogleIcon />
              </Button>
            </a>
          </FormGroup>
          <FormGroup className="text-center">
            <Label>
              Already have an Account? <a href="/login">Login</a>
            </Label>
          </FormGroup>
        </Form>
      </Container>
    </Container>
  );
}

export default Register;
