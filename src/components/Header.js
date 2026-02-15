
import {ShowSideBar} from "../logic/ShowSideBar";
import { MainData } from "../logic/MainContext";
import { useContext } from "react";
import {Link} from "react-router-dom"

function Header() {
const {USER , URL } = useContext(MainData)

if(USER !== ""){
  if(USER.img === ""){USER.img = "admin.png"}
  return (
    <header className="w-full h-12 bg-white bg-opacity-40 shadow-slate-400 shadow-md pr-6 pl-6 flex justify-between rounded-r-lg rounded-l-lg ">
          <Link to="/"><img className="h-11 w-fit mt-1" src="/img/panner.png" alt=""></img> </Link> 
            <img className="h-9 w-9 mt-1 ml-2 rounded-full " src={URL + "/" + USER.img} alt ="" onClick={()=>{ShowSideBar()}}></img>
    </header>
  );


}else{
  return (
    <header className="w-full h-12 bg-white bg-opacity-40 shadow-slate-400 shadow-md pr-6 pl-6 flex justify-between rounded-r-lg rounded-l-lg ">
            <img className="h-11 w-fit mt-1" src="img/panner.png" alt=""></img>  
            <div className="h-9 w-9 mt-1 ml-2 rounded-full bg-transparent border-none"></div>
    </header>
  );

}
}

export default Header;



