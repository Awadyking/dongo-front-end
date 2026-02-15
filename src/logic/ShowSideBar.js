


export function ShowSideBar(){
    let Side = document.getElementById("SideBar").style
if(Side.right === "0px"){Side.right = "-160px"}
else{Side.right = "0px"}


}


export function HideSideBar(){
    let Side = document.getElementById("SideBar").style
    Side.right = "-160px"
}