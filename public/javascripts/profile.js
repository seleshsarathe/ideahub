function add_album(){
    axios.post('/addalbum', {
        nama : document.querySelector("#createboard #naam").value
      })
      .then((response) => {
        console.log(response);
        console.log("hehe");
        window.location.reload()
    })
}
document.querySelector("#middle input").addEventListener("keydown",(data)=>{
    if(data.keyCode === 13){
        console.log("hehe")
        window.location.href = `/search/${document.querySelector("#middle input").value}`
    }
})
// function add_album(){
//     axios.post('/getcreatedpins', {
        
//       })
//       .then((response) => {
//         console.log(response);
        
//     })
// }
function add_name(){
    axios.post('/addname', {
        nama : document.querySelector("#addname #naam").value
    })
    .then((response) => {
          console.log("hehe");
        window.location.reload()
      })
}

// async function getpins(){
//     var response = await axios.get('/profilealbums')
//     return response

    
// }
const res = async () => {
    var response = await axios.get('/profilealbums')
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

res()

document.querySelector("#pin").addEventListener("click",(data)=>{
    console.log(data.target.id)
})

