
const api = "https://restcountries.com/v3.1"
const cardsElement = document.getElementById("cards")
const toggle = document.getElementById('toggle');
const countryDetails = window.location.href.split("?")

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


function createNode(element){
    const elem = document.createElement(element);
    return elem
}


function htmlElement(infos){
    return `<div class="country">
    <div class="flag">
    <img src="${infos.flag}" alt="" />
    </div>       
    <div>
    <h2>${infos.nome}</h2>
    <p><strong>Native name:</strong> ${infos.nativeName}</p>
    <p><strong>Population:</strong> ${infos.population}</p>
    <p><strong>Region:</strong> ${infos.region}</p>
    <p><strong>Capital:</strong> ${infos.capital}</p>
    <p><strong>Start of week:</strong> ${infos.startOfWeek}</p>
    <p><strong>Subregion:</strong> ${infos.subregion}</p>
    <p><strong>Border Countries:</strong> ${infos.borders}</p>
    </div>
    </div>
    
    `
}

async function getCountryDetails(element){ 
    const country = element[1]
    try {
     const resp = await fetch(`${api}/name/${country}`);
     const data = await resp.json();
     console.log(data[0]);
            let infos = {
                 "nome":data[0].name.common,
                 "nativeName":data[0].name.nativeName,
                 "flag":data[0].flags.png,
                 "population":data[0].population.toLocaleString('pt-BR'),
                 "region":data[0].region,
                 "capital":data[0].capital,
                 "startOfWeek":data[0].startOfWeek,
                 "subregion":data[0].subregion,
                 "borders": data[0].borders
                 
         }
         
       cardsElement.insertAdjacentHTML("beforeend",htmlElement(infos)
       ) 
   
  } 
     catch (error) {
        console.log(error)
    }
   
 }
 
 

getCountryDetails(countryDetails);






