function changepassword(){
    axios.post('/changepassword', {
        password: document.querySelector("#password").value,
        id:document.querySelector("#id").textContent,
        otp:document.querySelector("#otp").textContent
    })
      .then((response) => {
        console.log(response);
      })
}

console.log("hello")
document.querySelector("#npassword").addEventListener("input",(data)=>{
    console.log(document.querySelector("#npassword").value ,document.querySelector("#password").value)
    if(document.querySelector("#npassword").value === document.querySelector("#password").value){
        document.querySelector("button").style.pointerEvents = "all"
        document.querySelector("button").style.backgroundColor = "#9c1fe9"
    }
    else{
        document.querySelector("button").style.pointerEvents = "none"
        document.querySelector("button").style.backgroundColor = "#9c1fe950"
        
    }
    
})
document.querySelector("button").addEventListener("click",(data)=>{
    console.log("clicked")
    changepassword()
    window.location.href = '/';
})

otp = document.querySelector("#otp").textContent