document.querySelector("#middle input").addEventListener("keydown",(data)=>{
    if(data.keyCode === 13){
        console.log("hehe")
        window.location.href = `/search/${document.querySelector("#middle input").value}`
    }
})

function follow(){
    axios.post('/follow', {
        username : document.querySelector("#top #username").textContent.slice(1)
      })
      .then((response) => {
        console.log(response);
        window.location.reload()

      })
}
function unfollow(){
    axios.post('/unfollow', {
        username : document.querySelector("#top #username").textContent.slice(1)
      })
      .then((response) => {
        console.log(response);
        window.location.reload()

      })
}

console.log(document.querySelector("#top #username").getAttribute("class"))
const res = async () => {
    var response = await axios.post('/publicalbums',{
        username:document.querySelector("#top #username").getAttribute("class")
    })
    console.log(response)
    for (data in response.data){
        if(response.data[data].length > 2){
            document.querySelector(`.${data} #one img`).setAttribute("src",response.data[data][0])
            document.querySelector(`.${data} #two img`).setAttribute("src",response.data[data][1])
            document.querySelector(`.${data} #three img`).setAttribute("src",response.data[data][2])
            document.querySelector(`.${data}`).style.display = "inherit"
        }
        else{
            document.querySelector(`.${data} #one`).style.width = "100%"
            document.querySelector(`.${data} #two`).style.display = "none"
            document.querySelector(`.${data} #three`).style.display = "none"
            if(response.data[data].length < 1){
                document.querySelector(`.${data} #one img`).setAttribute("src","https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png" )
                document.querySelector(`#overlay${data}` ).setAttribute("href","/home" )

            }
            else{
                document.querySelector(`.${data} #one img`).setAttribute("src",response.data[data][0] )

            }
            document.querySelector(`.${data}`).style.display = "inherit"
        }
    }
  };
document.querySelector("#share").addEventListener("click",(data)=>{
    navigator.clipboard.writeText(document.querySelector("#share").getAttribute("class"));
})
// if(document.querySelector("#top #name").textContent === "add name"){
//     document.querySelector("#top #name").style.cursor = "pointer" 
// }
// else{
//     document.querySelector("#top #name").style.cursor = "auto" 

// }
document.querySelector("#created").addEventListener("click",()=>{
    console.log("created")
    document.querySelector("#created").style.borderBottom = `3px solid black `
    document.querySelector("#saved").style.border = `none`
    document.querySelector("#createdpins").style.transform = `translateX(0%)`
    document.querySelector("#pins").style.transform = `translateX(110%)`
    
})
document.querySelector("#saved").addEventListener("click",()=>{
    console.log("saved")
    document.querySelector("#saved").style.borderBottom = `3px solid black `
    document.querySelector("#created").style.border = `none`
    document.querySelector("#createdpins").style.transform = `translateX(-110%)`
    document.querySelector("#pins").style.transform = `translateX(0%)`
})

document.querySelector(".ri-add-fill").addEventListener("click",()=>{
    document.querySelector("#overlay").style.display = "inherit"
    document.querySelector("#createboard").style.display = "inherit"
})

// document.querySelector("#top #name").addEventListener("click",()=>{
//     document.querySelector("#overlay").style.display = "inherit"
//     document.querySelector("#addname").style.display = "inherit"
// })

// document.querySelector("#overlay").addEventListener("click",()=>{
//     document.querySelector("#overlay").style.display = "none"
//     document.querySelector("#createboard").style.display = "none"
//     document.querySelector("#addname").style.display = "none"
// })
document.querySelector("#createboard input").addEventListener("input",()=>{
    if(document.querySelector("#createboard input").value){
        document.querySelector("#createboard button").style.backgroundColor = "#9b1fe9"
        document.querySelector("#createboard button").style.pointerEvents = "all"
    }
    else{
        document.querySelector("#createboard button").style.pointerEvents = "none"
        document.querySelector("#createboard button").style.backgroundColor = "#9b1fe950"
    }
})
document.querySelector("#addname input").addEventListener("input",()=>{
    if(document.querySelector("#addname input").value){
        document.querySelector("#addname button").style.backgroundColor = "#9b1fe9"
        document.querySelector("#addname button").style.pointerEvents = "all"
    }
    else{
        document.querySelector("#addname button").style.pointerEvents = "none"
        document.querySelector("#addname button").style.backgroundColor = "#9b1fe950"
    }
})

document.querySelector("#createboard #create").addEventListener("click",()=>{
    document.querySelector("#overlay").style.display = "none"
    document.querySelector("#createboard").style.display = "none"
    add_album()
})

document.querySelector("#addname #add").addEventListener("click",()=>{
    document.querySelector("#overlay").style.display = "none"
    document.querySelector("#addname").style.display = "none"
    add_name()
})

if(document.querySelector("#buttons #follow").textContent === "follow"){
    document.querySelector("#buttons #follow").style.backgroundColor = "#9b1fe9"
    document.querySelector("#buttons #follow").style.color = "white"
    document.querySelector("#buttons #follow").style.pointerEvents = "all"
    // follow()
}
if(document.querySelector("#buttons #follow").getAttribute("class") === "false"){
    document.querySelector("#buttons #follow").style.backgroundColor = "#9b1fe950"
    document.querySelector("#buttons #follow").style.pointerEvents = "none"
    
}
else if(document.querySelector("#buttons #follow").textContent === "following"){
    document.querySelector("#buttons #follow").style.pointerEvents = "all"
    document.querySelector("#buttons #follow").style.backgroundColor = "black"
    document.querySelector("#buttons #follow").style.color = "white"
    // unfollow()
}
document.querySelector("#buttons #follow").addEventListener("click",(data)=>{
    if(document.querySelector("#buttons #follow").textContent === "follow"){
        console.log("following")
        follow()
    }
    else{
        console.log("unfollowing")
        unfollow()
    }
})

res()


