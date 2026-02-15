import { useState , useEffect, useContext, useReducer, useRef } from "react";
import axios from "axios"
import BasicModal from "../components/BasicModal"
import {MainData} from "../logic/MainContext"
import Loading from "../components/Loading"
import Account from "../logic/Account";
import Modal from "../components/Modal";

export default function Profile(){


let token = useContext(MainData).storage_token
let newToken = useContext(MainData).normal_token
const { USER , URL , SET_USER } = useContext(MainData)

if(token === "" && newToken === ""){window.location.href = "/login"} ;

    let Xtoken ;
    if(token === ""){Xtoken = newToken}
    else{Xtoken = token}

    const MSG = useRef("")
    const IMG = useRef()
    const [Head , SET_Head] = useState("")
    const [show , SET_show] = useState(false)
    const [open, setOpen] = useState(false); 
    const [Value , SET_Value] = useState(()=>{return <></>})
    const [isLoading , setisLoading] = useState()
    const [AlertMSG , setMSG] = useState("")
    const [Func , SET_Func] = useState("")
    const [Collected , SET_Collected] = useState({})
    


function GetProfile(){
setisLoading(true)
axios.get(URL + "/profile/" + USER.username + "/" + Xtoken)
.then((Res)=>{setisLoading(false) ;
         SET_USER(Res.data) ; 
         localStorage.setItem("user" , JSON.stringify(Res.data))})
.catch((err)=>{setisLoading(false) ; setMSG(err.response.data.msg) ;  setOpen(true);})
}

// eslint-disable-next-line
useEffect(()=>{GetProfile()} , [])

// eslint-disable-next-line
const [state , dispatch ] = useReducer(Account , {Collected , SET_Collected , SET_USER , IMG , Xtoken ,USER , MSG , SET_show , SET_Value , SET_Func , SET_Head , URL , setisLoading , setOpen , setMSG})

if(USER.img === ""){USER.img = "admin.png"}

return(
<div className="Main">
    <div className="w-10/12 flex pl-2 pr-2 mt-6 items-center justify-between">
        <div className="flex w-full items-center h-full">
            <img alt="" src={URL + "/" + USER.img} className="w-48 h-48 rounded-full border-2 border-gray-700 xs:w-36 xs:h-36" ></img>
            <div className="w-fit ml-3 flex flex-col ">
                <p className="m-0 text-3xl font-bold cursor-text xs:text-xl">{USER.name}</p>
                <p className="m-0 text-lg font-medium cursor-text text-gray-600 mt-1 xs:text-sm">@{USER.username}</p>
            </div>
        </div>
        <div>
            <button className="w-36 h-10 text-red-600 font-bold rounded-lg bg-gray-200 hover:bg-gray-300 text-xl xs:w-20 xs:h-8" onClick={()=>{localStorage.clear() ; window.location.reload()}}>Logout</button>
        </div>
    </div>
<div className="flex flex-col w-10/12 mt-5">
<p className="flex text-left font-bold text-xl">Account Settings</p>
<div className="flex text-left font-bold text-lg w-full flex-col mt-3">
<div onClick={()=>{dispatch("pass")}} className="text-left w-full bg-gray-200 h-7 border-b-2 border-b-gray-500 pl-2 text-sm text-gray-800 flex justify-between cursor-pointer hover:bg-gray-300 bg-opacity-80">Change The Password <span>{">"}</span> </div>
<div onClick={()=>{dispatch("img")}} className="text-left w-full bg-gray-200 h-7 border-b-2 border-b-gray-500 pl-2 text-sm text-gray-800 flex justify-between cursor-pointer hover:bg-gray-300 bg-opacity-80">Change The Profile image <span>{">"}</span> </div>
<div onClick={()=>{dispatch("name")}} className="text-left w-full bg-gray-200 h-7 border-b-2 border-b-gray-500 pl-2 text-sm text-gray-800 flex justify-between cursor-pointer hover:bg-gray-300 bg-opacity-80">Change Your Name <span>{">"}</span> </div>
<div onClick={()=>{dispatch("delete")}} className="text-left w-full bg-gray-200 h-7  pl-2 text-sm text-red-600 flex justify-between cursor-pointer hover:bg-gray-300 bg-opacity-80">Delete The Account <span className="text-gray-800">{">"}</span></div>
</div>



</div>


<Modal show={show} head={Head} b1="Save" b2="Cancel" b2f={()=> SET_show(false)} b1f={()=>{dispatch(Func)}} body={Value}/>
<Loading show={isLoading}/>
<BasicModal head="Alert"  body={AlertMSG} open ={open} Close= {()=>{setOpen(false)}}/>
</div>

)
}