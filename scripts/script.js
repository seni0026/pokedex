/************************* VARIABLES ***********************************/

// form variables
const signUpLink = document.getElementById('sign-up');
const newAccountBtn = document.getElementById('newUser');
const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signUp');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('loginError');
const  signUpError = document.getElementById('signUpError');
const loginBtn = document.getElementById('loginBtn');

// this array will store new users credentials
let userInfo = JSON.parse(localStorage.getItem('userLogin')) || [];

// get the span element to display the username on page
const pokedexUser = document.querySelectorAll('.pokedex-user');

// Pokémon display variables
let pokeDisplay = document.getElementById('pokemon-display');
const bannerPokemon = document.getElementById('banner-pokemon');
const loadPokemonBtn = document.getElementById('more-pokemon');
const spinner = document.getElementById('loading-spinner');

// API & data variables
const pokeLink = 'https://pokeapi.co/api/v2/pokemon';
let pokeApiJson = '';
const newPokeInfo = '';
let nextLink = '';
let pokeUrl = '';
// object to store fetched pokemon data
let fetchPokeData = {};
// object to store pokemon data
let pokemonData = {};

// Pokemon in battle
let battlePokemon = JSON.parse(localStorage.getItem('battlePokemon')) || [];


// this array stores the caught pokemon objects
let pokeArray = JSON.parse(localStorage.getItem('troop')) || [];
// this array stores the names of pokemon currently in training.
let trainingTroop = JSON.parse(localStorage.getItem('trainingTroop')) || [];
// the container for the carousel cards
let cardsContainer = document.querySelector('.cards-container');

/**************************** When the page loads ****************************/

// set user name on page load
if(pokedexUser) {
    pokedexUser.forEach(user => {
        // check if userInfo and userInfo.name exist
        if (userInfo && userInfo.name) {
            // set the user name
            user.textContent = userInfo.name;
        } else {
            user.textContent = 'Trainer';
        }
    });
}

// prevent the form from submitting by default
if(loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
    })
}

// call these functions on page load
updateTotalPokemon();
getPokemon();
createCarouselCard();
releasePokemon();
statsBtn();
toggleTraining(); 


/********************************** FORM **************************************/

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
        // get the value from the sign up input fields
        const signUpName = document.getElementById('signUpName').value;
        const signUpEmail = document.getElementById('signUpEmail').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const signUpPassword = document.getElementById('signUpPassword').value;

        // ensure all fields are filled
        if(!signUpName || !signUpEmail || !signUpPassword){
            signUpError.textContent = 'Please fill in all fields!';

            // ensure the passwords are the same
        }else if(confirmPassword !== signUpPassword) {
            signUpError.textContent = 'Passwords do not match!';
        }else {
            // clear error message
            signUpError.textContent = '';

            // store the user info in an object
            userInfo = {name: signUpName, email: signUpEmail, password: confirmPassword};

            // store the object with the user info in local storage
            localStorage.setItem('userLogin', JSON.stringify(userInfo));

            // redirect the user to the success page after signing up
            window.location.href = "success.html"
        }
    })
}

// validate the login form
if(loginBtn) {
    loginBtn.addEventListener('click', function() {
        // get the value from the login input fields
        const userName = document.getElementById('userName').value;
        const userPassword = document.getElementById('userPassword').value;

        // check if the user info exist in local storage
        if(userName !== userInfo.name || userPassword !== userInfo.password) {
            loginError.textContent = 'Invalid username or password!'
        } else {
            // clear error message
            loginError.textContent = '';

            // redirect the user to the dashboard after logging in
            window.location.href = "dashboard.html"
        }
        
        
    })
}

/***************************** DASHBOARD *********************************/

