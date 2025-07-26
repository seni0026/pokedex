// get section to display pokemon
let pokeDisplay = document.getElementById('pokemon-display');

// get the load more pokemon button
const loadPokemonBtn = document.getElementById('more-pokemon');

// container for pokemon thumbnail template
let thumbnailHTML = '';

let pokeSprite = '';


let pokeData = '';

// fetch the pokemon data
const response = '';
const pokeApiJson = '';
const firstTwentyPokeLink = 'https://pokeapi.co/api/v2/pokemon';
const newPokeInfo = '';
let nextLink = '';
let pokeUrl = '';

// call function to display pokemon
pokemonDisplay();

// call function to load more pokemon when button is click
// loadPokemon();

// function for initial API call
async function pokemonDisplay() {

    const pokeJson = await initialJsonObj(firstTwentyPokeLink);
    nextLink = pokeJson.next;
    loadPokemon(nextLink)

    getPokeSprite(pokeJson, newPokeInfo, pokeUrl);
}

// function for initial API call
async function initialJsonObj(apiLink) {
        // get the return value from the fetchData()
    const pokeInfo = fetchData(response, pokeApiJson, apiLink);

    // get clarity from professor on why i need await to get the value here
    const pokeJson = await pokeInfo;
    return pokeJson;
}

// this function get pokemon sprites
async function getPokeSprite(json, sprite, url) {
    // use a for loop to loop through the results array 
    // and get the url value from each object in the array
    for(let i = 0; i < 20; i++) {
        url = json.results[i].url;

        // fetch the data for specific pokemon
        sprite = fetchData(response, pokeApiJson, url);
        const spriteResponse = await sprite;

        // access the sprites object and save a sprite to a variable
        pokeSprite = spriteResponse.sprites.other["official-artwork"].front_default;

        // create the html template to display pokemon
        thumbnailHTML = `
            <div class="thumbnail">
                <img src="${pokeSprite}" alt="">
                <p class="pokemon-name">${spriteResponse.name}</p>
            </div>`

        // add the template to the page
        pokeDisplay.innerHTML+= thumbnailHTML;
    }
}

// this function fetch pokemon
async function fetchData(response, json, apiLink) {
    response = await fetch(`${apiLink}`);
    json = await response.json();
    return json
    // console.log(json)
}

// this function load more pokemon to the page
function loadPokemon(next) {
    loadPokemonBtn.addEventListener('click', async function() {
        
        const pokeJson = await initialJsonObj(next)
        // console.log(pokeJson.results)
        getPokeSprite(pokeJson, newPokeInfo, next);
    })
}

Obj(firstTwentyPokeLink);
async function Obj(apiLink) {
        // get the return value from the fetchData()
    const pokeInfo = fetchData(response, pokeApiJson, "https://pokeapi.co/api/v2/pokemon?offset=40&limit=20");

    // get clarity from professor on why i need await to get the value here
    const pokeJson = await pokeInfo;
    console.log(pokeJson);
}