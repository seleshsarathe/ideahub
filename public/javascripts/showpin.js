document.querySelector("#middle input").addEventListener("keydown",(data)=>{
    if(data.keyCode === 13){
        console.log("hehe")
        window.location.href = `/search/${document.querySelector("#middle input").value}`
    }
})
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

async function getdetails(){
    data = await axios.post('/getpindetails', {
        id : document.querySelector("#pleft img").getAttribute("alt")
      })
    return data
    }

function savedetails(website,title,details){
    axios.post('/editpost', {
        id : document.querySelector("#pleft img").getAttribute("alt"),
        website:website,
        title:title,
        description:details
      })
      .then((response) => {
        console.log(response);
        window.location.reload()

      })    }



function save(shared){
    console.log(document.querySelector("#pleft img").getAttribute("src"))
    axios.post('/save', {
        sharedto:shared,
        id : document.querySelector("#pleft img").getAttribute("src"),
        pinid : document.querySelector("#pleft img").getAttribute("alt")
      })
      .then((response) => {
        console.log(response);
        window.location.reload()

      })
}

function download(){
    axios.post('/download',{
        url: "http://localhost:3000" + document.querySelector(".ri-download-2-fill").getAttribute("id"),
    })
      .then((response) => {
        console.log(response);
      })
}

function comment(){
    console.log(document.querySelector("#comment").value)
    axios.post('/comment',{
        comment:document.querySelector("#comment").value,
        id : document.querySelector("#pleft img").getAttribute("src")

    })
      .then((response) => {
        console.log(response);
        window.location.reload();

      })
}

function unsave(){
    axios.post('/unsave', {
        id : document.querySelector("#pleft img").getAttribute("src")
      })
      .then((response) => {
        console.log(response);
        window.location.reload()

      })
}

function follow(){
    axios.post('/follow', {
        username : document.querySelector("#nf h4").textContent
      })
      .then((response) => {
        console.log(response);
        window.location.reload()

      })
}
function unfollow(){
    axios.post('/unfollow', {
        username : document.querySelector("#nf h4").textContent
      })
      .then((response) => {
        console.log(response);
        window.location.reload()

      })
}

document.querySelector("#edit").addEventListener("click",(data)=>{
    console.log("editing")
    getdetails().then((data)=>{
        console.log(data)
        document.querySelector("#text a").style.display = "none"
        document.querySelector("#text h1").style.display = "none"
        document.querySelector("#text p").style.display = "none"
        document.querySelector("#edit").style.display = "none"
        document.querySelector("#save").style.display = "none"
        document.querySelector("#savedetails").style.display = "inherit"
        document.querySelector("#inp").style.display = "inherit"
        document.querySelector("#inp #website").value = data.data.website
        document.querySelector("#inp #title").value = data.data.title
        document.querySelector("#inp #desc").value = data.data.description
        document.querySelector("#hundered").textContent = 100-Number(document.querySelector("#inp #title").value.length)
        document.querySelector("#fhundered").textContent = 500-Number(document.querySelector("#inp #desc").value.length)

    })
})

document.querySelector("#savedetails").addEventListener("click",(data)=>{
    website = document.querySelector("#website").value
    title = document.querySelector("#title").value
    description = document.querySelector("#desc").value
    console.log(website,title,description)
    savedetails(website,title,description)
})


var flag = true
document.querySelector(".ri-arrow-right-s-line").addEventListener("click",()=>{
    if(flag){
        flag = false
        document.querySelector("#comment-section").style.display = "inherit"
        document.querySelector(".ri-arrow-right-s-line").style.transform = "rotate(90deg)"
    }
    else{
        flag = true
        document.querySelector("#comment-section").style.display = "none"
        document.querySelector(".ri-arrow-right-s-line").style.transform = "rotate(0deg)"
    }
})
document.querySelector(".ri-share-box-line").addEventListener("click",()=>{
    url = "http://localhost:3000" + document.querySelector(".ri-download-2-fill").getAttribute("id")
    window.open(`whatsapp://send?text=${url}`)
})

