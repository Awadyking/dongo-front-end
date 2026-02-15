import {Link} from "react-router-dom"


export default function WalletCard({title , WID}){
return(<div className="w-32 h-24 border-2 rounded-lg border-lime-700 bg-gray-300 flex flex-col items-center justify-between pt-2 pb-2 mr-4">
<Link to={`/mywallets/${WID}`}>
<div className="w-full text-center font-bold underline text-sky-700 text-lg">{title}</div>
</Link>

<div className="text-xs font-medium font-serif text-gray-600"> WID : {WID}</div>

</div>)




}