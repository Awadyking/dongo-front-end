function CheckTime(x){
  if(x < 10){return "0" + x}
  return String(x)
}

export const Today = (title , color)=>{return {
    id : title , 
    color : color,
      data : [
        {
          x: "12:00 AM" ,
          y: 0 , 
          z:0
        },

          {
            x: "02:00 AM" ,
            y: null , 
            z:2
          },

          {
            x: "04:00 AM" ,
            y: null , 
            z:4
          },
          {
            x: "06:00 AM" ,
            y: null , 
            z:6
          },

          {
            x: "08:00 AM" ,
            y: null , 
            z:8
          },
          {
            x: "10:00 AM" ,
            y: null , 
            z:10
          },
          {
            x: "12:00 PM" ,
            y: null , 
            z:12
          },

          {
            x: "02:00 PM" ,
            y: null , 
            z:14
          },
          {
            x: "04:00 PM" ,
            y: null , 
            z:16
          },
          {
            x: "06:00 PM" ,
            y: null , 
            z:18
          },
          {
            x: "08:00 PM" ,
            y: null ,
            z:20 
          },
          {
            x: "10:00 PM" ,
            y: null ,
            z:22 
          },
      ]
    }
}



export const  Week = (title , color)=>{
  const Week_Arr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  let MDate = new Date().getTime()

    const data =
        {id : title , 
        color : color , 
        data : []
        } 
    // eslint-disable-next-line
    for(let W = 0 ; W < 7 ; W++){
      var n = new Date(MDate).getDay()
        data.data.push({
          x : Week_Arr[n], 
          y  : null ,
        })
        MDate = MDate - 86400000
    }

    return(data)
}


export const  Month = (title , color)=>{
  let MDate = new Date().getTime()

    const data = 
        {id : title , 
        color : color , 
        data : []
        }
for(let i = 1; i < 31 ; i++){
  var m = CheckTime(new Date(MDate).getMonth() + 1)
  var d = CheckTime(new Date(MDate).getUTCDate())
  data.data.push({
    x : `${d}/${m}` , 
    y : null ,
  })
MDate = MDate - 86400000
}

    return(data)
}