// this function creates the pokemon info object
function createPokemonDataObject(pokeApiJson) {
        // access the sprites object and save a sprite to a variable
        const pokeSprite = pokeApiJson.sprites.other["official-artwork"].front_default;

        // store all the pokemon info into an object
        pokemonData = {
            name: pokeApiJson.name,  
            image: pokeSprite, 
            height: pokeApiJson.height, 
            weight: pokeApiJson.weight, 
            moves:[], 
            type: ''
        };        
        
        // this variable will be used as a condition 
        // to get the pokemon types
        const types = 2;

        // this variable will store the pokemon types
        let pokeTypes = '';

        // get the pokemon types
        if(pokeApiJson.types.length < types){
            pokeTypes = pokeApiJson.types[0].type.name;
        } else {
            pokeTypes = pokeApiJson.types[0].type.name + '/' + pokeApiJson.types[1].type.name
        }

        // add the pokemon type to the pokemonData object
        pokemonData.type = pokeTypes;

        // Get up to 5 moves
        // Use Math.min to specify the number of moves
        // Math.min compares two values and returns the smaller one
        const pokeMoves = Math.min(5, pokeApiJson.moves.length);
        for (let j = 0; j < pokeMoves; j++) {
            pokemonData.moves.push(pokeApiJson.moves[j].move.name);
        }

        // add the pokemon info to the fetchPokeData object
        fetchPokeData[pokemonData.name] = pokemonData;

        return pokemonData;
}

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
    try {
        const response = await fetch(apiLink);
        const json = await response.json();
        if (!response.ok) {
            throw new Error('Network response was not ok');
        } 
        return json;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
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

        // create the pokemon data object
        const pokemonData = createPokemonDataObject(pokeApiJson);

        // create the html template to display pokemon
        const thumbnailHTML = `
            <div class="thumbnail-wrapper group relative bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer w-60" data-pokeName=${pokemonData.name}>
                <div class="thumbnail" data-pokeName=${pokemonData.name}>
                    <div class="bg-gray-700 p-4">
                        <img src="${pokemonData.image}" alt="${pokemonData.name}" class="h-40 w-full object-contain" data-pokeName=${pokemonData.name}>
                    </div>
                    <div class="p-4">
                        <p class="pokemon-name card-title text-xl font-bold capitalize text-yellow-400" data-pokeName=${pokemonData.name}>${pokemonData.name}</p>
                        <p class="pokemon-description text-sm text-gray-300 mt-1" data-pokeName=${pokemonData.name}>${pokemonData.type} type pokémon with ${pokeApiJson.moves.length} moves</p>
                    </div>
                </div>
                <span id="${pokemonData.name}" class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-700 to-red-900 text-white p-2 text-center hidden items-center justify-center gap-2"></span>
            </div>`;

        // add the template to the page
        if(pokeDisplay) {
            pokeDisplay.innerHTML+= thumbnailHTML;
        }

        // add image to the main banner
        if(bannerPokemon) {
            bannerPokemon.innerHTML = `<img src="${pokemonData.image}" alt="${pokemonData.name}" class="h-24 w-24 object-contain filter drop-shadow(0 0 0.5rem #facc15)">`;
        }
    }

    // show which pokemon are already caught
    updateCaughtStatus();

    // hide the spinner after 1 second delay
    if (spinner) {
        setTimeout(() => {
            spinner.style.display = 'none';
            // clear the display area if it still contains the spinner
            if (pokeDisplay && pokeDisplay.contains(spinner)) pokeDisplay.innerHTML = '';
        }, 1000);
    }
}

// this function load more pokemon to the page when the load more btn is clicked
function loadPokemon(next) {
    if(loadPokemonBtn) {
        loadPokemonBtn.addEventListener('click', async function() {
            // disable button and show loading text while fetching data
            loadPokemonBtn.textContent = 'Loading...';
            loadPokemonBtn.disabled = true;

            // fetch the data from the api with the next link provided
            const pokeInfo = fetchData(next);
            const pokeApiJson = await pokeInfo;

            // update the next variable with the new link for the next set of pokemon
            next = pokeApiJson.next;
            
            // get the sprites and add them to the page 
            getPokeSprite(pokeApiJson, pokeUrl);

            // update caught status for newly loaded pokemon.
            updateCaughtStatus();

            // re-enable button and reset text
            loadPokemonBtn.disabled = false;
            loadPokemonBtn.textContent = 'more Pokémon...';

        })
    }
}

/****************************** OVERLAY ************************************/

