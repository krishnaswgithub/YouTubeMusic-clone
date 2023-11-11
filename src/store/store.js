import { configureStore } from "@reduxjs/toolkit";
import apidataReducer from "../reducer/ApidataReducer";
import musicListReducer from "../reducer/MusicReducer";
import loginReducer from "../reducer/LoginStatus";

const combineReducer={
  apidata :apidataReducer,
  albumID:musicListReducer,
  isLogged:loginReducer
}


const store = configureStore({
  reducer: combineReducer,
});
// store.subscribe(()=>console.log("hello success",store.getState()));
  
  export default store;