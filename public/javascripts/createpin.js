document.querySelector("#middle input").addEventListener("keydown",(data)=>{
    if(data.keyCode === 13){
        console.log("hehe")
        window.location.href = `/search/${document.querySelector("#middle input").value}`
    }
})

document.querySelector("#title").addEventListener("input",(data)=>{
    if(document.querySelector("#description").value.length < 500 && document.querySelector("#description").value.length > 0 && document.querySelector("#title").value.length < 500 && document.querySelector("#title").value.length > 0){
        document.querySelector("#post").style.backgroundColor = "#9c1fe9"
        document.querySelector("#post").style.pointerEvents = "all"
    }
    
    else{
        document.querySelector("#post").style.backgroundColor = "#9c1fe950"
        document.querySelector("#post").style.pointerEvents = "none"
    }

    document.querySelector("#titlecount").innerHTML = 100-(document.querySelector("#title").value.length)
    if(document.querySelector("#title").value.length>100){
        document.querySelector("#low1 #ltitle").innerHTML = "Ooops! This title is getting long. Try trimming it down."
        document.querySelector("#low1").style.color = "red"

    }
    else{
        
        document.querySelector("#low1 #ltitle").innerHTML = "your first 40 character is what usually show up in the feeds"
        document.querySelector("#low1").style.color = "rgb(150, 150, 150)"
    }
})
document.querySelector("#title").addEventListener("focusout",(data)=>{
    document.querySelector("#low1").style.opacity = 0
})
document.querySelector("#title").addEventListener("focusin",(data)=>{
    document.querySelector("#low1").style.opacity = 1
})

document.querySelector("#description").addEventListener("input",(data)=>{
    console.log(document.querySelector("#description").value.length,document.querySelector("#title").value.length)
    if(document.querySelector("#description").value.length < 501 && document.querySelector("#description").value.length > 0 && document.querySelector("#title").value.length < 101 && document.querySelector("#title").value.length > 0){
        document.querySelector("#post").style.backgroundColor = "#9c1fe9"
        document.querySelector("#post").style.pointerEvents = "all"
    }
    
    else{
        document.querySelector("#post").style.backgroundColor = "#9c1fe950"
        document.querySelector("#post").style.pointerEvents = "none"
    }

    document.querySelector("#desccount").innerHTML = 500-(document.querySelector("#description").value.length)
    if(document.querySelector("#description").value.length>500){
        document.querySelector("#low2 #ldesc").innerHTML = "Ooops! This description is getting long. Try trimming it down."
        document.querySelector("#low2").style.color = "red"

    }
    else{
        document.querySelector("#low2 #ldesc").innerHTML = "people will see the first 50 character when the click on the pin"
        document.querySelector("#low2").style.color = "rgb(150, 150, 150)"
    }
})
document.querySelector("#title").addEventListener("input",(data)=>{
    console.log(document.querySelector("#description").value.length,document.querySelector("#title").value.length)
    if(document.querySelector("#description").value.length < 501 && document.querySelector("#description").value.length > 0 && document.querySelector("#title").value.length < 101 && document.querySelector("#title").value.length > 0){
        document.querySelector("#post").style.backgroundColor = "#9c1fe9"
        document.querySelector("#post").style.pointerEvents = "all"
    }
    
    else{
        document.querySelector("#post").style.backgroundColor = "#9c1fe950"
        document.querySelector("#post").style.pointerEvents = "none"
    }

    document.querySelector("#desccount").innerHTML = 500-(document.querySelector("#description").value.length)
    if(document.querySelector("#description").value.length>500){
        document.querySelector("#low2 #ldesc").innerHTML = "Ooops! This description is getting long. Try trimming it down."
        document.querySelector("#low2").style.color = "red"

    }
    else{
        document.querySelector("#low2 #ldesc").innerHTML = "people will see the first 50 character when the click on the pin"
        document.querySelector("#low2").style.color = "rgb(150, 150, 150)"
    }
})
document.querySelector("#description").addEventListener("focusout",(data)=>{
    document.querySelector("#low2").style.opacity = 0
})
document.querySelector("#description").addEventListener("focusin",(data)=>{
    document.querySelector("#low2").style.opacity = 1
})
console.log("hello")


if(document.querySelector("#description").value.length < 500 && document.querySelector("#description").value.length > 0 && document.querySelector("#title").value.length < 500 && document.querySelector("#title").value.length > 0){
    document.querySelector("#post").style.backgroundColor = "#9c1fe9"
    document.querySelector("#post").style.pointerEvents = "all"
}

else{
    document.querySelector("#post").style.backgroundColor = "#9c1fe950"
    document.querySelector("#post").style.pointerEvents = "none"
}

document.querySelector("#input").addEventListener("change",(data)=>{
    if(document.querySelector("#input").files.length > 0){
        var src = URL.createObjectURL(document.querySelector("#input").files[0]);
        console.log(src)
        var preview = document.getElementById("preview");
        preview.src = src;
        document.getElementById("preview-image").style.display = "block";
        document.querySelector("#upload #img").style.display = "none";
        document.querySelector("#caution").style.display = "none";
        document.querySelector("#upload").style.backgroundColor = "white";

      }

})  
document.querySelector(".ri-delete-bin-7-fill").addEventListener("click",(data)=>{
    if(document.querySelector("#input").files.length > 0){
        document.getElementById("preview-image").style.display = "none";
        document.querySelector("#upload #img").style.display = "inherit";
        document.querySelector("#caution").style.display = "inherit";
        document.querySelector("#upload").style.backgroundColor = "rgb(230,230,230)";
        document.querySelector("#input").value=""
      }

})  



