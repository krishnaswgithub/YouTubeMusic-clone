import { Alert } from "@mui/material";
import { useState } from "react";

const Alerttext = (prop) => {
  const [status, setStatus] = useState(true);

  const handleChange = () => {
    setStatus(true);
    setTimeout(() => {
      setStatus(false);
    }, 2000);
  };
  return (
    <>
      <Alert
        severity={prop.status == "fail" ? "error" : "success"}
        sx={{
          position: "fixed",
          zIndex: "1000000",
          bottom: 0,
          right: 0,
          width: "100%",
          fontSize: "1rem",
          display: status ? "flex" : "none",
          alignItems: "center",
          height: "8vh",
        }}
      >
        <strong>{prop.text}</strong>
      </Alert>
      <button onClick={handleChange}></button>
    </>
  );
};
export default Alerttext;
