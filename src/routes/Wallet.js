/* eslint-disable */
import axios from "axios";
import { useContext, useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import { MainData } from "../logic/MainContext";
import Loading from "../components/Loading"
import BasicModal from "../components/BasicModal";
import Chart from "../components/Charts"
import Compile_Chart from "../logic/Compile_Chart";
import User_Compile from "../logic/User_Compile";
import { TextField } from "@mui/material";
import SelectSmall from "../components/SelectSmall";
import {Week} from "../logic/Charts_Skeleton"

export default function Wallet(){

let {WID} = useParams()
let token = useContext(MainData).storage_token
let newToken = useContext(MainData).normal_token
const {URL} = useContext(MainData)


if(token === "" && newToken === ""){window.location.href = "/login"} ;
let Xtoken ;
if(token === ""){Xtoken = newToken}
else{Xtoken = token}

const [isLoading , setisLoading] = useState(false)
const [AlertMSG , setMSG] = useState("")
const [open, setOpen] = useState(false); 
const [data , setData] = useState({users : []})
const [CType , SET_CType] = useState(null);
const [Custom , SET_Custom] = useState("hidden");
const [Filter , SET_Filter] = useState(null);
const [From , SET_From] = useState(null);
const [To , SET_To] = useState(null);

// eslint-disable-next-line
useEffect(()=>{
// eslint-disable-next-line
axios.get(URL + "/wallet/" + WID + "/" + Xtoken)
// eslint-disable-next-line
.then((Res)=>{setisLoading(false) ; setData(Res.data) ;})
// eslint-disable-next-line
.catch((err)=>{setisLoading(false) ; setMSG(err.response.data.msg) ;  setOpen(true);})
// eslint-disable-next-line
} , [])


function DWallet(){
    setisLoading(true)
    const config = { headers: { Authorization: `Bearer ${Xtoken}` } }
    const Ndata = {
        WID : String(WID)
    }
    axios.post(URL + "/delete-wallet" , Ndata , config)
    .then((Res)=>{ 
        setisLoading(false)
        setMSG(Res.data.msg)
        setOpen(true); 
    })
    .catch((err)=>{setisLoading(false);setMSG(err.response.data.msg) ; setOpen(true);})
    


}



return(
<div className="Main">
<div className="mt-2 font-bold text-center w-11/12 text-xl border-b-2 border-gray-100 h-11">General</div>
<div className="mt-3 flex w-full flex-col h-fit">
        <p className="text-lg font-sans font-medium w-full text-center text-stone-700" onClick={()=>console.log(Week())}>Amount</p>
        <p className="text-5xl font-sans font-medium w-full text-center text-indigo-800 mt-2">{data.amount}</p>
</div>
<div className="mt-7 font-bold text-center w-11/12 text-xl border-b-2 border-t-2 border-gray-100 h-12">Users</div>

<div className="mt-3 flex w-11/12 justify-center items-center min-h-20">

<div className="flex flex-col w-1/3 ">
    {data.users.map((i , index)=>{return <div key={index} className="text-lg font-semibold w-6/12 h-6 justify-between flex">{i}<p>{"=>>"}</p></div>})}
</div>

<div className="flex flex-col w-1/4 justify-center">
    {User_Compile(data).map((i , index)=>{return <div key={index} className="text-lg font-semibold w-6/12 h-6 flex text-primary-600">{Math.floor(i / data.amount * 100)} % </div>})}
</div>
</div>

<div className="mt-4 font-bold text-center w-11/12 text-xl border-b-2 border-t-2 border-gray-100 h-12">Data Charts</div>
{/* <div className="flex w-11/12 justify-evenly mt-2 grayscale">
<SelectSmall disabled={true} label="Type"  wallets={[{WID : false , WName: "Wallet" } , {WID : true , WName : "Users"}]} handle={(v)=>{SET_CType(v)}}/>

<SelectSmall disabled={true} label="Chart Time"  wallets={[{WID : "today" , WName: "Today" } ,
                                            {WID : "week" , WName : "Last Week"} , 
                                            {WID:"month" , WName : "Last Month"} , 
                                            {WID : "custom" , WName : "Custom"}]}
                                             handle={(v)=>{SET_Filter(v) ; 
                                                if(v === "custom"){SET_Custom("visible")}
                                                else{SET_Custom("hidden")}
                                             }}/>

<TextField id="outlined-basic" type="date" label="From" variant="filled" style={{visibility : Custom}}
              className="xs:w-24 lg:w-32" size="small" onChange={(e)=>{SET_From(new Date(e.target.value))}} />

<TextField id="outlined-basic" type="date" label="To" variant="filled"  style={{visibility : Custom}}
              className="xs:w-24 lg:w-32" size="small" onChange={(e)=>{SET_To(new Date(e.target.value))}}/>
</div> */}

<Chart data={Compile_Chart(data , CType , From , To , Filter)} show={CType} show2={Filter} />
<div className="mt-6 font-bold text-center w-11/12 text-xl border-b-2 border-t-2 border-gray-100 h-12">Deleting Wallet</div>
<button className=" h-10 text-red-600 font-bold rounded-lg bg-gray-200 hover:bg-gray-300 
text-lg w-48 xs:h-10 lg:h-14 mb-6 mt-5" onClick={()=>{DWallet()}}>Logout from Wallet</button>
<BasicModal head="Alert"  body={AlertMSG} open ={open} Close= {()=>{setOpen(false) ; window.location.reload()}}/>
<Loading show={isLoading}/>
</div>)


}

/* eslint-disable */