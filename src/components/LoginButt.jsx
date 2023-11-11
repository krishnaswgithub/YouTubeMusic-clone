import { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router";
import IconButton from "@mui/material/IconButton";
import Alerttext from "./Alert";
import "../styles/avatar.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const LoginButt = (prop) => {
  const navigate = useNavigate();
  const [data, setData] = useState({ status: "" });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const loginStatus = JSON.parse(localStorage.getItem("loginStatus"));
    if (loginStatus) {
      setData(loginStatus);
    }
  }, []);

  const handleLogin = () => {
    if (data?.status == "success") {
      const updateData = [{}];
      localStorage.setItem("loginStatus", JSON.stringify(updateData));
      setOpen(true);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
    <div className="btn">
      {open ? <Alerttext text={"✅ You logged out successfully...."} /> : null}
      {!prop.st.current ? (
        <button
          onClick={handleLogin}
          className="log-btn"
        >
        <AccountCircleIcon/>
          {data.status == "success" ? "Logout" : "Login"}
        </button>
      ) : (
        <IconButton
          onClick={handleLogin}
        >
        </IconButton>
      )}
      </div>
    </>
  );
};
export default LoginButt;
