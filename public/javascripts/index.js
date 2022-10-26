function checkid(e){
    axios.post('/checkid', {
        id : e
      })
      .then((response) => {
        if(response.data){
            console.log(response)
            document.querySelector("#uname").textContent = "Username already taken!!!"
            document.querySelector("#uname").style.color = "red"
            document.querySelector("#username").style.boxShadow = "0 0 0 2px red"
            document.querySelector("form button").style.pointerEvents = "none"
            document.querySelector("form button").style.backgroundColor = "#9b1fe950"
        }
        else{
            document.querySelector("#uname").textContent = "Username"
            document.querySelector("#uname").style.color = "black"
            document.querySelector("form button").style.pointerEvents = "all"
            document.querySelector("form button").style.backgroundColor = "#9b1fe9"
            document.querySelector("#username").style.boxShadow = "0 0 0 2px rgba(58, 123, 255, 0.8)"

        }
    })
}

function changepassword(e){
    axios.post('/forget', {
        email: e,
        
    })
      .then((response) => {
        console.log(response);
      })
}
state = true
document.querySelector("#card h4 a").addEventListener("click",(data)=>{
    if(state){
        console.log(state)
        state = false
        document.querySelector("#username").value = ""
        document.querySelector("form #age").style.display = "none"
        document.querySelector("form #age").removeAttribute("required")
        document.querySelector("form #agee").style.display = "none"
        document.querySelector("form #email").removeAttribute("required")
        document.querySelector("form #email").style.display = "none"
        document.querySelector("form #eemail").style.display = "none"
        document.querySelector("#card h4 a").textContent = "sign up"
        document.querySelector("form").setAttribute("action","/login")
        document.querySelector("#forgot").style.display = "inherit"
        document.querySelector("#submit").style.display = "inherit"
        // document.querySelector("#username").setAttribute("placeholder","Username")
    }    
    else{
        console.log(state)
        state = true
        document.querySelector("#username").value = ""
        // document.querySelector("#username").setAttribute("placeholder","Username")
        document.querySelector("#forgot").style.display = "none"
        document.querySelector("#submit").style.display = "none"
        document.querySelector("form #email").style.display = "initial"
        document.querySelector("form #age").setAttribute("required","")
        document.querySelector("form #eemail").style.display = "initial"
        document.querySelector("form #email").setAttribute("required","")
        document.querySelector("form #age").style.display = "initial"
        document.querySelector("form #agee").style.display = "initial"
        document.querySelector("#card h4 a").textContent = "log in"
        document.querySelector("form").setAttribute("action","/signup")

    }
})
document.querySelector("#forgot").addEventListener("click",(data)=>{
    document.querySelector("#forgot").style.opacity = 0
    document.querySelector("#forgot").style.transform = `translateX(-150px)`
    document.querySelector("#submit").style.opacity = 1
    document.querySelector("#submit").style.transform = `translateX(0px)`

})
document.querySelector("#smt").addEventListener("click",(data)=>{
    email = document.querySelector("#forget-email").value
    document.querySelector("#forget-email").value = ""
    document.querySelector("#smt").innerHTML = `<i class="ri-check-line"></i>`
    document.querySelector("#smt").style.backgroundColor = `green`

    console.log(email)
    changepassword(email)
})  

document.querySelector("#username").addEventListener("input",(data)=>{
    if(document.querySelector("#uname").textContent === "Username"){
        document.querySelector("#username").style.border = "2px solid rgb(207, 207, 207)"
    }

    if(state){
        
        checkid(document.querySelector("#username").value)

    }
})

document.querySelector("input").addEventListener("focusout",(data)=>{
    console.log("hehe")
    if(document.querySelector("#uname").textContent === "Username"){
        document.querySelector("#username").style.border = "2px solid rgb(207, 207, 207)"
        document.querySelector("#username").style.boxShadow = "none"
    }

})
