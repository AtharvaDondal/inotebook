import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save the authtoken and redirect
      // save it to the localStorage
      try {
        // localStorage.setItem("token",json.authtoken)
        localStorage.setItem("token",json.authToken)
        props.showAlert("Logged in successfully", "success");
        navigate("/");
      } catch (error) {
        props.showAlert("Invalid Credentials", "danger");
        console.error("Error storing token in localStorage:", error);
      }
    }
  };

  const onChange = (e) => {
    //setNote({...note}): value in the note object should be available there, that's why using spread operator and which properties is writing after that [], that will be added or override..
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-3">
      <h2>Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            value={credentials.email}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            value={credentials.password}
            name="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
