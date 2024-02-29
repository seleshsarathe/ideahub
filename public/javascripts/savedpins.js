function delete_album(naame){
    console.log("axiso challa")
    axios.post('/delete/album', {
        nama : naame
      })
      .then((response) => {
        console.log(response);
        console.log("hehe");
        window.location = "/profile"

    })
}

document.querySelector("#middle input").addEventListener("keydown",(data)=>{
    if(data.keyCode === 13){
        console.log("hehe")
        window.location.href = `/search/${document.querySelector("#middle input").value}`
    }
})
document.querySelector(".pin_container").addEventListener("click",(data)=>{
    console.log(data.target.id)
    window.location.href = `/pin/${data.target.id}`

})
console.log("hello")

document.querySelector("input").addEventListener("change",()=>{
    document.querySelector("form").submit()
})

document.querySelector("#deleteal").addEventListener("click",()=>{
    console.log(document.querySelector(".card").getAttribute("id"))
    delete_album(document.querySelector(".card").getAttribute("id"))
})