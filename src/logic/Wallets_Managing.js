import axios from "axios";

export default function Wallets_Manage(state , action){
    const {Collected , SET_Collected , 
           Xtoken ,USER , SET_show , SET_Value , SET_USER ,
           SET_Func , SET_Head , URL , setisLoading , setOpen ,
           GetWallets , setMSG , z, setZ} = state



    let config = { headers: { Authorization: `Bearer ${Xtoken}` } }

switch(action){

case("new"):
SET_Head("Create New Wallet") ;
SET_Func("Go_new") ;
SET_Value(()=>{
    return <div className="flex flex-col justify-evenly w-full h-full items-center">
    <div className="mt-3 flex justify-between items-center w-72">
      <label className="text-sm text-nowrap font-medium">The Wallet Name: </label>
      <input className="w-36 h-10 border-2  pl-2 border-gray-500 " type="text" onChange={(e)=>{SET_Collected(Collected.WName = e.target.value);} } />
    </div>

    <div className="mt-3 flex justify-between items-center w-72">
      <label className="text-sm text-nowrap font-medium">The Wallet Target: </label>
      <input className="w-36 h-10 border-2  pl-2 border-gray-500 " type="number" onChange={(e)=>{SET_Collected(Collected.WTarget = e.target.value);} } />
    </div>
  </div>
})
SET_show(true) ; 
return state


case("Go_new"):

 if(z !== 0){GetWallets(); return state;}
setisLoading(true)
let data = {
title : Collected.WName , 
goal : Number(Collected.WTarget)
}
SET_show(false);
axios.post(URL + "/create-wallet" , data , config)
.then((Res)=>{ 
  setZ(1)
    setisLoading(false) ;
    setMSG(Res.data.msg);
    setOpen(true);
    GetWallets()
})
.catch((err)=>{setisLoading(false);setMSG(err.response.data.msg) ; setOpen(true);})

return state


case("join"):
SET_Head("Join The Wallet Wallet") ;
SET_Func("Go_join") ;
SET_Value(()=>{
    return <div className="flex flex-col justify-evenly w-full h-full items-center">
    <div className="mt-3 flex justify-between items-center w-72">
      <label className="text-sm text-nowrap font-medium">The Wallet ID (WID): </label>
      <input className="w-36 h-10 border-2  pl-2 border-gray-500 " type="text" onChange={(e)=>{SET_Collected(Collected.WID = e.target.value);} } />
    </div>
  </div>
})
SET_show(true) ; 
return state

case("Go_join"):

setisLoading(true)
let Ndata = {
 
WID : Collected.WID
}

SET_show(false) ;
axios.post(URL + "/join-wallet" , Ndata , config)
.then((Res)=>{ 
    setisLoading(false)
    setMSG(Res.data.msg)
    setOpen(true); 
    SET_USER(USER) 
    localStorage.setItem("user" , JSON.stringify(USER))
    window.location.reload()

})
.catch((err)=>{setisLoading(false);setMSG(err.response.data.msg) ; setOpen(true);})

return state
default : 
return state

}
}