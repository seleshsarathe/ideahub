document.querySelector("#conpwsd").addEventListener("input",(data)=>{
    if(document.querySelector("#conpwsd").value === document.querySelector("#newpwsd").value){
        document.querySelector("#cpwsd").style.backgroundColor = "#9b1fe9"
        document.querySelector("#cpwsd").style.pointerEvents = "all"
    }
    else{
        document.querySelector("#cpwsd").style.pointerEvents = "none"
        document.querySelector("#cpwsd").style.backgroundColor = "rgb(172, 172, 172)"
    }
})

function checkid(e){
    axios.post('/checkid', {
        id : e
      })
      .then((response) => {
        if(response.data){
            console.log(response)
            document.querySelector("#usernme").textContent = "Username already taken!!!"
            document.querySelector("#usernme").style.color = "red"
            document.querySelector("#uname").style.boxShadow = "0 0 0 2px red"
            document.querySelector("#submit").style.pointerEvents = "none"
            document.querySelector("#submit").style.backgroundColor = "#9b1fe950"
        }
        else{
            document.querySelector("#usernme").textContent = "Edit your username"
            document.querySelector("#usernme").style.color = "black"
            document.querySelector("#submit").style.pointerEvents = "all"
            document.querySelector("#submit").style.backgroundColor = "#9b1fe9"
            document.querySelector("#uname").style.boxShadow = "0 0 0 2px rgba(58, 123, 255, 0.8)"

        }
    })
}

document.querySelector("#uname").addEventListener("input",(data)=>{
    checkid(document.querySelector("#uname").value)
})