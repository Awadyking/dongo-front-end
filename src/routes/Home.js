import { useContext, useEffect, useState } from "react"
import Loading from "../components/Loading"
import {MainData} from "../logic/MainContext"
import SelectSmall from "../components/SelectSmall"
import axios from "axios"
import TextField from '@mui/material/TextField';
import BasicModal from "../components/BasicModal"
import ProcTable from "../components/ProcTable"
import Wdetails from "../components/Wdetails"
import NewP from "../components/NewP"

function Home() {


const [isLoading , setisLoading] = useState()
const [WArr , setWArr] = useState()
const [open, setOpen] = useState(false); 
const [openD, setOpenD] =useState(false);

const handleClose = () => {setOpen(false)};
const [AlertMSG , setMSG] = useState("")
const [TType , setTType] = useState()
const [Tdata , setTdata] = useState()
const [NewBtn , setNewBtn] = useState(true)
const [data , setData] = useState([])
const [Wallet , setWallet] = useState({
  "proc": [],
  "users": [],
  "amount": 0,
  "dept": 0,
  "for": 0,
  "cash": 0,
  "goal": 0
})


let token = useContext(MainData).storage_token
let newToken = useContext(MainData).normal_token
const { Time , Expire ,  USER} = useContext(MainData)
let Link = useContext(MainData).URL


if(Time >= Expire && token === ""){
  localStorage.removeItem("Ntoken")
  localStorage.removeItem("user")
  localStorage.removeItem("Expire")
}

if(token === "" && newToken === ""){window.location.href = "/login"} ;



let Xtoken ;
if(token === ""){Xtoken = newToken}
else{Xtoken = token}


function GetWallets(){
setisLoading(true)
axios.get(Link  + "/status/" + USER.username + "/" + Xtoken )
.then(()=>{

axios.get(Link + "/mywallets/" + Xtoken)
.then((Res)=>{setWArr(Res.data); setisLoading(false)})
.catch((err)=>{setisLoading(false) ; setMSG(err.response.data.msg) ;  setOpen(true);})
setTType("start") ; 

})
.catch(()=>{
  setisLoading(false) 
  localStorage.clear()
})


}


function NewProc(Title , Amount , Type){
let WID = Wallet._id
let amount = Number(Amount)
if(Type === "Discount" || Type === "Lending"){amount = 0 - Amount}

let NewPdata = {
data : {
  title : Title ,
  amount : amount ,
  type : Type
} ,
WID : WID ,
}
let config = { headers: { Authorization: `Bearer ${Xtoken}` } }
setOpenD(false)
setisLoading(true)
axios.post(Link + "/newproc" , NewPdata , config)
.then((Res)=>{
setisLoading(false) ;
setMSG(Res.data.msg) ; 
setOpen(true);
GetWallets()
GetProc(WID)
})
.catch((err)=>{setisLoading(false) ; setMSG(err.response.data.msg) ;  setOpen(true);})

}




function GetProc(id){
setisLoading(true)
  axios.get(Link + "/proc/"+ id +"/"+ Xtoken )
 .then((Res)=>{
   setisLoading(false)
   setTType("API")
   setNewBtn(false)
   setData(Res.data.curWallet.proc)
if(Res.data.curWallet.proc.length === 0){setTdata("")}
else{setTdata(Res.data.curWallet.proc.reverse())}
setWallet(Res.data.curWallet)
  })
 .catch((err)=>{setisLoading(false) ; setMSG(err.response.data.msg) ;  setOpen(true);})
}

// eslint-disable-next-line
useEffect(()=>{ GetWallets() } , [])


function Search(x){
// eslint-disable-next-line
if(data != []){
  if(x[0] + x[1] + x[2] === "id:"){
    setTdata(data.filter((item) => {return item.id === Number(x.replace("id:" , ""))}))
  }
  
  else if(x[0] + x[1] + x[2] + x[3] + x[4] === "user:"){
    setTdata(data.filter((item) => {return item.user.includes(x.replace("user:" , ""))}))
  }

  else{
    setTdata(data.filter((item) => {return item.title.includes(x)}))
  }
}
}

function CheckTime(x){
  if(x < 10){return "0" + x}
  return String(x)
  
}


function SearchByDate(x){
// eslint-disable-next-line
if(data != []){
let c = data.filter((i)=>{
var date = String(new Date(i.date).getFullYear()) + "-"  + CheckTime(new Date(i.date).getMonth() + 1) + "-" +CheckTime(new Date(i.date).getUTCDate())
return(date === x)
})

setTdata(c)
}

if(x === ""){setTdata(data)}

}



  return (
    
    <>
    <div className="App ">
      <div className="w-4/5 flex flex-wrap justify-evenly mb-4">
              <SelectSmall  wallets={WArr} handle={(v)=>{GetProc(v)}}/>

              <TextField id="outlined-basic" type="search" label="Search by Title" variant="filled"
              className="w-48" size="small" onChange={(e)=>{Search(e.target.value)}}/>

              <TextField id="outlined-basic" type="date" label="date" variant="filled" 
              className="w-32" size="small" onChange={(e)=>{SearchByDate(e.target.value)}} />
      </div>
      <div className="w-11/12 h-72 bg-white bg-opacity-45 rounded-md overflow-y-auto" >
          <ProcTable type={TType} data={Tdata}/>
      </div>
      <Wdetails wa={Wallet} func={()=>{setOpenD(true)}} btn={NewBtn} />
      <BasicModal head="Alert"  body={AlertMSG} open ={open} Close = {handleClose}/>
      <NewP Open={openD} SClose={()=>{setOpenD(false)}} title="New Procces" Handle={NewProc} ID={data.length} /> 
    </div>
    <Loading show={isLoading}/>
    </>
   
  );
}

export default Home;


