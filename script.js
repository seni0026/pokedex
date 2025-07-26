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

fetchPokeData();

// function to for initial API call
async function fetchPokeData() {
    // get the return value from the fetchData()
    const pokeInfo = fetchData(response, pokeApiJson, firstTwentyPokeLink);

    // get clarity from professor on why i need await to get the value here
    const pokeJson = await pokeInfo;
    // nextLink = pokeJson.next;

    // console.log(nextLink)

    getPokeSprite(pokeJson, firstTwentyPokeLink, newPokeInfo)
}

// this function get pokemon sprites
async function getPokeSprite(json, api, sprite) {
        for(let i = 0; i < 20; i++) {
        const pokeName = json.results[i].name;
        let pokeSpriteLink = `${api}/${pokeName}`;
            sprite = fetchData(response, pokeApiJson, pokeSpriteLink);
            const spriteResponse = await sprite;
            pokeSprite = spriteResponse.sprites.other["official-artwork"].front_default;
        thumbnailHTML = `
            <div class="thumbnail">
                <img src="${pokeSprite}" alt="">
                <p class="pokemon-name">${pokeName}</p>
            </div>`

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
