import axios from "axios"
export default function Account(state , action){
const { SET_show , SET_Value ,
     SET_Func , SET_Head , URL , SET_USER ,
    USER, MSG, setisLoading ,
    setOpen, setMSG, Collected , SET_Collected ,
    Xtoken , IMG } = state

    let config = { headers: { Authorization: `Bearer ${Xtoken}` } }
switch(action){

case("pass"):
SET_Head("Changing Password !")
SET_Func("Go_pass")
SET_Value(()=>{
    return <div className="flex flex-col justify-evenly w-full h-full items-center">
    <div className="mt-3 flex justify-between items-center w-72">
      <label className="text-sm text-nowrap font-medium">Current Password : </label>
      <input className="w-36 h-10 border-2  pl-2 border-gray-500 " type="password" onChange={(e)=>{SET_Collected(Collected.cur_pass = e.target.value);} } />
    </div>

  
    <div className="mt-3 flex justify-between items-center w-72">
      <label className="text-sm text-nowrap font-medium">New Password :</label>
      <input className="w-36 h-10 border-2 pl-2 border-gray-500 " type="password"  onChange={(e)=>{SET_Collected(Collected.new_pass = e.target.value);} }   />
    </div>

    <div className="mt-3 flex justify-between items-center w-72 mb-7">
      <label className="text-sm text-nowrap font-medium">re-Password :</label>
      <input className="w-36 h-10 border-2 pl-2 border-gray-500 " type="password"   onChange={(e)=>{SET_Collected(Collected.re_new_pass = e.target.value);}} />
    </div>

    <p className="text-xs text-red-600 font-semibold ml-2 mt-3" ref={MSG}></p>
  </div>
})
SET_show(true) ; 
return(state)

case("Go_pass"):
if(Collected.new_pass.length < 8 && Collected.new_pass.length > 0 ){MSG.current.innerHTML = "Password Must Be More than 8 Characters !"}
else if(Collected.new_pass !== Collected.re_new_pass && Collected.re_new_pass !== ""){MSG.current.innerHTML = "You Must Type the same password again"}
else{
MSG.current.innerHTML = ""
setisLoading(true)
let data = {
username : USER.username , 
current_pass : Collected.cur_pass , 
new_pass : Collected.new_pass 
}

SET_show(false) ;
axios.post(URL + "/change-password" , data , config)
.then((Res)=>{ 
    setisLoading(false)
    setMSG(Res.data.msg)
    setOpen(true); 
    SET_USER(USER) 
    localStorage.setItem("user" , JSON.stringify(USER))

})
.catch((err)=>{setisLoading(false);setMSG(err.response.data.msg) ; setOpen(true);})

}
return(state)
case("img"):
SET_Head("Changing Profile Image !")
SET_Func("Go_img")
SET_Value(()=>{
    return <div className="flex flex-col justify-evenly w-full h-full items-center">
    <div className="mt-3 flex justify-between items-center w-72">
      <label className="text-sm text-nowrap font-medium">New Image: </label>
      <input className="w-36 h-10" type="file" ref={IMG}/>
    </div>
  </div>
})
SET_show(true)
return(state)

case("Go_img"):
let username = USER.username
let Form = new FormData()
Form.append("username" , username)
Form.append("img" , IMG.current.files[0])

SET_show(false) ;
setisLoading(true)
axios.post(URL + "/change-image" , Form , config)
.then((Res)=>{ 
    setisLoading(false)
    setMSG(Res.data.msg)
    setOpen(true); 
    let X= USER
    X.img = Res.data.img
      SET_USER(X) 
    localStorage.setItem("user" , JSON.stringify(X))
    window.location.reload()
})
.catch((err)=>{setisLoading(false);setMSG(err.response.data.msg) ; setOpen(true);})

return(state)

case("name"):
SET_Head("Changing Name !")
SET_Func("Go_name")
SET_Value(()=>{
    return <div className="flex flex-col justify-evenly w-full h-full items-center">
    <div className="mt-3 flex justify-between items-center w-72">
      <label className="text-sm text-nowrap font-medium">New Name : </label>
      <input className="w-36 h-10 border-2  pl-2 border-gray-500 " type="text" placeholder="New Name ..." onChange={(e)=>{SET_Collected(Collected.name = e.target.value);} } />
    </div>
  </div>
})
SET_show(true) ;

return(state)

case("Go_name"):
setisLoading(true)
let data = {
username : USER.username , 
name : Collected.name
}

SET_show(false) ;
axios.post(URL + "/change-name" , data  , config)
.then((Res)=>{ 
    setisLoading(false)
    setMSG(Res.data.msg)
    setOpen(true); 
    SET_USER(USER) 
    localStorage.setItem("user" , JSON.stringify(USER))
    window.location.reload()

})
.catch((err)=>{setisLoading(false);setMSG(err.response.data.msg) ; setOpen(true);})


return(state)

case("delete"):
SET_Head("Deleting Account !")
SET_Func("Go_delete")
SET_Value(()=>{
    return <div className="flex flex-col justify-evenly w-full h-full items-center">
    <div className="mt-3 flex justify-between items-center w-72">
      <label className="text-sm text-nowrap font-medium">Password : </label>
      <input className="w-36 h-10 border-2  pl-2 border-gray-500 " type="password"  onChange={(e)=>{SET_Collected(Collected.pass = e.target.value);} } />
    </div>
  </div>
})
SET_show(true) ;

return(state)
case("Go_delete"):
setisLoading(true)
let Del = {
username : USER.username ,
pass : Collected.pass , 
}
console.log(Del , config)
axios.post(URL + "/delete-account" , Del  , config)
.then(()=>{ 
    setisLoading(false) 
    localStorage.clear()
    window.location.reload()
})
.catch((err)=>{setisLoading(false);setMSG(err.response.data.msg) ; setOpen(true);})

return(state)

default : console.log("Unknown_Command")

}

}