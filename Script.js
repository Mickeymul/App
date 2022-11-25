async function start(){
//Using async is the modern way to fetch api and work with them
const response = await fetch("https://dog.ceo/api/breeds/list/all")
//Here fetch is going to return a promise
const data = await response.json()
//Using the response we are taking all the actual data returned by the promise
//We are storing the json data into a constant variable called data

createList(data.message)
}

//Calling our function
start()

function createList(breedsList){
    document.getElementById("breed").innerHTML= `
    <select onchange = "loadByBreed(this.value)">
    <option>Choose a Dog Breed</option>
    ${Object.keys(breedsList).map(function(breed){

        return`<option>${breed}</option>`

    }).join('')}

</select>
    `
}
 async function loadByBreed(breed){
    if(breed != "Choose a Dog Breed"){
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        console.log(data)
        slideShow(data.message)
    }
}

function slideShow(images){
    let current = 0;
 document.getElementById("slideShow").innerHTML = `
 <div class="slide" style="background-image: url('${images[0]}')"></div>
<div class="slide" style="background-image: url('${images[1]}')"></div>`

current += 2
setInterval(nextSlide,3000)

function nextSlide(){
    document.getElementById("slideShow").insertAdjacentHTML("beforeend",`<div class="slide" style="background-image: url('${images[current]}')"></div>`)
    setTimeout(function(){
        document.querySelector(".slide").remove()
    },1000)
    if(current + 1 >= images.length){
        current=0;
    }
    else{
        current++
    }
    
}
}