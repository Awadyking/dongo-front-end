export default function ProcTable({type , data}){
if(type === "API"){
if(data === ""){
    return  <div className="flex w-full h-72 justify-center items-center"><p className="font-bold text-xl">No Proccsses Found !</p></div>
}else{
    function CheckTime(x){
        if(x < 10){return "0" + x}
        return String(x)
        
    }
   
function CheckHours(x){
    let H = new Date(x).getHours()
   if( H > 12){return CheckTime(H - 12) + ":"  + CheckTime(new Date(x).getMinutes()) + " PM"}
    else{return CheckTime(H) + ":"  + CheckTime(new Date(x).getMinutes()) + " AM"}    
}


function Color(x , y){
switch(y){
case("amount"):
if(x < 0){return <p className="text-red-500">{x}</p>}
else{return <p className="text-green-500">+{x}</p>}


case("type"):
if(x === "Adding"){return <p className="text-green-700">Adding</p>}
else if (x === "Discount"){return <p className="text-red-700">Discount</p>}
else if(x === "Borrow"){return <p className="text-sky-800">Borrow</p>}
else if(x === "Lending"){return <p className="text-fuchsia-800">Lending</p>}
else if(x === "b-Adding"){return <p className="text-amber-400">b-Adding</p>}
else if(x === "b-Discount"){return <p className="text-orange-600">b-Discount</p>}
else{return <p className="text-red-900">Error</p>}

default: return <p className="text-stone-700">UnKnown type</p>

}}





return <table className="w-full">
<thead className="w-full h-8 rounded-br-2xl rounded-bl-2xl bg-white  pl-1 pr-1 sticky top-0 text-center">
<tr>
    <td style={{width:"10%"}}>#ID</td>
    <td style={{width:"15%"}}>User</td>
    <td style={{width:"10%"}}>Type</td>
    <td style={{width:"30%"}}>Title</td>
    <td style={{width:"25%"}}>Date & Time</td>
    <td style={{width:"10%"}}>Amount</td>
</tr>
</thead>
<tbody >
{data.map((i)=>{return<tr className="text-center h-8 rounded-lg bg-slate-300 border-4 border-white" key={i.id}>
<td className="border-2 border-white">{i.id}</td>   
<td className="border-2 border-white">{i.user}</td>
<td className="border-2 border-white">{Color(i.type , "type")}</td>
<td className="border-2 border-white">{i.title}</td>
<td className="text-nowrap text-xs border-2 border-white">
{String(new Date(i.date).getFullYear()) + "-"  + CheckTime(new Date(i.date).getMonth() + 1) + "-" +CheckTime(new Date(i.date).getUTCDate())}
<br></br>
{CheckHours(i.date)}
</td>
<td className="border-2 border-white">{Color(i.amount , "amount")}</td>
    </tr>})
}

</tbody>
</table>

}
}
else if(type === "start"){
return  <div className="flex w-full h-72 justify-center items-center"><p className="font-bold text-xl">Please Select Wallet !</p></div>
}

}