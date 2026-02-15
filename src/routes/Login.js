import { useState , useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import BasicModal from "../components/BasicModal";
import axios from "axios"
import {MainData} from "../logic/MainContext"
import Loading from "../components/Loading"




function Login() {

let Time = new Date()
const URL = useContext(MainData).URL
const storage_token = useContext(MainData).storage_token
const normal_token = useContext(MainData).normal_token

if(storage_token !== "" || normal_token !== ""){window.location.href = "/"}


//REF
const user = useRef("")
const pass = useRef("")
const remind = useRef()
const PassMSG = useRef("")
const LoginBTN = useRef()


const [open, setOpen] = useState(false); 
const [Log_Status , setLog] = useState(false)
const [AlertMSG , setMSG] = useState("")
const [isLoading , setisLoading] = useState(false)

const handleClose = () => {
setOpen(false)
if(Log_Status === true){window.location.href = "/"}
};




function HandleLogin(){
let userV = user.current.value
let passV = pass.current.value
let remindV = remind.current.checked

if(userV === "" || passV === ""){PassMSG.current.innerHTML = "Please Don't keep Any Thing Empty !";}
else{
let data = {username : userV , pass : passV}
setisLoading(true)
axios.post(URL + "/login" , data)
.then((Res)=>{ 
    setisLoading(false)
    setMSG(Res.data.msg)
    setOpen(true); 
    if(Res.data.img === ""){Res.data.img = "admin.png"}
   localStorage.setItem("user" , JSON.stringify(Res.data.data))
    if(remindV === true){localStorage.setItem("token" , Res.data.data.token) ;}
    else{
        localStorage.setItem("Ntoken" , Res.data.data.token)
        localStorage.setItem("Expired" , Time.getTime() + 43200000)
    }
    setLog(true)
})
.catch((err)=>{setisLoading(false);setMSG(err.response.data.msg) ; setOpen(true);})

}
}



const [PassVal , setPassVal] = useState("")

useEffect(()=>{
if(PassVal.length < 8 && PassVal.length > 0 ){PassMSG.current.innerHTML = "Password Must Be More than 8 Characters !" ;}
else{PassMSG.current.innerHTML = ""}
},[PassVal])



    return (
<>
        <div className="Main">
<div className="w-64 h-fit bg-white bg-opacity-45 mt-24 rounded-xl flex flex-col ">
<p className="text-center text-xl font-bold mt-2">Welcome ! <br></br><p className="text-sm font-normal">type your information Here...</p></p>

<div className="flex w-8/12 h-10 ml-4 mt-8"> 
    <img src="img/user.svg" alt="" className="w-10 h-10"></img>
    <input type="text" placeholder="@username" className="border-b-4 border-lime-300 ml-2 pl-1 w-40" ref={user} ></input>
</div>

<div className="flex w-8/12 h-10 ml-4 mt-8"> 
    <img src="img/pass.svg" alt="" className="w-10 h-10"></img>
    <input type="password" placeholder="password" className="border-b-4 border-lime-300 ml-2 pl-1 w-40" ref={pass} onChange={()=>{setPassVal(pass.current.value)}}></input>
</div>


<div className="flex ml-6 mt-3">
    <input type="checkbox" ref={remind}></input>
    <label className="ml-1 text-black font-bold">Remind Me</label>
</div>

    <p className="text-xs text-red-600 font-semibold ml-2 mt-3" ref={PassMSG}></p>
<button className="mb-6 mt-4 w-28 h-10 self-center rounded-full text-xl bg-cyan-400" onClick={()=>{HandleLogin() ;}} ref={LoginBTN}>Login</button>
<Link to="../register"><p className="w-full m-0 text-center text-cyan-600 mb-1 underline">Create New Account</p></Link>
</div>

<BasicModal head="Login Alert"  body={AlertMSG} open ={open} Close = {handleClose}/>
</div>
<Loading show={isLoading}/>
</>
    );
  }
  
  
  export default Login;
  
  
  
  