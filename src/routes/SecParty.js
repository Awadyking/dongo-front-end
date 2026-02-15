import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useContext, useState , useEffect} from "react"
import Modal from "../components/Modal"
import { MainData } from "../logic/MainContext"
import axios from "axios"
import Loading from "../components/Loading"
import BasicModal from "../components/BasicModal"
import SelectSmall from "../components/SelectSmall"
import SecPartyCard from "../components/SecPartyCard"
export default function SecParty(){

    const [Head , SET_Head] = useState("")
    const [show , SET_show] = useState(false)
    const [Value , SET_Value] = useState(()=>{return <></>})
    const [Name , SET_Name] = useState("")
    const [Amount , SET_Amount] = useState(0)
    const [Type , setType] =useState("")
    const [isLoading , setisLoading] = useState()
    const [AlertMSG , setMSG] = useState("")
    const [WArr , setWArr] = useState()
    const [open, setOpen] = useState(false); 
    const [WID , SET_WID ] = useState(undefined)
    const [data , SET_data ] = useState([])
    let token = useContext(MainData).storage_token
    let newToken = useContext(MainData).normal_token
    let {URL , USER} = useContext(MainData)

    let Xtoken ;
    if(token === ""){Xtoken = newToken}
    else{Xtoken = token}

    function GetWallets(){
        setisLoading(true)
        axios.get(URL + "/status/" + USER.username + "/" + Xtoken )
        .then(()=>{
        axios.get(URL + "/mywallets/" + Xtoken)
        .then((Res)=>{setWArr(Res.data); setisLoading(false)})
        .catch((err)=>{setisLoading(false) ; setMSG(err.response.data.msg) ;  setOpen(true);})
        })
        .catch(()=>{
          setisLoading(false) 
          localStorage.clear()
          window.location.reload()
        })
        }

    // eslint-disable-next-line
useEffect(()=>{ GetWallets() } , [])


    function Cards_Modal_Config(){
    if(WID !== undefined){
      SET_Head("Create New Second Party !") ;
      SET_Value(()=>{
          return <div className="flex flex-col justify-evenly w-full h-full items-center">


    <FormControl sx={{ m: 1, minWidth: 224 }} size="">   
        <TextField id="outlined" label="Name"  className="w-56" onChange={(e)=>{SET_Name(e.target.value)}}/>
      </FormControl>

          <FormControl sx={{ m: 1, minWidth: 224 }} size="">    
        <TextField id="outlined" label="Amount"  type='number' className="w-56" onChange={(e)=>{SET_Amount(Number(e.target.value))}}/>
    </FormControl>
  
          <FormControl sx={{ m: 1, minWidth: 224 }} size="">
      <InputLabel id="demo-select-small-label">Type :</InputLabel>
      <Select labelId="demo-select-small-label" id="demo-select-small" label="Type" className="w-56" onChange={(e)=>{setType(e.target.value)}}>
     <MenuItem value={"Lending"} >Lending</MenuItem>
     <MenuItem value={"Borrow"}>Borrow</MenuItem>
      </Select>
    </FormControl>
  
        </div>
      })
      SET_show(true) ; 

    }else{
        setMSG("Select The Wallet First !");
        setOpen(true);
    }
  }

function Save(){
    let a = 0
if(Type === "Lending"){a = 0-Amount}
else{a = Amount}
const config = { headers: { Authorization: `Bearer ${Xtoken}` } }
let Cdata = {
    name : Name ,
    amount : a , 
    type : Type ,
    WID: String(WID) ,
}

setisLoading(true)
axios.post(URL + "/create-sec-party" , Cdata , config)
.then((Res)=>{
setisLoading(false) ;
setMSG(Res.data.msg) ; 
setOpen(true);
GetParty(WID)
SET_show(false)
})
.catch((err)=>{setisLoading(false) ; setMSG(err.response.data.msg) ;  setOpen(true);})


}


function Submit(SID){
const config = { headers: { Authorization: `Bearer ${Xtoken}` } }
let Cdata = {
    SID : String(SID) ,
    WID: String(WID) ,
}

setisLoading(true)
axios.post(URL + "/submit-sec-party" , Cdata , config)
.then((Res)=>{
setisLoading(false) ;
setMSG(Res.data.msg) ; 
setOpen(true);
GetParty(WID)
SET_show(false)
})
.catch((err)=>{setisLoading(false) ; setMSG(err.response.data.msg) ;  setOpen(true);})


}


function GetParty(v){
setisLoading(true)
axios.get(URL + `/sec-parties/${v}/${ Xtoken}`)
    .then((Res)=>{
    setisLoading(false) ;
    SET_data(Res.data.data)
    })
    .catch((err)=>{setisLoading(false) ; setMSG(err.response.data.msg) ;  setOpen(true);})
}





    return <div className="Main">

<div className="flex w-11/12 h-16 justify-start items-center border-b-2 border-b-slate-200">
<SelectSmall wallets={WArr} handle={(v)=>{GetParty(v) ; SET_WID(v)}}/>
<button
        onClick={()=>{Cards_Modal_Config()}}
        type="button"
        class="inline-block rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs 
        font-medium uppercase leading-normal text-white shadow-primary-3 transition 
        duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 
        focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 
        active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none
         dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong 
         dark:active:shadow-dark-strong">
        + New Second Party
    </button>
</div>


{data.map((i)=>{
    return  <SecPartyCard data={i} sub={(x)=>{Submit(x)}}/>
})}

<BasicModal head="Alert"  body={AlertMSG} open ={open} Close = {()=>{setOpen(false)}}/>
<Loading show={isLoading}/>
<Modal show={show} head={Head} b1="Save" b2="Cancel" b2f={()=> {SET_show(false)}} 
b1f={()=>{Save()}} body={Value}/>
    </div>
}