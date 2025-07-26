

// get the small pokemon
let smallPokemon = document.querySelectorAll('.pokemon');
// get the container with the user icon and name and make something happen when user clicks it
document.querySelector('.toggler-icon').addEventListener('click', menuToggler);


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

// function to toggle the menu when clicked
function menuToggler() {
    // get the div with the id navbarNav
    const navElement = document.getElementById('navbarNav');

    // use a forEach() to loop through the classlist
    navElement.classList.forEach((navClass) => {
        // if the classList contains open remove that class and add the class close
        // change the visibility to visible
        if(navClass == 'open') {
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

const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const leftArrow = document.querySelector(".nav-arrow.left");
const rightArrow = document.querySelector(".nav-arrow.right");
let currentIndex = 0;
let isAnimating = false;

function updateCarousel(newIndex) {
	if (isAnimating) return;
	isAnimating = true;

	currentIndex = (newIndex + cards.length) % cards.length;

	cards.forEach((card, i) => {
		const offset = (i - currentIndex + cards.length) % cards.length;

		card.classList.remove(
			"center",
			"left-1",
			"left-2",
			"right-1",
			"right-2",
			"hidden"
		);

		if (offset === 0) {
			card.classList.add("center");
		} else if (offset === 1) {
			card.classList.add("right-1");
		} else if (offset === 2) {
			card.classList.add("right-2");
		} else if (offset === cards.length - 1) {
			card.classList.add("left-1");
		} else if (offset === cards.length - 2) {
			card.classList.add("left-2");
		} else {
			card.classList.add("hidden");
		}
	});

	dots.forEach((dot, i) => {
		dot.classList.toggle("active", i === currentIndex);
	});

	setTimeout(() => {
		isAnimating = false;
	}, 800);
}

leftArrow.addEventListener("click", () => {
	updateCarousel(currentIndex - 1);
});

rightArrow.addEventListener("click", () => {
	updateCarousel(currentIndex + 1);
});

dots.forEach((dot, i) => {
	dot.addEventListener("click", () => {
		updateCarousel(i);
	});
});

cards.forEach((card, i) => {
	card.addEventListener("click", () => {
		updateCarousel(i);
	});
});

document.addEventListener("keydown", (e) => {
	if (e.key === "ArrowLeft") {
		updateCarousel(currentIndex - 1);
	} else if (e.key === "ArrowRight") {
		updateCarousel(currentIndex + 1);
	}
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
	touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
	touchEndX = e.changedTouches[0].screenX;
	handleSwipe();
});

function handleSwipe() {
	const swipeThreshold = 50;
	const diff = touchStartX - touchEndX;

	if (Math.abs(diff) > swipeThreshold) {
		if (diff > 0) {
			updateCarousel(currentIndex + 1);
		} else {
			updateCarousel(currentIndex - 1);
		}
	}
}

updateCarousel(0);
