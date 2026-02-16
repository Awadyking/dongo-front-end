import { Link } from "react-router-dom";
import { useState , useRef, useEffect, useContext } from "react";
import {MainData} from "../logic/MainContext"
import axios from "axios"
import BasicModal from "../components/BasicModal";
import Loading from "../components/Loading"

function Register() {
    const user = useRef("")
    const pass = useRef("")
    const name = useRef("")
    const color = useRef("")
    const passConfirm = useRef("")
    const MSG = useRef("")
    const img = useRef()
    let {URL} = useContext(MainData)


    const [isLoading , setisLoading] = useState(false)
    const [AlertMSG , setMSG] = useState("")
    const [open, setOpen] = useState(false); 
    const [Log_Status , setLog] = useState(false)

    const handleClose = () => {
    setOpen(false)
    if(Log_Status === true){window.location.href = "/"}
    };

    function HandleReg(){
    let userV = user.current.value
    let passV = pass.current.value
    let nameV = name.current.value
    let colorV = String(color.current.value)
    let imgV = img.current.files[0]
    if(userV === "" || passV === "" || nameV === ""){MSG.current.innerHTML = "Please Don't keep Any Thing Empty !";}
    else{

    let Form = new FormData()
    Form.append("name" , nameV)
    Form.append("pass" , passV)
    Form.append("username" , userV)
    Form.append("color" , colorV)
    Form.append("img" , imgV)
let config = {
    headers:{'Content-Type':'multipart/form-data'}
}
setisLoading(true)
    axios.post(URL + "/register" , Form , config)
    .then((Res)=>{setisLoading(false); setMSG(Res.data.msg) ; setOpen(true) ; setLog(true)})
    .catch((err)=>{console.log(err);setisLoading(false) ;setMSG(err.response.data.msg) ; setOpen(true);})
}
    }

const [PassVal , setPassVal] = useState("")
const [PassConfirmVal , setPassConfirmVal] = useState("")


useEffect(()=>{
    if(PassVal.length < 8 && PassVal.length > 0 ){MSG.current.innerHTML = "Password Must Be More than 8 Characters !"}
    else if(PassVal !== PassConfirmVal && PassConfirmVal !== ""){MSG.current.innerHTML = "You Must Type the same password again"}
    else{MSG.current.innerHTML = ""}
},[PassVal , PassConfirmVal])

    
        return (
<>
    <div className="Main">
    <div className="w-64 h-fit mb-7 bg-white bg-opacity-45 mt-16 rounded-xl flex flex-col">
    <p className="text-center text-xl font-bold mt-2">Welcome ! <br></br><p className="text-sm font-normal">type your information Here...</p></p>

    <div className="flex w-8/12 h-10 ml-4 mt-8">
        <img src="img/user.svg" alt="" className="w-10 h-10"></img>
        <input 
        type="text"
         placeholder="@username" 
         className="border-b-4 border-lime-300 ml-2 pl-1 w-40" 
         ref={user}
         ></input>
    </div>


    <div className="flex w-8/12 h-10 ml-4 mt-8">
        <img src="img/user.svg" alt="" className="w-10 h-10"></img>
        <input 
        type="text" 
        placeholder="Name" 
        className="border-b-4 border-lime-300 ml-2 pl-1 w-40" 
        ref={name}
        ></input>
    </div>


    <div className="flex w-8/12 h-10 ml-4 mt-8">
        <img src="img/pass.svg" alt="" className="w-10 h-10"></img>
        <input 
        type="password" 
        placeholder="password" 
        ref={pass}
        className="border-b-4 border-lime-300 ml-2 pl-1 w-40"
        onChange={()=>{setPassVal(pass.current.value)}} 
        ></input>
    </div>



    <div className="flex w-8/12 h-10 ml-4 mt-8">
        <img src="img/pass.svg" alt="" className="w-10 h-10"></img>
        <input 
        type="password" 
        ref={passConfirm}
        placeholder="re-password" 
        className="border-b-4 border-lime-300 ml-2 pl-1 w-40"
        onChange={()=>{setPassConfirmVal(passConfirm.current.value)}} 
        ></input>
    </div>

    <div className="flex w-8/12 h-10 ml-4 mt-8">
        <img src="img/color.svg" alt="" className="w-10 h-10"></img>
        <input 
        type="color" 
        ref={color}
        placeholder="Chart-Color" 
        className="border-b-4 border-lime-300 ml-2 pl-1 w-64 h-10"
        ></input>
    </div>



    <div className="flex flex-col ml-6 mt-4">
        <label>Upload Profile Image</label>
        <input type="file" ref={img}></input>
    </div>
    <p className="text-xs text-red-600 font-semibold ml-2 mt-3" ref={MSG}></p>
    <button className="mb-3 mt-4 w-28 h-10 self-center rounded-full text-xl bg-cyan-400" onClick={HandleReg}>Register</button>
    <Link to="../login"><p className="w-full m-0 text-center text-cyan-600 mb-1 underline">Do Yo have An Account ? Login</p></Link>
    </div>
    <BasicModal head="Login Alert"  body={AlertMSG} open ={open} Close = {handleClose}/>
            </div>
            <Loading show={isLoading}/>
            </>
        );
      }
      
      export default Register;
      
      
      
      