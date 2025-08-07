// get the sign up link
const signUpLink = document.getElementById('sign-up');

// get the new account btn
const newAccountBtn = document.getElementById('newUser');

// get the sign in form
const signInForm = document.getElementById('signIn');

// get the sign up form
const signUpForm = document.getElementById('signUp');

// get the entire form
const loginForm = document.getElementById('login-form');

// get the p tags for the error messages
const loginError = document.getElementById('loginError');
const   signUpError = document.getElementById('signUpError');

// get the sign in btn
const loginBtn = document.getElementById('loginBtn');

// this array will store new users credentials
let userInfo = JSON.parse(localStorage.getItem('userLogin')) || [];

// get the span element to display the username on page
const trainerName = document.querySelector('.user-name');
const pokedexUser = document.querySelector('.pokedex-user');

if(pokedexUser) {
    pokedexUser.textContent = userInfo.name;
}

if(trainerName) {
    trainerName.textContent = userInfo.name;
}

// prevent the form from submitting by default
if(loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
    })
}

// switch to the sign up form when the sign up link is click
if(signUpLink) {
    signUpLink.addEventListener('click', function() {
        signInForm.style.display = 'none';
        signUpForm.style.display = 'block';
    })
}

// get the user data when they sign up
if(newAccountBtn) {
    newAccountBtn.addEventListener('click', function() {
        const signUpName = document.getElementById('signUpName').value;
        const signUpEmail = document.getElementById('signUpEmail').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        userInfo = {name: signUpName, email: signUpEmail, password: confirmPassword};

        localStorage.setItem('userLogin', JSON.stringify(userInfo));
        
    })
}

if(loginBtn) {
    loginBtn.addEventListener('click', function() {
        // get the value from the login input fields
        const userName = document.getElementById('userName').value;
        const userPassword = document.getElementById('userPassword').value;

        // get the p element to display an error message
        const loginError = document.getElementById('loginError');

        if(userName !== userInfo.name || userPassword !== userInfo.password) {
            loginError.textContent = 'Invalid username or password!'
        } else {
            loginError.textContent = '';
            window.location.href = "dashboard.html"
        }
        
        
    })
}

// get section to display pokemon
let pokeDisplay = document.getElementById('pokemon-display');

// get the main banner
const bannerPokemon = document.getElementById('banner-pokemon');

// get the load more pokemon button
const loadPokemonBtn = document.getElementById('more-pokemon');

// this variable will store the json object with the data from the api
let pokeApiJson = '';

// this variable holds the url for the first 20 pokemon
const pokeLink = 'https://pokeapi.co/api/v2/pokemon';

// this variable will store the info for specific pokemon
const newPokeInfo = '';

// this variable will store the link for the next set of pokemon
let nextLink = '';

// this variable will store the url for each pokemon
let pokeUrl = '';

// this array will store all the fetch pokemon data
let fetchPokeData = {};

let pokeAttacks = [];


// this array will store caught pokemon
let pokeArray = JSON.parse(localStorage.getItem('troop')) || [];

// display the number of pokemon in pokeland when the page loads
updateTotalPokemon();

// call function to load pokemon on the page
getPokemon();

// this function get the first 20 pokemon 
// and the link for the next set of pokemon
async function getPokemon() {
    // fetch the first 20 pokemon
    const pokeInfo = fetchData(pokeLink);

    // store the json into a variable
    const pokeApiJson = await pokeInfo;

    // update the next variable with the new link for the next set of pokemon
    nextLink = pokeApiJson.next;

    // get the sprites and add them to the page 
    getPokeSprite(pokeApiJson, pokeUrl);

    // call loadPokemon() with the argument as the link for the next set of pokemon
    loadPokemon(nextLink);
}

// this function fetch data from the PokeApi
async function fetchData(apiLink) {
    const response = await fetch(`${apiLink}`);
    const json = await response.json();
    return json
}

