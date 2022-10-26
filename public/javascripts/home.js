document.querySelector("#middle input").addEventListener("keydown",(data)=>{
    if(data.keyCode === 13){
        console.log("hehe")
        window.location.href = `/search/${document.querySelector("#middle input").value}`
    }
})

document.querySelector(".pin_container").addEventListener("click",(data)=>{
    console.log(data)
})
console.log("hello")

document.querySelector("input").addEventListener("change",()=>{
    document.querySelector("form").submit()
})

setTimeout(function(){
    document.querySelector("#card p").style.display = "inherit"
    console.log("hehe")
},500)

