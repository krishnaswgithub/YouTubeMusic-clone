import * as React from "react";
import "../styles/Signup&login.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useDispatch } from "react-redux";
import Alert from "./Alert";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [formErr, setFormErr] = useState({
    mailErr: "",
    passErr: "",
    alertErr: "",
  });
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const url = "https://academics.newtonschool.co/api/v1/user/login";

  const method = "POST";
  const headers = {
    projectId: "z5civ6ptecws",
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    email: loginDetails.email,
    password: loginDetails.password,
    appType: "music",
  });

  const dispatch = useDispatch();
  const LoginStatus = {
    type: "isLoggedin",
    payload: response,
  };
  dispatch(LoginStatus);

  const handleEmail = (e) => {
    setLoginDetails({ ...loginDetails, email: e.target.value });
  };
  const handlePassword = (e) => {
    if (e.target.value.length < 6 && e.target.value.length > 0) {
      setFormErr({
        ...formErr,
        passErr: "Password should be of atleast 6 words",
      });
    } else {
      setFormErr({ ...formErr, passErr: "" });
    }
    setLoginDetails({ ...loginDetails, password: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchData = async () => {
      const response = await fetch(url, { method, headers, body });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(response.status);
        // console.log(response);
      }
    };
    fetchData()
      .then((d) => {
        setResponse(d);
        setOpen(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
        localStorage.setItem("loginStatus", JSON.stringify(d));
      })
      .catch((err) => {
        if (err.message == 401) {
          setFormErr({
            ...formErr,
            alertErr: "Your email or password is incorrect",
          });
        }
        setOpen2(true);
        setTimeout(() => {
          setOpen2(false);
        }, 1000);
      });
  };
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  
  return (
    <>
      <Button
        className="back2"
        onClick={() => {
          navigate("/");
        }}
        variant="outlined"
        startIcon={<KeyboardDoubleArrowLeftIcon />}
      >
        Home
      </Button>
      <div className="background2">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Login Here</h3>

        <label htmlFor="username">
          Email <span className="req">*</span>
        </label>
        <input
          type="email"
          placeholder="Email"
          id="username"
          onChange={handleEmail}
          required
        />
        {<span style={{ color: "red" }}>{formErr.mailErr}</span>}

        <label htmlFor="password">
          Password <span className="req">*</span>
        </label>
        <input
          onChange={handlePassword}
          type="password"
          placeholder="Password"
          id="password"
          required
        />
        {<span style={{ color: "red" }}>{formErr.passErr}</span>}

        <button type="submit">Log In</button>
        <div className="social">
          <span>Do not have account ?</span>
          <div
            className="fb"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up
          </div>
        </div>
      </form>
      {open ? <Alert text={"✅ You logged in successfully...."} /> : null}
      {open2 ? <Alert status={"fail"} text={formErr.alertErr} /> : null}
    </>
  );
};
export default Login;
