function CheckTime(x){
    if(x < 10){return "0" + x}
    return String(x)
    
}
export default function SecPartyCard({data , sub}){

if(data.status){
return <div className="w-11/12 h-32 border-4 rounded-lg border-lime-700 bg-gray-300 flex items-center justify-between pt-2 pb-2 pl-4 mt-6">

<div className="w-9/12 flex flex-col h-fit">
<div className="w-full text-left lg:text-3xl xs:text-xl font-semibold font-serif h-10 flex">
{data.type === "Lending" ? <p>Lending To </p> :  <p>Borrow From </p>}
<div className="underline text-sky-700 ml-2">{data.name}</div>
 </div>
<div className="w-full text-left lg:text-md xs:text-xs">Created By @{data.createdBy}</div>
<div className="w-full text-left lg:text-md xs:text-xs">Created At {String(new Date(data.date).getFullYear()) + "-"  + CheckTime(new Date(data.date).getMonth() + 1) + "-" +CheckTime(new Date(data.date).getUTCDate())}</div>
</div>
<div className="w-3/12 flex flex-col h-full">
<div className="w-full text-center lg:text-lg font-semibold underline h-9 xs:text-md">Amount</div>
<div className="w-full text-center lg:text-lg xs:text-md text-purple-700 font-mono font-semibold">{data.amount}</div>
<div className="w-full flex justify-center">
<button
  onClick={()=>{sub(data._id)}}
  type="button"
  class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal
   text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2
    focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600
     active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong 
     dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
  Submit
</button>
</div>
</div>

</div>
}else{
    return <div className="w-11/12 grayscale h-32 border-4 rounded-lg border-lime-700 bg-gray-300 flex items-center justify-between pt-2 pb-2 pl-4 mt-6">

<div className="w-9/12 flex flex-col h-fit">
<div className="w-full text-left lg:text-3xl xs:text-xl font-semibold font-serif h-10 flex line-through">
{data.type === "Lending" ? <p>Lending To </p> :  <p>Borrow From </p>}
<div className="underline text-sky-700 ml-2">{data.name}</div>
 </div>
<div className="w-full text-left lg:text-md xs:text-xs">Created By @{data.createdBy}</div>
<div className="w-full text-left lg:text-md xs:text-xs">Created At {String(new Date(data.date).getFullYear()) + "-"  + CheckTime(new Date(data.date).getMonth() + 1) + "-" +CheckTime(new Date(data.date).getUTCDate())}</div>
</div>
<div className="w-3/12 flex flex-col h-full">
<div className="w-full text-center lg:text-lg font-semibold underline h-9 xs:text-md">Amount</div>
<div className="w-full text-center lg:text-lg xs:text-md text-purple-700 font-mono font-semibold">{data.amount}</div>
<div className="w-full flex justify-center">
<button
  type="button"
  class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal
   text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2
    focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600
     active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong 
     dark:focus:shadow-dark-strong dark:active:shadow-dark-strong" disabled={true}>
  Submit
</button>
</div>
</div>

</div>
}

}