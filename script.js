
const api = "https://restcountries.com/v3.1"
const cardsElement = document.getElementById("cards")
const inputSearch = document.querySelector(".search input")
const buttonMore = createNode('button');
const select = document.querySelector('select');
const toggle = document.getElementById('toggle');




let totalElement = 250;
let perPage=8;
let page = 0;
let start = page + perPage;
let end = start + perPage;

function darkMode(){
    
    document.body.classList.toggle('bg-light');
    document.body.classList.toggle('bg-dark');
    buttonMore.classList.toggle('bg-dark')
    buttonMore.classList.toggle('text-dark')
    if(toggle.innerHTML === "🌙 Dark Mode"){
        toggle.innerHTML= "🌙 Light Mode"
    }
    else{
        toggle.innerHTML = "🌙 Dark Mode"
    }  

}
toggle.addEventListener('click', darkMode)



function handleClick(arr){
    arr.forEach(item=>{
        item.addEventListener("click", ()=>{
            redirect(item.id)
        })
    })
}
function redirect(el){
    var currentUrl = window.location.href;
   return window.location.href = currentUrl + "country.html" + "?"+ el;
}

function createNode(element){
    const elem = document.createElement(element);
    return elem
}
function deleteItemsCards(){
    cardsElement.innerHTML="";  
}
function hideElement(element){
    element.style = "display:none";
}
function htmlElement(infos){
    return `<a href="#" id="${infos.nome}"><div class="card">
    <div class="flag">
    <img src="${infos.flag}" alt="" />
    </div>       
    <div>
    <h2>${infos.nome}</h2>
    <p><strong>Population:</strong> ${infos.population.toLocaleString('pt-BR')}</p>
    <p><strong>Region:</strong> ${infos.region}</p>
    <p><strong>Capital:</strong> ${infos.capital}</p>
    </div>
    </div>
    </a>
    `
}

async function filterSelect(region){
    
    const resp = await fetch(`${api}/region/${region}`)
    const dataFiltered = await resp.json();
    // console.log(dataFiltered)
    deleteItemsCards();
    // console.log(countryData.length)
    dataFiltered.forEach((element) => {
        
        let infos = {
            "nome":element.name.common,
            "flag":element.flags.png,
            "population":element.population,
            "region":element.region,
            "capital":element.capital
    }
    
//    console.log(htmlElement)
  
  cardsElement.insertAdjacentHTML("beforeend",htmlElement(infos) )
});
hideElement(buttonMore);
const listArrCards = document.querySelectorAll(".cards a")
   handleClick(listArrCards)
}


async function searchCountry(e){
    try {
        
        const country = e.target.value;
        const resp = await fetch(`${api}/name/${country}`)
        // console.log(resp.ok)
        if(resp.ok){
        
        const countryData = await resp.json();
        // let total = countryData.length;
                deleteItemsCards();
                
                countryData.forEach((element) => {
                    let infos = {
                        "nome":element.name.common,
                        "flag":element.flags.png,
                        "population":element.population,
                        "region":element.region,
                        "capital":element.capital
                }
                
            //    console.log(htmlElement)
              
              cardsElement.insertAdjacentHTML("beforeend",htmlElement(infos) )
            });     
           
            console.log(start,end)
            hideElement(buttonMore);


        }
        else if (!resp.ok){
            deleteItemsCards(); 
            hideElement(buttonMore);
            cardsElement.insertAdjacentHTML("beforeend",`<p>Não encontrado</p>` )
        }       
        
    } catch (error) {
        console.log(error)
    }
    const listArrCards = document.querySelectorAll(".cards a")
    handleClick(listArrCards)
}

async function getDataFilter(){
    
}




async function getDataAll(){ 
   try {
    const resp = await fetch(`${api}/all`);
    const data = await resp.json();
    let total = data.length;
    data.slice(start,end).forEach((element)=>{
        let infos = {
                "nome":element.name.common,
                "flag":element.flags.png,
                "population":element.population,
                "region":element.region,
                "capital":element.capital
        }
        
    //   console.log(infos)       
      cardsElement.insertAdjacentHTML("beforeend",htmlElement(infos)
      )
     
    }
    
    )
    

    if(end < total){
    start = start + 8;
    end = end + 8;
       
    }
   
    else{
        hideElement(buttonMore);
    }
    

 } 
    catch (error) {
       console.log(error)
   }
   const listArrCards = document.querySelectorAll(".cards a")
   handleClick(listArrCards)
}



getDataAll();

inputSearch.addEventListener("keyup", (event)=>{
    if (event.keyCode === 13){
        event.preventDefault(); 

       if(inputSearch.value == ""){
        getDataAll();
       }
       else{
        select.selectedIndex=0;   
        start = 0;
        end = 8;
        searchCountry(event);
       }  
           
       
    }  

} )

cardsElement.insertAdjacentElement("afterend", buttonMore )
buttonMore.innerHTML= 'Ver mais';

buttonMore.addEventListener('click', ()=>{
    getDataAll();

})

select.addEventListener('change',()=>{
    inputSearch.value=""
   filterSelect(select.value)
})

