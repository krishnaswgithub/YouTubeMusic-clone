import ActionAreaCard from "./Album";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import "../App.css";

const Home = (prop) => {
  const [page, setPage] = useState(2);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const url = `https://academics.newtonschool.co/api/v1/music/album?page=${page}&limit=10`;
  const headers = {
    projectId: "z5civ6ptecws",
  };
  const [data, setData] = useState([]);
  const [alldata, setAlldata] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, { headers });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(response.statusText);
      }
    };
    fetchData().then((d) => {
      setData(d);
    });
  }, [page]);

  const [fulldata, setfulldata] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/music/album`,
        { headers }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(response.statusText);
      }
    };
    fetchData().then((d) => {
      setAlldata(d.data);
      setfulldata(d.data);
    });
  }, []);
  useEffect(() => {
    const array = fulldata.filter((element) =>
      element.title.toLowerCase().includes(prop.searchValue.toLowerCase())
    );
    setAlldata(array);
  }, [prop.searchValue]);

  return (
    <>
      {!prop.searchValue ? (
        <h1 className="mix">India's Biggest Hits</h1>
      ) : (
        <h1 className="mix">Your search</h1>
      )}
      <div className="Home-sub-container">
        <Grid
          container
          sx={{ display: "flex", justifyContent: "center" }}
          spacing={2}
        >
          {prop.searchValue
            ? alldata?.map((e, ind) => (
                <Grid key={e._id} item lg={2.4}>
                  <ActionAreaCard details={e} />
                </Grid>
              ))
            : data.data &&
              data.data.map((e, ind) => {
                if (e.songs.length > 0) {
                  return (
                    <Grid key={e._id} item lg={2.8} xl={2.2}>
                      <ActionAreaCard details={e} />
                    </Grid>
                  );
                }
              })}
          {data.data && !prop.searchValue ? (
            <Pagination
              className="pagination"
              sx={{
                display: "flex",
                justifyContent: "center",
                color: "white",
                width: "80vw",
                margin: "50px 0",
              }}
              count={10}
              page={page}
              color={"secondary"}
              onChange={handleChange}
            />
          ) : null}
        </Grid>
      </div>
    </>
  );
};

export default Home;