// create an overlay for the large pokemon display
function createOverlay(container) {
    // check if the target element exists
    if (container) {
        // get the Pokémon name from the data attribute
        const pokename = container.dataset.pokename;

        // get the pokemon data from fetchPokeData
        let pokemon = fetchPokeData[pokename];

        // if not found in fetchPokeData, check in pokeArray
        if (!pokemon) {
            pokemon = pokeArray.find((poke) => poke.name === pokename);
        }
        

        if (pokemon) {
            // create a div container for the overlay
            const overlay = document.createElement('div'); 
            overlay.id = 'overlay';
            overlay.className = 'fixed inset-0 bg-gray-900/90 flex flex-col justify-center items-center z-50 p-4';
            
            // create the HTML for the overlay
            overlay.innerHTML = `
                <div class="bg-gray-800 rounded-lg shadow-xl max-w-md w-full text-center p-6 relative animate-jump-in">
                    <img src="${pokemon.image}" alt="${pokemon.name}" class="h-150 mx-auto -mt-24 filter drop-shadow(0 0 0.75rem #facc15)">
                    <p class="mt-4 text-gray-300 leading-relaxed">
                        <span class="pokemon-name font-bold capitalize text-yellow-400">${pokemon.name}</span> is a <span class="font-semibold">${pokemon.type}</span> type Pokémon that is <span class="font-semibold">${(pokemon.height * 0.328).toFixed(2)}ft</span> tall and weighs <span class="font-semibold">${(pokemon.weight * 0.22).toFixed(2)}lbs</span>.
                        Some of its moves include: <span class="font-semibold">${pokemon.moves.join(', ')}</span>.
                    </p>                    
                    ${
                        // only show the catch button if on the dashboard page
                        window.location.pathname.includes('dashboard.html')
                            ? `<button id="catch-pokemon" class="mt-6 w-1/2 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center capitalize">Catch ${pokemon.name}</button>` : ''
                    }
                </div>`;                

            // append the overlay to the main tag
            document.querySelector('main').appendChild(overlay);

            // add functionality to the catch pokemon button
            catchPokemon(pokemon.name, pokemon.image, pokemon.moves, pokemon.type, pokemon.weight, pokemon.height);

            // add event listener to remove the overlay when clicked
                overlay.addEventListener('click', removeOverlay)
        }
    }
}

// add event listener to the pokeDisplay container
if (pokeDisplay) {
    pokeDisplay.addEventListener('click', function (event) {
        // get the thumbnail-wrapper element
        const thumbnail = event.target.closest('.thumbnail-wrapper');

        if (thumbnail) {
            // call createOverlay() to create the overlay
            createOverlay(thumbnail);
        }
    });
}

// this function removes the overlay
function removeOverlay() {
    this.parentNode.removeChild(this);
}

// make the catch pokemon btn functional
function catchPokemon(name, image, moves, type, weight, height) {
    // get the catch button
    const catchBtn = document.getElementById('catch-pokemon');

    if (catchBtn) {
        catchBtn.addEventListener('click', function(event) {
            // prevent the removeOverlay() from running when the button is clicked 
            event.stopPropagation();
            
            // check if the pokemon is already caught to prevent duplicates.
            const isCaught = pokeArray.some(pokemon => pokemon.name === name);

            if (!isCaught) {
                // create the object with info of the caught pokemon.
                const caughtPokemon = {name, image, moves, type, weight, height};

                // push the caught pokemon object to the array.
                pokeArray.push(caughtPokemon);

                // add the array to local storage as troop
                localStorage.setItem('troop', JSON.stringify(pokeArray));
                
                // call updateTotalPokemon() to update the count in real time
                updateTotalPokemon();

                // mark the pokemon as caught on the dashboard using the dynamic state function.
                updateCardState(name, 'caught');

                // close the overlay after catching the pokemon
                const overlay = document.getElementById('overlay');
                if (overlay) {
                    overlay.remove();
                }
            }
        })
    }
}

// this function update the number of pokemon shown that are in pokeland
function updateTotalPokemon() {
    // get the element that shows the pokemon count
    const pokeCount = document.getElementById('pokeCount');

    // if that element exist on the page
    if(pokeCount) {
        // update the count
        pokeCount.textContent = pokeArray.length;
    }
}

// this function checks which pokemon is caught and call
// updateCardState() to update their style
function updateCaughtStatus() {
    if (!pokeDisplay) return;

    // get the names of all caught pokemon
    const caughtPokemonNames = pokeArray.map(p => p.name);
    // get all pokemon cards on the dashboard
    const allPokemonCards = document.querySelectorAll('.thumbnail-wrapper');

    // loop through all the cards and update their style if they are caught
    allPokemonCards.forEach(card => {
        // get the pokemon name from the data attribute
        const pokemonName = card.dataset.pokename;
        // if the pokemon name is in the caughtPokemonNames array, 
        // update its style
        if (caughtPokemonNames.includes(pokemonName)) {
            updateCardState(pokemonName, 'caught');
        }
    });
}