// this function get pokemon sprites
async function getPokeSprite(json, url) {
    // use a for loop to loop through the results array 
    // and get the url value from each object in the array
    for(let i = 0; i < 20; i++) {
        url = json.results[i].url;

        // fetch the data for specific pokemon
        const info = fetchData(url);
        pokeApiJson = await info;

        // access the sprites object and save a sprite to a variable
        const pokeSprite = pokeApiJson.sprites.other["official-artwork"].front_default;

        // store all the pokemon info into the array
        pokemonData = {pokemonName: pokeApiJson.name, pokeImage: pokeSprite, pokemonHeight: pokeApiJson.height, pokemonWeight: pokeApiJson.weight, pokemonMoves:[], pokemonType: ''};

        fetchPokeData[pokeApiJson.name] = pokemonData;
        
        
        // this variable will be used as a condition 
        // to get the pokemon types
        const num = 2;

        // this variable will store the pokemon types
        let pokeTypes = '';


        if(pokeApiJson.types.length < num){
            pokeTypes = pokeApiJson.types[0].type.name;
            fetchPokeData[pokeApiJson.name].pokemonType = pokeTypes;
        } else {
            pokeTypes = pokeApiJson.types[0].type.name + '/' + pokeApiJson.types[1].type.name
            fetchPokeData[pokeApiJson.name].pokemonType = pokeTypes;
        }

        console.log(pokeApiJson)
        for(let j = 0; j < 20; j++) {
            pokeAttacks.pish(pokeApiJson.moves[j].move.name);
        // console.log(pokeAttacks)

        }

        // create the html template to display pokemon
        const thumbnailHTML = `
            <div class="thumbnail" data-pokeName=${pokemonData.pokemonName}>
                <img src="${pokemonData.pokeImage}" alt="" data-pokeName=${pokemonData.pokemonName}>
                <div class="card-body">
                    <p class="pokemon-name" data-pokeName=${pokemonData.pokemonName}>${pokemonData.pokemonName}</p>
                    <p class="pokemon-description" data-pokeName=${pokemonData.pokemonName}>${pokemonData.pokemonType} type pokémon with ${pokeApiJson.moves.length} moves</p>
                </div>
            </div>`

        // add the template to the page
        if(pokeDisplay) {
            pokeDisplay.innerHTML+= thumbnailHTML;
        }
    }
    
    // get pikachu sprite
    getPikachu = fetchData(`${pokeLink}/pikachu`);
    pikachu = await getPikachu;

    // add pikachu to the main banner
    if(bannerPokemon) {
        bannerPokemon.innerHTML = `<img src="${pikachu.sprites.other["official-artwork"].front_default}" alt="" height="200px">`;
    }
    
}

// this function load more pokemon to the page when the load more btn is clicked
function loadPokemon(next) {
    if(loadPokemonBtn) {
        loadPokemonBtn.addEventListener('click', async function() {
            // fetch the data from the api with the next link provided
            const pokeInfo = fetchData(next);
            const pokeApiJson = await pokeInfo;

            // update the next variable with the new link for the next set of pokemon
            next = pokeApiJson.next;

            // get the sprites and add them to the page 
            getPokeSprite(pokeApiJson, pokeUrl);
        })
    }
}

// create an overlay for the large pokemon display
if(pokeDisplay) {
    pokeDisplay.addEventListener('click', function(event) {
        if(event.target.matches('.thumbnail') || event.target.matches('.thumbnail img') || event.target.matches('.thumbnail p')) {

            // create a div container for the overlay
            const overlay = document.createElement('div');

            // add an ID to the overlay container
            overlay.id = 'overlay';

            // get the main tag and add the div element
            document.querySelector('main').appendChild(overlay);

            // create the html for the overlay
            overlay.innerHTML= `
                <img src="${fetchPokeData[event.target.dataset.pokename].pokeImage}" alt="">
                <p><span class="pokemon-name">${fetchPokeData[event.target.dataset.pokename].pokemonName}</span> is a ${fetchPokeData[event.target.dataset.pokename].pokemonType} type Pokémon that is ${(fetchPokeData[event.target.dataset.pokename].pokemonHeight * 0.328).toFixed(2)}ft tall and weighs ${fetchPokeData[event.target.dataset.pokename].pokemonWeight * 0.22}lbs. Some of <span class="pokemon-name">${event.target.dataset.pokename}</span> attacks include ${event.target.dataset.pokemove1}, ${event.target.dataset.pokemove2}, ${event.target.dataset.pokemove3}, and ${event.target.dataset.pokemove4}.</p>

                <button id="catch-pokemon">Catch ${event.target.dataset.pokename}</button>`;

            const pokemoves = [event.target.dataset.pokemove1, event.target.dataset.pokemove2, event.target.dataset.pokemove3, event.target.dataset.pokemove4]
                                        
            // call catchPokemon() to display a message when a pokemon is caught
            catchPokemon(event.target, event.target.dataset.pokename, event.target.dataset.pokeimg, pokemoves)

            // remove the overlay 
            overlay.addEventListener('click', removeOverlay);
        }
    });
}

// this function removes the overlay
function removeOverlay() {
    this.parentNode.removeChild(this);
}

