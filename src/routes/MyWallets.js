import WalletCard from "../components/WalletCard";
import { useContext, useEffect, useReducer, useState } from "react"
import Loading from "../components/Loading"
import {MainData} from "../logic/MainContext"
import axios from "axios"
import BasicModal from "../components/BasicModal"
import Modal from "../components/Modal";
import Wallets_Manage from "../logic/Wallets_Managing";


export default function MyWallets(){
    let token = useContext(MainData).storage_token
    let newToken = useContext(MainData).normal_token
    const {URL , USER , SET_USER} = useContext(MainData)

    if(token === "" && newToken === ""){window.location.href = "/login"} ;

    let Xtoken ;
    if(token === ""){Xtoken = newToken}
    else{Xtoken = token}
    
    const [Head , SET_Head] = useState("")
    const [show , SET_show] = useState(false)
    const [Func , SET_Func] = useState("")
    const [Value , SET_Value] = useState(()=>{return <></>})
    const [isLoading , setisLoading] = useState(false)
    const [AlertMSG , setMSG] = useState("")
    const [open, setOpen] = useState(false); 
    const [data , setData] = useState([])
    const [Collected , SET_Collected] = useState({})
    
    function GetWallets(){
    setisLoading(true)
    axios.get(URL  + "/status/" + USER.username + "/" + Xtoken )
    .then(()=>{
    axios.get(URL + "/mywallets/" + Xtoken)
    .then((Res)=>{setisLoading(false) ; setData(Res.data)})
    .catch((err)=>{setisLoading(false) ; setMSG(err.response.data.msg) ;  setOpen(true);})
    })
    .catch(()=>{
      setisLoading(false) 
      localStorage.clear()
    })
}

// eslint-disable-next-line
const [state , dispatch ] = useReducer(Wallets_Manage , {Collected , SET_Collected ,
   Xtoken , SET_USER, USER , SET_show , SET_Value , SET_Func , SET_Head ,setData ,URL ,
    setisLoading , setOpen , setMSG , GetWallets})   



// eslint-disable-next-line
useEffect(()=>{ GetWallets() } , [])

return(<div className="Main">
<div className="flex w-11/12 justify-start items-center border-b-2 border-b-slate-200">
        <div className="flex justify-evenly h-16 items-center w-5/12">
        <button
        onClick={()=>{dispatch("new")}}
        type="button"
        class="inline-block rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs 
        font-medium uppercase leading-normal text-white shadow-primary-3 transition 
        duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 
        focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 
        active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none
         dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong 
         dark:active:shadow-dark-strong">
        + New Wallet
        </button>

        <button
        type="button"
        onClick={()=>{dispatch("join")}}
        class="inline-block rounded-full bg-info
         px-6 pb-2 pt-2.5 text-xs font-medium 
         uppercase leading-normal text-white shadow-info-3 
         transition duration-150 ease-in-out hover:bg-info-accent-300 
         hover:shadow-info-2 focus:bg-info-accent-300 focus:shadow-info-2 
         focus:outline-none focus:ring-0 active:bg-info-600 active:shadow-info-2
          motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong 
          dark:focus:shadow-dark-strong dark:active:shadow-dark-strong ml-3">
         Join
        </button>

        </div>
</div>

<div className="w-11/12 flex justify-start mt-4">

{data.map((i)=>{return <WalletCard title={i.WName} WID={i.WID} key={i.WID}/>})}


</div>



<BasicModal head="Alert"  body={AlertMSG} open ={open} Close = {()=>{setOpen(false)}}/>
<Modal show={show} head={Head} b1="Save" b2="Cancel" b2f={()=> SET_show(false)} b1f={()=>{dispatch(Func)}} body={Value}/>
<Loading show={isLoading}/>
</div>)

}