document.querySelector("#title").addEventListener("focusin",()=>{
    document.querySelector("#hundered").style.opacity = "1"
})
document.querySelector("#title").addEventListener("focusout",()=>{
    document.querySelector("#hundered").style.opacity = "0"
})
document.querySelector("#desc").addEventListener("focusin",()=>{
    document.querySelector("#fhundered").style.opacity = "1"
})
document.querySelector("#desc").addEventListener("focusout",()=>{
    document.querySelector("#fhundered").style.opacity = "0"
})

document.querySelector("#title").addEventListener("input",()=>{
    console.log(100-document.querySelector("#title").value.length)
    document.querySelector("#hundered").textContent = 100-document.querySelector("#title").value.length
    
    if(document.querySelector("#title").value.length > 0 && document.querySelector("#title").value.length < 101 && document.querySelector("#desc").value.length > 0 && document.querySelector("#desc").value.length < 501 ){
        document.querySelector("#savedetails").style.pointerEvents = "all"
        document.querySelector("#savedetails").style.backgroundColor = "#9b1fe9"
        document.querySelector("#title").style.color = "black"
        document.querySelector("#hundered").style.color = "black"
    }
    else if(document.querySelector("#title").value.length > 101){
        document.querySelector("#savedetails").style.pointerEvents = "none"
        document.querySelector("#savedetails").style.backgroundColor = "#9b1fe950"
        document.querySelector("#title").style.color = "red"
        document.querySelector("#hundered").style.color = "red"
    }
})

document.querySelector("#desc").addEventListener("input",()=>{
    document.querySelector("#fhundered").textContent = 500-document.querySelector("#desc").value.length

    if(document.querySelector("#title").value.length > 0 && document.querySelector("#title").value.length < 101 && document.querySelector("#desc").value.length > 0 && document.querySelector("#desc").value.length < 501 ){
        document.querySelector("#savedetails").style.pointerEvents = "all"
        document.querySelector("#savedetails").style.backgroundColor = "#9b1fe9"
        document.querySelector("#desc").style.color = "black"
        document.querySelector("#fhundered").style.color = "black"
    }
    else if(document.querySelector("#desc").value.length > 501){
        document.querySelector("#savedetails").style.pointerEvents = "none"
        document.querySelector("#savedetails").style.backgroundColor = "#9b1fe950"
        document.querySelector("#desc").style.color = "red"
        document.querySelector("#fhundered").style.color = "red"
    }
})

document.querySelector("#done").addEventListener("click",()=>{
    console.log("adding comment")
    comment()
    document.querySelector("#comment").value = ""
})
var counter = 2
document.querySelector("#show-more").addEventListener("click",()=>{
    var coments = Number(document.querySelector("#comments h4 span").textContent)
    if(coments - counter >= 2){
        document.querySelector(`#comment-section :nth-child(${counter+1})`).style.display = "flex"
        counter = counter+1 
        console.log(counter)
        document.querySelector(`#comment-section :nth-child(${counter+1})`).style.display = "flex"
        counter = counter+1 
        console.log(counter)
        if(coments === counter){
            document.querySelector("#show-more").style.display = "none"
        }
    }
    else if(coments - counter === 1){
        document.querySelector(`#comment-section :nth-child(${counter+1})`).style.display = "flex"
        counter = counter+1 
        console.log(counter)
        if(coments === counter){
            document.querySelector("#show-more").style.display = "none"
        }
    }
})
var x = document.querySelector("#pleft img").clientHeight
var d = document.querySelector("#pin").clientHeight

if((d-30)>x){
    document.querySelector("#pleft img").style.borderRadius = "20px"
    document.querySelector("#pleft img").style.marginLeft = "20px"
    document.querySelector("#pleft img").style.marginTop = "20px"
    document.querySelector("#pleft img").style.marginRight = "20px"
    
}
console.log(x,d)


if (document.querySelector("#nf h4").textContent === "pintrester"){
    document.querySelector("#proright button").style.pointerEvents = "none"
    document.querySelector("#proright button").style.opacity = "0.5"
    console.log("follow disabled")
}
else{
    console.log("follow enabled")
    document.querySelector("#proright button").style.pointerEvents = "auto"
}


