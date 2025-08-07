

// get the small pokemon
let smallPokemon = document.querySelectorAll('.pokemon');



// call largePokemonDisplay() to show large pokemon display 
largePokemonDisplay();

// function to create an overlay and display large pokemon and stats
function largePokemonDisplay() {
    // loop through the array of pokemon
    smallPokemon.forEach((pokeSprite) => {
        // add a click event to each pokemon
        pokeSprite.addEventListener('click', () => {
            // get the pokemon name and store it in a variable
            const pokemonName = pokeSprite.dataset.name;

            // create a div container for the overlay
            const overlay = document.createElement('div');

            // add an ID to the overlay container
            overlay.id = 'overlay';

            // get the main tag and add the div element
            document.querySelector('main').appendChild(overlay);

            // call largePokemonInfo() here to get the pokemon and their stats
            largePokemonInfo(overlay, pokeSprite, pokemonName);

            // call catchPokemon() here to display something to the user when a pokemon is caught
            catchPokemon(overlay, pokemonName, pokeSprite);

            // remove the overlay
            overlay.addEventListener('click', removeOverlay);
        });
    });
}

// function that removes the overlay
function removeOverlay() {
    this.parentNode.removeChild(this);
}

// function to generate pokemon and stats
function largePokemonInfo(overlay, currentPokemon, name) {
    overlay.innerHTML= `${currentPokemon.innerHTML}
                        <div id="pokemon-table">
                            <div id="pokeInfoChart">
                                <div class="data">
                                    <h3>Name</h3>
                                    <p>${name}</p>
                                </div>
                                <div class="data">
                                    <h3>Characteristics</h3>
                                    <p>Color</p>
                                    <p>Height</p>
                                    <p>Weight</p>
                                </div>
                                <div class="data">
                                    <h3>Abilities</h3>
                                    <p>Skill 1</p>
                                    <p>Skill 2</p>
                                    <p>Skill 3</p>
                                </div>
                                <div class="data">
                                    <h3>Breed/Group</h3>
                                    <p>Pokémon Type</p>
                                </div>
                            </div>
                            <button class="catch-pokemon-btn" id="catch-pokemon">Catch ${name}</button>
                        </div>`;
}

// function to change the innerHTML when the user click the catch pokemon btn
function catchPokemon(overlay, name, container) {
    // get the catch pokemon btn
    const pokemonButton = document.getElementById('catch-pokemon');
    // add a click event and make something happen when the button is clicked
    pokemonButton.addEventListener('click', function() {
        overlay.innerHTML= `<img src="../images/Pokeball.png" alt="" height="60px">
                            <p>${name} caught!</p>`

        // replace the pokemon with a pokeball when the pokemon is caught
        container.innerHTML= `<img src="../images/Pokeball.png" alt="" height="60px">
                            <p class="caught-pokemon">${name} caught!</p>`

        // remove the event listener from the div
        container.removeEventListener('click', largePokemonDisplay);
    })
}



