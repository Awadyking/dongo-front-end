import React from "react"

export default function Modal({show , head , body , b1 , b2 , b1f , b2f}){

if(show === true){
return(
<div className="w-full bg-slate-500 bg-opacity-60 flex justify-center fixed top-0 h-full z-30">
    <div className="w-80 h-fit bg-white rounded-md mt-16 flex flex-col items-center">
        <div className="w-80 h-9 pl-2 text-left font-bold text-lg border-b-2 border-b-gray-400">{head}</div>
        <div className="w-80 h-fit min-h-28 border-b-2 border-b-gray-400">{body}</div>
        <div className="w-80 h-12 flex justify-end">
                <div className="w-40 flex pl-2 pr-2 justify-between items-center h-full text-sm font-bold text-white">
                        <button className="w-16 h-8 rounded-md bg-gray-400 hover:bg-gray-500" onClick={b2f}>{b2}</button>
                        <button className="w-16 h-8 rounded-md bg-sky-400 hover:bg-sky-500" onClick={b1f}>{b1}</button>
                </div>
        </div>
    </div>
</div>
)
}else{return(<div className="w-0 h-0 invisible"></div>)}
}