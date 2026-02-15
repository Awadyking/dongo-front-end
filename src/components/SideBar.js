
import {Link} from "react-router-dom"


function SideBar(){


let El = [
    ["My Profile" , "/profile"],
    ["My Wallets" , "/mywallets"],
    ["My Cards" , "/cards"],
    ["Second Party", "/second-party"],
] 

let ShowEl = El.map((i , id)=>{
return (
    <Link to={i[1]} key={id}>
        <span  className="flex justify-between pl-2 pr-2">
                <div>{"<"}</div>
                <div>{i[0]}</div>
        </span>
    </Link>
)
})


return(
    <div className="SideBar" id="SideBar">
    {ShowEl}
    </div>
)
}


export default SideBar