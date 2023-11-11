import './App.css'
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import LibraryPage from './pages/LibraryPage';
import UpgradePage from './pages/UpgradePage';
import AlbumMusicPage from './pages/AlbumPage';
import MusicplayPage from './pages/MusicplayPage';
import SingleMusicPlayer from './pages/SinglePlayPage';
import LikedPlaylistPage from './pages/LikedPlaylistPage';
import PremiumPage from './pages/PremiumPage';
import UpdatePassword from './components/UpgradePassword';
import Login from "./components/LoginPage";
import Signup from "./components/Signup"
import Err from "./components/Err"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


function App() {
  const libraryAlbum=[];
  if (!JSON.parse(localStorage.getItem("libraryAlbum"))) {
    localStorage.setItem("libraryAlbum", JSON.stringify(libraryAlbum));
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <HomePage />
        </>
      ),
    },
    {
      path: '/explore',
      element: (
        <>
          <ExplorePage />
        </>
      ),
    },
    {
      path: '/library',
      element: (
        <>
          <LibraryPage />
        </>
      ),
    },
    {
      path: '/upgrade',
      element: (
        <>
          <UpgradePage />
        </>
      ),
    },
    {
      path: '/musiclist',
      element: (
        <>
       
          <AlbumMusicPage />
        </>
      ),
    },
    {
      path: '/musiclist/songplay',
      element: (
        <>
        
          <MusicplayPage />
        </>
      ),
    },
    {
      path: '/explore/songplay',
      element: (
        <>
        
          <SingleMusicPlayer />
        </>
      ),
    },
    {
      path: '/LikePlaylist/songplay',
      element: (
        <>
        <LikedPlaylistPage/>
        </>
      ),
    },
    {
      path: '/login',
      element: (
        <>
        <Login/>
        </>
      ),
    },
    {
      path: '/signup',
      element: (
        <>
        <Signup/>
        </>
      ),
    },
    {
      path: '/premium',
      element: (
        <>
        <PremiumPage/>
        </>
      ),
    },
    {
      path: '/updatePassword',
      element: (
        <>
        <UpdatePassword/>
        </>
      ),
    },
    {
      path: '*',
      element: (
        <>
       <Err/>
        </>
      ),
    },
  
  ])


  return (<>
    <RouterProvider router={router} />
  </>)

}

export default App;
