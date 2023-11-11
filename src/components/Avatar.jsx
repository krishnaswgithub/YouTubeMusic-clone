import * as React from "react";
import Menu from "@mui/material/Menu";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import "../styles/avatar.css";
import { useNavigate } from "react-router";
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginButton from '../components/LoginButt'

const Avt = ({ userrData }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openup = Boolean(anchorEl);
  const menuSt = React.useRef(false);

  const navigate = useNavigate();// new add

  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {  //new Add
    navigate("/login");
  }

  const handleUpdatePassword = () => {
    navigate("/updatePassword");
  }

  return (
    <>
      <Avatar
        sx={{ background: "#0786ed" }}
        alt={userrData?.status == "success" ? userrData?.data.name : null}
        src="#"
        aria-controls={openup ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openup ? "true" : undefined}
        onClick={handleClick2}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openup}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {userrData?.status ? (
          <Box className="avt-box" sx={{ padding: "10px 50px 10px 30px" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <Avatar
                sx={{ background: "#0786ed" }}
                alt={
                  userrData?.status == "success" ? userrData?.data.name : null
                }
                src="#"
              />

              <h2 style={{ display: "inline-block", fontFamily: "verdana" }}>
                {userrData?.status == "success"
                  ? userrData?.data.name
                  : "username"}
              </h2>
            </Box>
            <span>
              {userrData?.status == "success"
                ? userrData?.data.email
                : "user Email"}
            </span>
          </Box>
        ) : (
          <Box
            sx={{
              
              display: "flex",
              alignItems: "center",
              
            }}
          >
            <Avatar src="#" />
            <h6 style={{ fontWeight: "600" }}>
              Seems like you are not logged in.{" "}
            </h6>
          </Box>
        )}
            <hr/>
            <div className="btn">
            <button className="up-btn" onClick={handleUpdatePassword}><SettingsIcon/>Settings</button>
            </div>

            {/* <div className="btn">
            <button className="log-btn" onClick={handleLogin} ><AccountCircleIcon/>Login</button>
            </div> */}
            <LoginButton st={menuSt}/>

        {/* <div className="avt-box2">
          <LoginButt st={menuSt} />
        </div> */}

      </Menu>
    </>
  );
};
export default Avt;
