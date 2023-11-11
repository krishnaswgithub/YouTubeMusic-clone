import { useState, useEffect } from "react";
import "../styles/likedPlaylist.css";
import Playlist from "./LikedMusicPlay";
import Alert from "./Alert";

const TryLikedPlayList = () => {
  const arr3 = JSON.parse(localStorage.getItem("loginStatus"));
  const jwtToken = arr3?.token; // Replace with your actual JWT token
  const url = "https://academics.newtonschool.co/api/v1/music/favorites/like";
  const headers = {
    projectId: "z5civ6ptecws",
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwtToken}`,
  };

  const [likedSong, setLikedSong] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (arr3?.status === "success") {
      const fetchData = async () => {
        try {
          const response = await fetch(url, { headers });
          if (response.ok) {
            const data = await response.json();
            setLikedSong(data.data.songs);
          } else {
            throw new Error(response.status);
          }
        } catch (err) {
          if (err.message === "401") {
            setOpen(true);
            setTimeout(() => {
              setOpen(false);
            }, 3000);
          }
        }
      };

      fetchData();
    } else {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [arr3, jwtToken]);

  return (
    <>
      <div className="playlist">
        {likedSong.length > 0 ? (
          <Playlist songlist={likedSong} />
        ) : (
          <div className="EmptyErr">
            <span className="loader2" style={{ fontSize: "4vw" }}>
              Playlist is empty...
            </span>
          </div>
        )}
      </div>
      {open && (
        <Alert
          status="fail"
          text="Seems like you are not logged in... Login to see liked songs."
        />
      )}
    </>
  );
};

export default TryLikedPlayList;
