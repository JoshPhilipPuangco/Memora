# AI Usage

## Section 1 — AI-Assisted Development

### Create Deck HTML Structure

- **AI Tool:** ChatGPT
- **What I asked:** Help create the HTML structure for the Create Deck page.
- **What it generated:** The basic page structure, including the deck title field, question and answer fields, card container, and buttons.
- **What I changed/tested:** I tested the page and adjusted the structure as needed.
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/c34cc32

### Create Deck CSS

- **AI Tool:** ChatGPT
- **What I asked:** Help create CSS for the Create Deck page.
- **What it generated:** Styling for the title, form layout, and textareas.
- **What I changed/tested:** I tested the layout in the browser and kept the page-specific styles in `create-deck.css`.
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/c34cc32

### Add Card JavaScript

- **AI Tool:** ChatGPT
- **What I asked:** Help make the Add another card button create a new card.
- **What it generated:** JavaScript that creates a new card block and adds it to the card container.
- **What I changed/tested:** I tested the button in the browser and fixed the initial issue where the new card was not being added.
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/c34cc32

### Dynamic Card Numbering

- **AI Tool:** ChatGPT
- **What I asked:** Help give dynamically created question and answer fields unique IDs.
- **What it generated:** A `cardNumber` variable that increases whenever a new card is created.
- **What I changed/tested:** I tested multiple cards and checked that their question and answer IDs were different.
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/c34cc32

### Remove Card Functionality

- **AI Tool:** ChatGPT
- **What I asked:** Help add a Remove Card button for dynamically created cards.
- **What it generated:** An event listener on the card container that removes the selected card.
- **What I changed/tested:** I tested removing cards and fixed the initial issue caused by duplicate IDs.
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/c34cc32

### Form and Cancel Behavior

- **AI Tool:** ChatGPT
- **What I asked:** Help prevent the Create Deck form from reloading the page and make the Cancel button return to the previous page.
- **What it generated:** A submit event listener using `preventDefault()` and a Cancel event listener using `history.back()`.
- **What I changed/tested:** I tested both buttons in the browser.
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/c34cc32


## Section 2 — AI Mistakes / Cases Where AI Output Was Not Used Directly

### Case 1 - My Decks JavaScript Outside Course Coverage

- **What it gave me:** JavaScript functionality for the My Decks page that used concepts beyond what was covered in the course.
- **What was wrong with it:** The implementation was more advanced than the JavaScript concepts required for the course.
- **What I did instead:** The code was reviewed and adjusted to use concepts that could be explained using the course material.

### Case 2 - Study Mode Script Outside Course Coverage

- **What it gave me:** A JavaScript implementation for loading a selected deck in Study Mode.
- **What was wrong with it:** Some of the implementation used JavaScript concepts that were outside the course coverage.
- **What I did instead:** The implementation was reviewed and kept understandable using concepts that could be explained by the group.

### Case 3 - Incorrect Form Selector

- **What it gave me:** An incorrect way of selecting the form using the element ID selector format.
- **What was wrong with it:** The form uses the class `create-deck-form`, so the selector needs to use `querySelector` with `.create-deck-form`.
- **What I did instead:** I used `document.querySelector(".create-deck-form")`.
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/c34cc32


## Section 3 — Individual Contributions

### JoshPhilipPuangco

#### Written by me

##### Home Page

- **File:** `index.html`
- **What it does and why it is built this way:** This file creates the main Home page of Memora and provides navigation to the other parts of the application.

##### My Decks

- **File:** `my-decks.html`
- **What it does and why it is built this way:** This file provides the page where users can view their available decks and access the study functionality.

##### Study Mode

- **File:** `study-mode.html`
- **What it does and why it is built this way:** This file provides the interface for studying flashcards from a selected deck.

### CharlesM-27

#### Written by me

##### Create Deck HTML

- **File:** `create-deck.html`
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/c34cc32
- **What it does and why it is built this way:** This file creates the Create Deck page structure. It contains the deck title field, question and answer fields, card container, and buttons. It reuses the shared classes from `shared.css` and uses Create Deck-specific classes where needed.

##### Create Deck CSS

- **File:** `create-deck.css`
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/c34cc32
- **What it does and why it is built this way:** This file contains styling specific to the Create Deck page. It controls the title alignment, form layout, and textarea size while leaving reusable component styles in `shared.css`.

##### Create Deck JavaScript

- **File:** `create-deck.js`
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/c34cc32
- **What it does and why it is built this way:** This file provides the page interactions. It adds new cards, gives their fields unique numbers, removes cards, handles Cancel, and prevents the form from reloading the page when submitted.

#### The AI-written part I understand best

##### Dynamic Card Creation

- **File:** `create-deck.js`
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/c34cc32
- **What it does and why we kept it:** The JavaScript creates new card sections when Add another card is clicked. The `cardNumber` variable increases so each new question and answer gets a unique ID. The Remove Card event listener allows dynamically created cards to be removed. I tested these functions in the browser and understand how the event listeners, DOM elements, and card container work together.

### Tsuyin06

#### Written by me

##### Create Deck Page Script

- **File:** `create-deck.js`
- **What it does and why it is built this way:** The script handles the Create Deck page interactions, including adding and removing cards and handling the form buttons.

##### Study Mode Deck Loading

- **File:** `study-mode.js`
- **What it does and why it is built this way:** The script loads the selected deck into Study Mode so that the user can study the flashcards from the chosen deck.