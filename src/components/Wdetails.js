import { Button } from "@mui/material"


export default function Wdetails({wa , func , btn}){


const data = [
    ["Total" , wa.amount],
    ["Total in Cards" , wa.amount - wa.cash] ,
    ["Cash Total" , wa.cash] , 
    ["Depts" , wa.dept] , 
    ["Condemnation" , 0 - wa.for] , 
    ["Target" , wa.goal]
]


return(
<div className="flex justify-between flex-wrap w-4/5 mt-5">
    {data.map((item , index)=>{
        return <div key={index} className="flex justify-evenly w-40 h-8 mb-3 items-center">
            <div className="font-bold text-sm text-nowrap">{item[0]} : </div>
            <div className="w-20 h-8 border-b-2 border-b-black bg-white bg-opacity-35 pl-1 font-bold text-lg text-yellow-700">{item[1]}</div>
        </div>
    })}
<div className="flex justify-center items-center w-full mt-4">
<Button variant="contained" size="large" onClick={func} disabled ={btn}>+ New</Button>
</div>
</div>
    )
}