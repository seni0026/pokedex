# PokéHub

PokéHub is a web app that lets users sign up, browse Pokémon from the PokéAPI, catch them, and manage a personal collection. Built as a capstone project, this web app focuses on API integration, DOM manipulation, and local storage.

---

## Project Overview

A simple, responsive web application with two main areas:

- **Dashboard** — explore and catch Pokémon fetched from the PokéAPI.
- **Pokéland** — view and manage caught Pokémon (stats, release, train).


Data lives in `localStorage` so users keep their collection across sessions.

---

## Goal

Build a user-friendly web app to practice API integration and JavaScript patterns while delivering a clear, interactive experience for managing Pokémon.

---

## Process

- Created a system that fetch and manage stored data
- Used `fetch` with `async/await` to retrieve PokéAPI data.
- Rendered UI with template literals and updated DOM dynamically.
- Used event delegation for dynamic elements.
- Persisted user and collection data in `localStorage`.

---

## Tech Stack

- HTML5
- CSS3 + Tailwind CSS
- JavaScript (ES6)
- PokéAPI (data)
- Flowbite (UI components)
- Local Storage (persistence)

---

## Key Features

- Client side sign-up and sign-in (stored in `localStorage`)
- Pokéland: carousel view of caught Pokémon with actions (stats, release, train)
- Dashboard: browse and add Pokémon to collection
- Responsive layout for desktop and mobile

---

## Challenges & Solutions

- *Challenge:* Handling asynchronous API calls  
  *Solution:* This was my first time working with APIs, so I had to learn how to properly use `fetch()` and handle promises using `async/await`. I also implemented error handling to manage failed requests.

- *Challenge:* I noticed when the sign up link was  clicked, the HTML generated onto the page then quickly disappeared.  
  *Solution:* By using preventDefault(), I was able to stop the form from resorting to its natural behavior.

- *Challenge:* Duplicate Pokémon being added to pokeArray when the user clicked "Catch" multiple times.  
  *Solution:* I used some() method to check if a Pokémon was already caught before adding it to the collection.

- *Challenge:* Event listeners not being triggered as expected.  
  *Solution:* Used event delegation by attaching listeners to parent containers (e.g., cardsContainer and pokeDisplay) and identifying the clicked element using event.target.closest().

- *Challenge:* The carousel did not update dynamically after releasing a Pokémon.  
  *Solution:* This was a sore point for me because even though I tried calling createCarouselCard() to recreate the cards it still wasn't working. So I ennded up clearing the container first then call createCarouselCard() to recreate the cards and use window.location.reload() to refresh the page and show the updated carousel cards.

---

## What I Learned

- Practical use of `async/await` and error handling for API calls.
- Event delegation for robust interaction handling on dynamic content.
- Using `localStorage` for simple persistence without a backend.
- Debugging and problem solving skills.

---

## Links

- Repo: [https://github.com/yourusername/pokehub]  
