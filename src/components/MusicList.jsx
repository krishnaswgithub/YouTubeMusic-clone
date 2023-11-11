
import React,{ useState, useEffect } from 'react';
import  '../styles/albumsonglist.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import playIcon from '../assets/play (4).png';

const MusicList=()=>{
 
  const navigate=useNavigate();
  
  const [libraryStatus,setLibraryStatus]=useState();
  const id=localStorage.getItem("albumID");
  const url=`https://academics.newtonschool.co/api/v1/music/album/${id}`
  const headers = {
    'projectId': 'z5civ6ptecws',
  };
  const [musiclist, setData] = useState([]);
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
      setData(d.data);
      const arr2=JSON.parse(localStorage.getItem("libraryAlbum"));
      const ans2= arr2.filter((e)=>{
        return e._id==d.data._id;
        })
        if(ans2.length==0){
          setLibraryStatus(false);
        }else{
          setLibraryStatus(true);
        }
    });
  }, [])
  

  


  const handleSaveLibrary=()=>{
    const obj=musiclist;
    const arr=JSON.parse(localStorage.getItem("libraryAlbum"));
    const ans= arr?.filter((e)=>{
      return e._id==obj._id;
      })
    if (!ans.length==0){
      setLibraryStatus(false);
      arr.forEach(o => {
        if (o._id === obj._id) {
          arr.splice(arr.indexOf(o), 1);
          localStorage.setItem("libraryAlbum",JSON.stringify(arr));
        }
      });
    }else{
      arr.push(musiclist);
      localStorage.setItem("libraryAlbum",JSON.stringify(arr));
      setLibraryStatus(true);
    }
  }


  

    return <>
     <Grid container spacing={2} className='albumpage'>
      <Grid className='imagebox' item md={4} sm={4} sx={{height: '200px' }} xs={12}>
        <img src={musiclist.image} alt="" />
      </Grid>
      <Grid item className='detailbox' md={8} sm={8} sx={{ height: '200px' }} xs={12}>
        <div>
          <h1>{musiclist.title}</h1>
          {musiclist.artists && musiclist.artists.map((e,ind)=>
            <span key={ind}>{e.name}, </span>
          )}
          <h4>{musiclist.songs ? musiclist.songs.length : null} songs</h4>
          <p>
          <Button className='playbutton'  variant="outlined" onClick={()=>{
           navigate('/musiclist/songplay')
           localStorage.setItem('songIndex',0)}
           } >
              play
            </Button>
            <Button className='addbutton'  onClick={handleSaveLibrary} variant="contained"  color={!libraryStatus? "success" :"error"} >
              {!libraryStatus ? "Save in library" :"Delete from library"}
            </Button>
          </p>
        </div>
      </Grid>
      <Grid item className='albumsonglist' md={12} sm={12} sx={{ background: 'black', minHeight: '50vh' }} xs={12}>
        <ol>
          {musiclist.songs && musiclist.songs.map((e,ind)=>{
            return(<React.Fragment key={ind}>
            <li  onClick={
              ()=>{
                navigate('/musiclist/songplay')
                localStorage.setItem('songIndex',ind);
              }
            }>{e.title}
            <img src={playIcon} className="playsm2" alt="icon" />
            </li>
            <hr />
            </React.Fragment>)
          })}
        </ol>
      </Grid>

    </Grid>
    </>
}

export default MusicList;