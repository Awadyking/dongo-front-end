import { Today } from "./Charts_Skeleton"

function CheckTime(x){
  if(x < 10){return "0" + x}
  return String(x)
  
}
   
function CheckHours(x){
  let H = new Date(x).getHours()
 if( H > 12){return CheckTime(H - 12) + ":"  + CheckTime(new Date(x).getMinutes()) + " PM"}
  else{return CheckTime(H) + ":"  + CheckTime(new Date(x).getMinutes()) + " AM"}    
}


export default function Compile_Chart(data , all , from , to , Filter){
let exported_data = []
let current_date = new Date().getUTCDay()
switch(Filter){
case("today"):
exported_data = [Today(data.title , "#3acf7a")]
if(all){
exported_data = []

for(let user of data.users){
  var Y = Today(user , "")
  for(let x of data.proc){
    if(new Date(x.date).getUTCDay() === current_date && x.username === user){
      var D = 0
      for(let e of Y.data){
        if(new Date(x.date).getHours() > e.z){
          D = Y.data.indexOf(e)
        }
      }
      Y.data.splice(D , 0 , {
        x:CheckHours(x.date) , 
        y:  data.amount + x.amount
      })
    }
  }
exported_data.push(Y)
}

}
else{
for(let x of data.proc){
  var S = 0
  if(new Date(x.date).getUTCDay() === current_date){
    for(let e of exported_data[0].data){
      if(new Date(x.date).getHours() > e.z){
        S = exported_data[0].data.indexOf(e)
      }
    }
    exported_data[0].data.splice(S , 0 , {
      x:CheckHours(x.date) , 
      y:  data.amount + x.amount
    })
  }
}
}
break;
default : 

}
return(exported_data)

}