// this function updates the style of a pokemon card 
// for both caught and training
function updateCardState(pokemonName, state) {
    if (state === 'caught') {
        // find the card with the matching pokemon name
        const dashboardCard = document.querySelector(`.thumbnail-wrapper[data-pokeName="${pokemonName}"]`);
        // if the card exist, update its style
        if (dashboardCard) {
            dashboardCard.classList.add('opacity-50', 'pointer-events-none');

            // show the caught badge
            const badge = dashboardCard.querySelector(`#${pokemonName}`);
            if (badge) {
                badge.innerHTML = `<img src="images/Pokeball.png" alt="Caught" class="h-5 w-5"><span class="capitalize">${pokemonName}</span> caught!`;
                badge.classList.remove('hidden');
                badge.classList.add('flex');
            }
        }
    }

    // update the style of the pokeland carousel card
    // get the card with the matching pokemon name
    const pokelandCard = document.querySelector(`[data-carousel-item][data-poke="${pokemonName}"]`);

    if (pokelandCard) {
        // get the elements to be updated
        const cardContent = pokelandCard.querySelector('.bg-gray-800');
        const image = pokelandCard.querySelector('.caught-pokemon');
        const trainingBadge = pokelandCard.querySelector('.training-badge');
        // const battleBtn = pokelandCard.querySelector('#battle');
        const releaseBtn = pokelandCard.querySelector('#release');

        // apply training styles and disable buttons
        if (state === 'training') {
            cardContent.classList.add('border-4', 'border-blue-500');
            image.classList.add('opacity-40');
            trainingBadge.classList.remove('hidden');
            // battleBtn.disabled = true;
            releaseBtn.disabled = true;
            // battleBtn.classList.add('opacity-50', 'cursor-not-allowed');
            releaseBtn.classList.add('opacity-50', 'cursor-not-allowed');

        // update the style of the pokeland carousel card 
        // when training is removed
        } else if (state === 'remove_training') {
            cardContent.classList.remove('border-4', 'border-blue-500');
            image.classList.remove('opacity-40');
            trainingBadge.classList.add('hidden');
            // battleBtn.disabled = false;
            releaseBtn.disabled = false;
            // battleBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            releaseBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }
}

/************************ POKELAND CAROUSEL ******************************/

// this function creates carousel cards for each pokemon in the pokeArray
function createCarouselCard() {
    // loop through the pokeArray and create a card for each pokemon
    pokeArray.forEach((pokemon) => {
        const card = document.createElement('div');

        // add Flowbite classes and attributes
        card.className = 'hidden duration-1000 ease-in-out px-3 md:overflow-hidden';
        card.setAttribute('data-carousel-item', '');
    
        // add a data attribute to identify the pokemon
        card.setAttribute('data-poke', `${pokemon.name}`);

        // add title and description inside the card
        card.innerHTML = `
            <div class="bg-gray-800 rounded-lg shadow-lg p-4 transition-all duration-300 relative">
                <h2 class="pokemon-name text-2xl text-center font-bold capitalize text-yellow-400">${pokemon.name}</h2>
                <div class="relative my-4">
                    <img class="caught-pokemon w-full md:w-1/2 mx-auto h-48 object-contain transition-opacity duration-300" src="${pokemon.image}" alt="${pokemon.name}">
                    <div class="md:w-1/2 mx-auto training-badge hidden absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                        <p class="text-white text-xl font-bold">Training...</p>
                    </div>
                </div>
                <div class="poke-commands flex justify-around md:p-10">
                    <button id="train" class="p-2 bg-blue-600 rounded-full hover:bg-blue-700 focus:ring-4 focus:ring-blue-500" data-tooltip-target="tooltip-train-${pokemon.name}" data-tooltip-placement="bottom"><img src="images/train.svg" alt="Train" class="h-6 w-6"></button>
                    <div id="tooltip-train-${pokemon.name}" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-blue-700 rounded-lg shadow-xs opacity-0 tooltip dark:bg-blue-700">
                        Train ${pokemon.name} to prepare for battle!
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                    <button id="battle" class="p-2 bg-green-600 rounded-full hover:bg-green-700 focus:ring-4 focus:ring-green-500 cursor-not-allowed opacity-40" disabled="true" data-tooltip-target="tooltip-battle-${pokemon.name}" data-tooltip-placement="bottom"><img src="images/battle.svg" alt="Battle" class="h-6 w-6"></button>
                    <div id="tooltip-battle-${pokemon.name}" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-green-700 rounded-lg shadow-xs opacity-0 tooltip dark:green-700">
                        Battle with ${pokemon.name} (coming soon!)
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                    <button id="release" class="p-2 bg-red-600 rounded-full hover:bg-red-700 focus:ring-4 focus:ring-red-500" data-tooltip-target="tooltip-release-${pokemon.name}" data-tooltip-placement="bottom"><img src="images/phoenix.png" alt="Release" class="h-6 w-6"></button>
                    <div id="tooltip-release-${pokemon.name}" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-red-700 rounded-lg shadow-xs opacity-0 tooltip dark:bg-red-700">
                        Release <span class="capitalize">${pokemon.name}</span>
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                    <button id="getInfo" data-pokename="${pokemon.name}" class="p-2 bg-yellow-500 rounded-full hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-400" data-tooltip-target="tooltip-info-${pokemon.name}" data-tooltip-placement="bottom"><img src="images/info.png" alt="Info" class="h-6 w-6"></button>
                    <div id="tooltip-info-${pokemon.name}" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-yellow-600 rounded-lg shadow-xs opacity-0 tooltip dark:bg-yellow-600">
                        View <span class="capitalize">${pokemon.name}</span>'s stats
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
            </div>`;
            
            // append the card to the cards container
            if(cardsContainer) {
                cardsContainer.appendChild(card);
            }
        });

    // check which pokemon is in training and apply style
    if (cardsContainer) {
        trainingTroop.forEach(name => updateCardState(name, 'training'));
    }

    // if there are no pokemon in the pokeArray, show a message
    if(cardsContainer) {
        if(pokeArray.length == 0) {
            cardsContainer.innerHTML = `
                <p class="text-white text-center">No Pokémon caught! Go catch some and become a Pokémon Master!</p>
            `;
        }
    }
}

// this function release pokemon
function releasePokemon() {
    // add event listener to the cards container
    if (cardsContainer) {
        cardsContainer.addEventListener('click', function (event) {
            // check if the clicked element matches the release btn
            // the closest() method traverses the element and its parents
            // until it finds a node that matches the condition
            if (event.target.closest('#release')) {
                // get the current card being shown
                const currentCard = event.target.closest('[data-carousel-item]');
                
                if (currentCard) {
                    // get the pokemon name from the current card
                    const pokemonname = currentCard.dataset.poke;

                    // filter the pokeArray to remove the released pokemon
                    pokeArray = pokeArray.filter((pokemon) => pokemon.name !== pokemonname);

                    // update local storage with the updated array
                    localStorage.setItem('troop', JSON.stringify(pokeArray));

                    // update the total pokemon count
                    updateTotalPokemon();

                    // clear the cards container and recreate the carousel
                    cardsContainer.innerHTML = '';
                    createCarouselCard();

                    // refresh the page to reset the carousel
                    window.location.reload();
                }
            }
        });
    }
}

// this function toggles the training state for a pokemon 
// when the train button is click
function toggleTraining() {
    if (cardsContainer) {
        // add event listener to the cards container
        cardsContainer.addEventListener('click', function(event) {
            // check if the clicked element is the train button
            const trainButton = event.target.closest('#train');
            if (trainButton) {
                // get the current card being shown
                const currentCard = event.target.closest('[data-carousel-item]');
                if (currentCard) {
                    // get the pokemon name from the current card
                    const pokemonName = currentCard.dataset.poke;
                    
                    // check if the pokemon is already in training
                    const isTraining = trainingTroop.includes(pokemonName);
                    if (isTraining) {
                        // if already training,
                        // remove it from the array and update the card's state.
                        trainingTroop = trainingTroop.filter(name => name !== pokemonName);
                        updateCardState(pokemonName, 'remove_training');
                    } else {
                        // if not training, 
                        // add it to the array and update the card's state
                        trainingTroop.push(pokemonName);
                        updateCardState(pokemonName, 'training');
                    }

                    // save the updated training list to localStorage
                    localStorage.setItem('trainingTroop', JSON.stringify(trainingTroop));
                }
            }
        });
    }
}

// make stats btn functional
function statsBtn() {
    // add event listener to the cards container
    if (cardsContainer) {
        cardsContainer.addEventListener('click', (event) => {
            // check if the clicked element is the stats button
            const statsButton = event.target.closest('#getInfo');
            
            if (statsButton) {
                // call createOverlay() with the statsButton as the target
                createOverlay(statsButton);
            }
        });
    }
}