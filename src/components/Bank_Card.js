export default function BankCard({bank , amount , expired , last , name}){

return(
<div className="w-48 h-28 border-2 border-black rounded-xl bg-sky-700 flex  flex-col pt-2 pb-2 mr-6">
    <div className="w-full text-left font-medium text-md h-6 text-white pl-4">{bank}</div>
    <div className=" h-6 justify-center text-center text-sm text-orange-300 font-light ">Card Name : {name}</div>
    <div className="w-full pl-3 pr-3 text-center text-white font-bold text-xs">●●●● ●●●● ●●●● {last}</div>
    <div className="w-full pl-3 pr-3 text-center text-white font-bold text-xs flex justify-between">
        <div className="">{expired}</div>
        <div className="">amount : {amount}</div>
    </div>
</div>
)



}