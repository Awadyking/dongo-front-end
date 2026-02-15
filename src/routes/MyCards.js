import { useContext, useEffect, useState } from "react"
import Loading from "../components/Loading"
import {MainData} from "../logic/MainContext"
import SelectSmall from "../components/SelectSmall"
import axios from "axios"
import BasicModal from "../components/BasicModal"
import BankCard from "../components/Bank_Card"
import Modal from "../components/Modal"
import NewP from "../components/NewP"
export default function MyCards(){

    const {URL , USER} = useContext(MainData)
    let token = useContext(MainData).storage_token
    let newToken = useContext(MainData).normal_token
    const [isLoading , setisLoading] = useState()
    const [WArr , setWArr] = useState()
    const [open, setOpen] = useState(false); 
    const handleClose = () => {setOpen(false)};
    const [AlertMSG , setMSG] = useState("")
    const [data , SET_data] = useState([])
    const [Func , SET_Func] = useState("")
    const [Head , SET_Head] = useState("")
    const [show , SET_show] = useState(false)
    const [Value , SET_Value] = useState(()=>{return <></>})
    const [WID , SET_WID ] = useState("")
    const [Last , SET_Last] = useState(0)
    const [Name , SET_Name] = useState("")
    const [Expired , SET_Expired] = useState("")
    const [Bank, SET_Bank] = useState("")
    const [DelS , SET_Dels] = useState()
    const [openD, setOpenD] =useState(false);
    let GData = []
    const [FData , SET_FData ] = useState([])

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

function GetCards(v){
    setisLoading(true)
axios.get(URL + "/mycards/" + v + "/" + Xtoken)
.then((Res)=>{setisLoading(false) ; SET_data(Res.data) } ) 
.catch((err)=>{setisLoading(false) ; setMSG(err.response.data.msg) ;  setOpen(true);})
}

function Cards_Modal_Config(type){
      if(WID !== ""){
        switch(type){
    case("Add") : 
    SET_Head("Add New Card !") ;
    SET_Value(()=>{
        return <div className="flex flex-col justify-evenly w-full h-full items-center">
        <div className="mt-3 flex justify-between items-center w-72">
          <label className="text-sm text-nowrap font-medium">Name : </label>
          <input className="w-36 h-10 border-2  pl-2 border-gray-500 " type="text" onChange={(e)=>{ SET_Name(e.target.value);} } />
        </div>
    
        <div className="mt-3 flex justify-between items-center w-72">
          <label className="text-sm text-nowrap font-medium">Expired : </label>
          <input className="w-36 h-10 border-2  pl-2 border-gray-500 " type="text" onChange={(e)=>{SET_Expired(e.target.value); }} />
        </div>

        <div className="mt-3 flex justify-between items-center w-72">
          <label className="text-sm text-nowrap font-medium">Bank : </label>
          <input className="w-36 h-10 border-2  pl-2 border-gray-500 " type="text" onChange={(e)=>{SET_Bank(e.target.value);}} />
        </div>

        <div className="mt-3 flex justify-between items-center w-72 mb-6">
          <label className="text-xs text-nowrap font-medium">Last 4 Numbers : </label>
          <input className="w-36 h-10 border-2  pl-2 border-gray-500 " type="number" onChange={(e)=>{SET_Last(e.target.value);} } />
        </div>

      </div>
    })
    SET_show(true) ; 
    break;

    case("Delete"):
    GData = []
    // eslint-disable-next-line
    data.map((i)=>{GData.push({WID : i.id , WName : i.name})})
    SET_Head("Delete Card!") ;
    SET_Value(()=>{
        return <div className="flex flex-col justify-evenly w-full h-full items-center">
        <div className="mt-3 flex justify-between items-center w-72">
          <label className="text-sm text-nowrap font-medium">Card : </label>
          <SelectSmall wallets={GData} handle={(v)=>{SET_Dels(v)}} label="Card"/>
        </div>    
      </div>
    })
    SET_show(true) ; 

    break;
    case("Proc"):
    GData = []
    // eslint-disable-next-line
    data.map((i)=>{GData.push({name : i.name , value : i.id})})
    SET_FData(GData)
    setOpenD(true)
    break;
    default : 
    setMSG("UNKNOWN ERROR !")
    setOpen(true)
  }

}else{
setMSG("Please Select The Wallet !"); 
setOpen(true)
}
}

function Modal_Save(type , y){
  let config = { headers: { Authorization: `Bearer ${Xtoken}` } }
  switch(type){
    case("Add"):
    setisLoading(true)
    let data = {
        name : Name ,
        expire : Expired , 
        bank : Bank , 
        last : Number(Last) , 
        WID : String(WID)
    }
    SET_show(false) ;
    axios.post(URL + "/new-card" , data  , config)
    .then((Res)=>{ 
        setisLoading(false)
        SET_show(false);
        setMSG(Res.data.msg)
        setOpen(true); 
        SET_show(false);
        window.location.reload();
    })
    .catch((err)=>{setisLoading(false);setMSG(err.response.data.msg) ; setOpen(true);})
    break;
    case("Delete"):
    setisLoading(true)
    let Ddata = {
        CID : Number(DelS) ,
        WID : String(WID)
    }
    SET_show(false) ;
    axios.post(URL + "/delete-card" , Ddata  , config)
    .then((Res)=>{ 
        setisLoading(false)
        SET_show(false);
        setMSG(Res.data.msg)
        setOpen(true); 
        SET_show(false);
        window.location.reload();
    })
    .catch((err)=>{setisLoading(false);setMSG(err.response.data.msg) ; setOpen(true);})
    break;
case("Proc"):
  const {Title , Amount , Type, Card} = y
  let amount = Number(Amount) 
  if(Type === "b-Discount"){amount = 0 - Amount ;}
  let NewPdata = {
  data : {
    title : Title ,
    amount : amount ,
    type : Type
  } ,
  WID : String(WID) ,
  CID : Number(Card)
  }
  setOpenD(false)
  setisLoading(true)
  axios.post(URL + "/newproc" , NewPdata , config)
  .then((Res)=>{
  setisLoading(false) ;
  setMSG(Res.data.msg) ; 
  setOpen(true);
  window.location.reload();
  })
  .catch((err)=>{setisLoading(false) ; setMSG(err.response.data.msg) ;  setOpen(true);})
  
    break;
    default : 
    setMSG("UNKNOWN ERROR !")
    setOpen(true)
  }

}




// eslint-disable-next-line
useEffect(()=>{ GetWallets() } , [])


return(<div className="Main">
<div className="flex w-11/12 justify-start items-center border-b-2 border-b-slate-200 flex-wrap h-fit">
<SelectSmall wallets={WArr} handle={(v)=>{GetCards(v); SET_WID(v)}}/>
<button
        onClick={()=>{Cards_Modal_Config("Add"); SET_Func("Add")}}
        type="button"
        class="inline-block rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs 
        font-medium uppercase leading-normal text-white shadow-primary-3 transition 
        duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 
        focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 
        active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none
         dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong 
         dark:active:shadow-dark-strong">
        + New Card
    </button>
    <button
        type="button"
        onClick={()=>{Cards_Modal_Config("Proc"); SET_Func("Proc");}}
        class="inline-block rounded-full bg-info
         px-6 pb-2 pt-2.5 text-xs font-medium 
         uppercase leading-normal text-white shadow-info-3 
         transition duration-150 ease-in-out hover:bg-info-accent-300 
         hover:shadow-info-2 focus:bg-info-accent-300 focus:shadow-info-2 
         focus:outline-none focus:ring-0 active:bg-info-600 active:shadow-info-2
          motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong 
          dark:focus:shadow-dark-strong dark:active:shadow-dark-strong ml-4">
          + New Proccess 
        </button>
        <button
            type="button"
            onClick={()=>{Cards_Modal_Config("Delete"); SET_Func("Delete")}}
            class="inline-block rounded-full bg-danger px-6 pb-2 pt-2.5 text-xs font-medium
            uppercase leading-normal text-white shadow-danger-3 transition duration-150 ease-in-out
            hover:bg-danger-accent-300 hover:shadow-danger-2 focus:bg-danger-accent-300 focus:shadow-danger-2
            focus:outline-none focus:ring-0 active:bg-danger-600 active:shadow-danger-2 motion-reduce:transition-none
            dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong ml-4">
            Delete Card
</button>
</div>

<div className="w-11/12 flex justify-start mt-4 flex-wrap">

{data.map((i)=>{return <BankCard name={i.name} last={i.last} bank={i.bank} key={i.id} amount={i.amount} expired={i.expired}/>})}

</div>


<Modal show={show} head={Head} b1="Save" b2="Cancel" b2f={()=> {SET_show(false)}} 
b1f={()=>{Modal_Save(Func)}} body={Value}/>
<BasicModal head="Alert"  body={AlertMSG} open ={open} Close = {handleClose}/>
<NewP Open={openD} SClose={()=>{setOpenD(false)}} title="New Card Procsses" Handle={(Title , Amount , Type , Card)=>{Modal_Save("Proc" , {Title , Amount , Type , Card})}} Types={["b-Adding" , "b-Discount"]} S={FData} isID ={false}/> 
<Loading show={isLoading}/>
</div>)

}