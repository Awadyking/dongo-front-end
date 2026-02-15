import { Atom } from "react-loading-indicators"
export default function Loading({show}){
if(show === true){

return(
    <div className="w-full bg-slate-300 bg-opacity-50 flex justify-center items-center fixed top-0 h-screen z-50">
        <div className="w-48 h-48 bg-white rounded-md flex justify-center items-center">
        <Atom color="#32cd32" size="large" text="Loading..." textColor="#32cd32" />
        </div>
    </div>
)
}

else{return <></>}



}