// make the catch pokemon btn functional
function catchPokemon(pokemon, name, image, moves) {
    document.getElementById('catch-pokemon').addEventListener('click', function(event) {
        // prevent the removeOverlay() from running when the button is clicked 
        event.stopPropagation();
        
        // create a message to display when a pokemon is caught
        pokemon.innerHTML += `
            <div class="caught-message">
                <img src="images/Pokeball.png" alt="" height="160px">
                <p>You caught <span class="pokemon-name">${name}</span>!</p>
            </div>`;

        // create the object with info of the caught pokemon
        const caughtPokemon = {name, image, moves};

        // push the caught pokemon object to the array
        pokeArray.push(caughtPokemon);

        // add the array to local storage
        localStorage.setItem('troop', JSON.stringify(pokeArray));
        
        // call updateTotalPokemon() to update the count in real time
        updateTotalPokemon();
    })         
}

// this function update the number of pokemon shown that are in pokeland
function updateTotalPokemon() {
    // get the element that shows the count
    const pokeCount = document.getElementById('pokeCount');

    // if that element exist on the page
    if(pokeCount) {
        // update the count
        pokeCount.textContent = pokeArray.length;
    }
}

// make the user icon functional
const togglerIcon = document.querySelector('.toggler-icon');

if(togglerIcon) {
    togglerIcon.addEventListener('click', function() {
        // get the div with the id navbarNav
        const navElement = document.getElementById('navbarNav');

        // if the classList contains open remove that class and add the class close
        // change the visibility to visible
        if(navElement.classList.contains('open')) {
            navElement.classList.add('close');
            navElement.classList.remove('open');
            navElement.style.visibility = 'visible';
        } else {
            // if the classList contains close remove that class and add the class open
            // change the visibility to hidden
            navElement.classList.remove('close');
            navElement.classList.add('open');
            navElement.style.visibility = 'hidden';
        }
    })
}

/* *********************************** Pokemon Carousel *********************************** */
// get the container to put the cards
let cardsContainer = document.getElementById('cards-container');
createCarouselCard();

// this function create card
function createCarouselCard() {
    pokeArray.forEach((pokemon) => {
        const card = document.createElement('div');
        card.classList.add('card');
    
        // add a data- attribute to each card with the corresponding pokemon name
        card.setAttribute('data-poke', `${pokemon.name}`);
    
        // add title and description inside the card
        card.innerHTML = `
            <h2 class="pokemon-name">${pokemon.name}</h2>
            <img class="caught-pokemon" src="${pokemon.image}" alt="" height="200px">
            <div class="poke-commands">
                <button id="train"><img src="images/train.svg" alt="" height="30px"></button>
                <button id="battle"><img src="images/battle.svg" alt="" height="30px"></button>
                <button id="release"><img src="images/phoenix.png" alt="" height="30px"></button>
                <button id="getInfo"><img src="images/info.png" alt="" height="30px"></button>
            </div>`;
    
        // add this card to the container
        if(cardsContainer) {
            cardsContainer.appendChild(card);
        }
    });
}

// get all cards
const allCards = document.querySelectorAll('.card');
const leftBtn = document.querySelector('.nav-arrow.left');
const rightBtn = document.querySelector('.nav-arrow.right');

let currentCard = 0;
let isSliding = false;

// this function show a specific card
function showCard(index) {
    if (isSliding) return;
    isSliding = true;

    // keep the index at a specific length
    if (index < 0) {
        currentCard = allCards.length - 1;
    } else if (index >= allCards.length) {
        currentCard = 0;
    } else {
        currentCard = index;
    }

    // show the correct card and hide others
    allCards.forEach((card, i) => {
        card.classList.remove('center');
        if (i === currentCard) {
            card.classList.add('center');            
        }
    });

    // make the arrows functional after half a second
    setTimeout(() => {
        isSliding = false;
    }, 500);
}

// add click events for arrows
if(leftBtn) {
    leftBtn.addEventListener('click', () => {
    showCard(currentCard - 1);
    });
}

if(rightBtn) {
    rightBtn.addEventListener('click', () => {
    showCard(currentCard + 1);
    });
}

// support keyboard arrow keys
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        showCard(currentCard - 1);
    } else if (event.key === 'ArrowRight') {
        showCard(currentCard + 1);
    }
});


// show the first card when the page loads
showCard(0);

// call releasePokemon() to release pokemon when the button is clicked
releasePokemon();

// this function releases a pokemon
function releasePokemon() {
    // get the release btns
    const releaseBtn = document.querySelectorAll('#release');

    // loop through the list of release btns and add a click event
    releaseBtn.forEach((button) => {
        button.addEventListener('click', function() {
            const currentCard = document.querySelector('.center');
            // filter through the array to find the matching 
            // pokemon to be removed from the array
            pokeArray = pokeArray.filter(pokemon => pokemon.name !== currentCard.dataset.poke);

            // save the updated array to local storage
            localStorage.setItem('troop', JSON.stringify(pokeArray));

            // call updateTotalPokemon() to update the count in real time
            updateTotalPokemon();
        })    
    })
}

