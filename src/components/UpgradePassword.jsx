import "../styles/Signup&login.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Alert from "./Alert";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const UpdatePassword = () => {
  const [upgradeDetails, setUpgradeDetails] = useState({
    name: "",
    email: "",
    password: "",
    passwordCurrent:"",
    appType: "music",
  });
  const [formErr, setFormErr] = useState({
    usernameErr: "",
    passErr: "",
    alertErr: "",
  });
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setUpgradeDetails({ ...upgradeDetails, email: e.target.value });
  };

  const handleCurrentPassword = (e) => {
    setUpgradeDetails({...upgradeDetails, passwordCurrent: e.target.value })
  }

  const handleNewPassword = (e) => {
    setUpgradeDetails({ ...upgradeDetails, password: e.target.value });
    if (e.target.value.length < 6 && e.target.value.length > 0) {
      setFormErr({
        ...formErr,
        passErr: "Password must be at least 6 characters",
      });
    } else {
      setFormErr({ ...formErr, passErr: "" });
    }
  };
  const userDataFromLocalStorage = JSON.parse(localStorage.getItem("loginStatus"))
  console.log(userDataFromLocalStorage);
  console.log(upgradeDetails);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://academics.newtonschool.co/api/v1/user/updateMyPassword", {
      method: "PATCH",
      headers: {
        projectId: "z5civ6ptecws",
        "Content-Type": "application/json",
        "authorization": `Bearer ${userDataFromLocalStorage?.token}`,
      },
      body: JSON.stringify({
        name: userDataFromLocalStorage?.data?.name,
        email: upgradeDetails?.email,
        passwordCurrent: upgradeDetails?.passwordCurrent,
        password: upgradeDetails?.password,
        appType: 'music',
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response);
          if (response.status == 403) {
            throw new Error("Somthing going wrong !");
          } else if (response.status == 400) {
            throw new Error(
              "Registration failed! Enter valid email address and password"
            );
          } else {
            throw new Error("Registration failed! Error...");
          }
        }
      })
      .then((data) => {
        if (data.status == "success") {
          handleClickOpen();
          setTimeout(() => {
            handleClose();
          }, 2000);
        }
      })
      .catch((error) => {
        setOpen2(true);
        setTimeout(() => {
          setOpen2(false);
        }, 2000);
        setFormErr({ ...formErr, alertErr: error.message });
      });
  };
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    navigate("/login");
    setOpen(false);
  };

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
        <h3>Update Password</h3>

        <label htmlFor="email">
          Email <span className="req">*</span>
        </label>
        <input
          type="email"
          placeholder="abc@gmail.com "
          onChange={handleEmail}
          id="email"
          required
        />

        <label htmlFor="password">
          Current Password <span className="req">*</span>
        </label>
        <input
          type="password"
          placeholder="Password"
          onChange={handleCurrentPassword}
          id="password"
          required
        />

        <label htmlFor="password">
          New Password <span className="req">*</span>
        </label>
        <input
          type="password"
          placeholder="Password"
          onChange={handleNewPassword}
          id="password"
          required
        />
        {<span style={{ color: "red" }}>{formErr.passErr}</span>}

        <button
          type="submit"
          disabled={
            formErr.passErr.length > 0 || formErr.usernameErr.length > 0
              ? "disabled"
              : false
          }
        >
          Update
        </button>
      </form>
      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom>
              ✅ Password Updated Successfully
            </Typography>
          </DialogContent>
          <DialogActions></DialogActions>
        </BootstrapDialog>
      </div>

      {open2 ? <Alert status={"fail"} text={`${formErr.alertErr}`} /> : null}
    </>
  );
};
export default UpdatePassword;
