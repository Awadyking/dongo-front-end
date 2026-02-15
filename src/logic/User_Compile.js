export default function User_Compile(data){
let Arr = []
if(data !== undefined || data.length !== 0){
for(let user of data.users){
    var total = 0
    for(let p of data.proc){
        if(user === p.username){
            total = total + p.amount
        }
    }
Arr.push(total)
}
}

return(Arr)
}