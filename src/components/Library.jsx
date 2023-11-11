import "../styles/library.css";
import LikedIcon from "../assets/likedmusic.png";
import PushPinIcon from "@mui/icons-material/PushPin";
import PlayIcon from "../assets/play (3).png";
import AlbumCard from "./Album";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const navigate = useNavigate();

  const arr = JSON.parse(localStorage.getItem("libraryAlbum")) || []; // Add a default empty array if 'libraryAlbum' is not in local storage

  const handleLikePlayList = () => {
    navigate("/LikePlaylist/songplay");
  };

  return (
    <div className="library">
      <h2>All albums you have liked are here</h2>
      <div className="likedSong">
        <div className="likeMusicCard" onClick={handleLikePlayList}>
          <img src={LikedIcon} alt="liked album" />
          <img className="icon4" src={PlayIcon} alt="icon" />
          <h5>Liked music</h5>
          <p>
            <PushPinIcon /> Auto playlist
          </p>
        </div>
        {arr.map((e, index) => (
          <AlbumCard key={index} details={e} onClick={handleLikePlayList} />
        ))}
      </div>
    </div>
  );
};

export default Library;
