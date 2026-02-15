import React , {createContext , useState} from "react"
const MainData = createContext()
function MainProvider({children}){


// eslint-disable-next-line
const [storage_token , SET_storage_token ] = useState(localStorage.getItem("token") ?? "")
// eslint-disable-next-line
const [normal_token , SET_normal_token ] = useState(localStorage.getItem("Ntoken") ?? "")
const URL = "http://local.dongo-api.js/"
const Expire = localStorage.getItem("Expired") ?? ""
// eslint-disable-next-line
const [USER , SET_USER ] = useState(JSON.parse(localStorage.getItem("user")) ?? "")

let MainValue = {
storage_token , 
normal_token , 
URL , 
Expire ,  
USER , 
SET_storage_token , 
SET_normal_token ,
SET_USER , 

}



return(
<MainData.Provider value={MainValue}>
                {children}
</MainData.Provider>
)}



export {MainData , MainProvider}