document.querySelector("#addcomment input").addEventListener("focusin",(data)=>{
    document.querySelector("#done").style.display = "flex"
})

document.querySelector("#top #save").addEventListener("click",(data)=>{
    if (document.querySelector("#top #save").textContent === "Save"){
        console.log("Saved")
        document.querySelector("#saveto").style.opacity = 1     
        document.querySelector("#saveto").style.pointerEvents = "all"        
        document.querySelector("#saveto").style.height = `fit-content`        
    }
    else if (document.querySelector("#top #save").textContent === "Saved"){
        console.log("unsaved")
        unsave()

    }
    // save()
})
document.querySelector("#proright button").addEventListener("click",()=>{
    if (document.querySelector("#proright button").textContent === "follow"){
        console.log("following")
        document.querySelector("#proright button").textContent = "following"
        follow()
    }
    else if (document.querySelector("#proright button").textContent === "following"){
        console.log("follow")
        document.querySelector("#proright button").textContent = "follow"
        unfollow()
    }
})

document.querySelector(".ri-link").addEventListener("click",()=>{
    document.querySelector("#copied").style.opacity = 1
    document.querySelector("#copied").style.transform = `translateY(-40px)`
    
    const timeout = setTimeout(()=>{
        document.querySelector("#copied").style.opacity = 0
        document.querySelector("#copied").style.transform = `translateY(0px)`
    },700)
    navigator.clipboard.writeText(document.querySelector(".ri-link").getAttribute("id"));
 })

document.querySelector(".ri-download-2-fill").addEventListener("click",()=>{
    document.querySelector("#downloaded").style.opacity = 1
    document.querySelector("#downloaded").style.transform = `translateY(-40px)`
    
    const timeout = setTimeout(()=>{
        document.querySelector("#downloaded").style.opacity = 0
        document.querySelector("#downloaded").style.transform = `translateY(0px)`
    },700)

    console.log("dclick")
    console.log("http://localhost:3000" + document.querySelector("#pleft img").getAttribute("src"))
    download()  
})

if(document.querySelector("#addcomment a").textContent === "Login to comment"){

    document.querySelector("#proright button").style.color = "rgb(133,133,133)"
    document.querySelector("#proright button").style.pointerEvents = "none"
    document.querySelector("#top #save").style.backgroundColor = "#9b1fe950"
    document.querySelector("#top #save").style.pointerEvents = "none"
    
}
else{
    document.querySelector("#proright button").style.color = "black"
    document.querySelector("#proright button").style.pointerEvents = "all"
    document.querySelector("#top #save").style.backgroundColor = "#9b1fe9"
    document.querySelector("#top #save").style.pointerEvents = "all"

}

document.querySelector("#saveto h4 .ri-close-line").addEventListener("click",(data)=>{
    document.querySelector("#saveto").style.opacity = 0        
    document.querySelector("#saveto").style.height = `0px`
    document.querySelector("#saveto").style.pointerEvents = "none"        

    console.log("lol")
})

document.querySelector("#saveto #createboards").addEventListener("click",(data)=>{
    document.querySelector("#overly").style.display = "inherit"        
    document.querySelector("#createboard").style.display = `inherit`
    console.log("lol")
})
document.querySelector("#overly").addEventListener("click",(data)=>{
    document.querySelector("#overly").style.display = "none"        
    document.querySelector("#createboard").style.display = `none`
    console.log("lol")
})
document.querySelector("#createboard button").addEventListener("click",(data)=>{
    document.querySelector("#overly").style.display = "none"        
    document.querySelector("#createboard").style.display = `none`
    console.log("lol")
    add_album()
    save(document.querySelector("#createboard input").value)

})

document.querySelector("#boards").addEventListener("click",(data)=>{
    document.querySelector("#saveto").style.opacity = 0        
    document.querySelector("#saveto").style.height = `0px`
    save(data.target.id)
    console.log(data.target.id)
    console.log(document.querySelector("#pleft img").getAttribute("alt"))

})

 


 
