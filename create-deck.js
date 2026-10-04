// Create Deck page. Also used as the Edit Deck page: my-decks.js links here
// with ?deck=<id>, and then the form is filled with that deck and saving
// updates it instead of adding a new one.

const STORAGE_KEY = "memora_decks";
const USER_KEY = "currentUser"; // written by login.js

let cardNumber = 1;

const pageMain = document.querySelector(".page-container");
const createDeckForm = document.querySelector(".create-deck-form");
const addCardButton = document.getElementById("add-card");
const cardsContainer = document.getElementById("card-container");
const cancelButton = document.getElementById("cancel-deck");
const deckTitleInput = document.getElementById("deck-title");
const pageTitle = document.querySelector(".create-deck-title");
const saveButton = document.querySelector("button[type='submit']");

// Set when editing an existing deck, null when creating a new one.
let editingDeckId = new URLSearchParams(window.location.search).get("deck");

// ---- Login check ----
function isLoggedIn() {
    try {
        return localStorage.getItem(USER_KEY) !== null;
    } catch (error) {
        console.error("Could not read the current user from storage:", error);
        return false;
    }
}

// ---- Storage ----
function loadDecks() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const decks = raw ? JSON.parse(raw) : [];
        return Array.isArray(decks) ? decks : [];
    } catch (error) {
        console.error("Could not read decks from storage:", error);
        return [];
    }
}

// ---- Error message ----
// Only one field is flagged at a time. The message is a .form-error line
// added at the bottom of that field's .form-field, so it shows right under
// the empty box.
let flaggedField = null;
let flaggedMessage = null;

function showError(field, message) {
    flaggedField = field;
    flaggedField.classList.add("is-invalid");

    flaggedMessage = document.createElement("p");
    flaggedMessage.classList.add("form-error");
    flaggedMessage.textContent = message;
    flaggedField.parentElement.appendChild(flaggedMessage);

    // Scrolls the box into view if it is off-screen and puts the cursor in it.
    flaggedField.focus();
}

function clearError() {
    if (flaggedField) {
        flaggedField.classList.remove("is-invalid");
        flaggedMessage.remove();
        flaggedField = null;
        flaggedMessage = null;
    }
}

// Shows the error for the first empty field (title, then each card's
// question and answer in page order). Returns true if one was found.
function showFirstEmptyField() {
    if (deckTitleInput.value.trim() === "") {
        showError(deckTitleInput, "Please enter a deck title.");
        return true;
    }

    const cardBlocks = cardsContainer.querySelectorAll(".card-block");

    for (let i = 0; i < cardBlocks.length; i++) {
        const textareas = cardBlocks[i].querySelectorAll("textarea");

        if (textareas[0].value.trim() === "") {
            showError(textareas[0], "Please fill in the question for card " + (i + 1) + ".");
            return true;
        }

        if (textareas[1].value.trim() === "") {
            showError(textareas[1], "Please fill in the answer for card " + (i + 1) + ".");
            return true;
        }
    }

    return false;
}

// ---- Cards ----
// Every saved card has a unique id, so Study Mode can save a mark onto the
// right card even if the cards were edited in another tab. The position is in
// the id because cards saved in the same millisecond share the time.
// study-decks.js builds ids in the same format (giveCardsIds). The pages share
// no JS file, so keep the two in sync by hand.
function makeCardId(position) {
    return "card_" + Date.now() + "_" + position + "_" + Math.floor(Math.random() * 10000);
}

// Builds one Question/Answer block. Text goes in through .value (never
// innerHTML) because it is typed by the user. An existing card brings its id
// (kept in data-id so saving keeps it); a new card has none until it is saved.
function createCardBlock(question, answer, reviewed, id) {
    cardNumber++;

    const newDiv = document.createElement("div");
    newDiv.classList.add("card-block");
    newDiv.setAttribute("data-reviewed", reviewed ? "true" : "false");
    newDiv.setAttribute("data-id", id || "");

    newDiv.innerHTML = `
        <div class="form-field">
            <label for="question-${cardNumber}">Question</label>
            <textarea
                id="question-${cardNumber}"
                name="question-${cardNumber}"
                placeholder="Enter your question"
                required
            ></textarea>
        </div>

        <div class="form-field">
            <label for="answer-${cardNumber}">Answer</label>
            <textarea
                id="answer-${cardNumber}"
                name="answer-${cardNumber}"
                placeholder="Enter the answer"
                required
            ></textarea>
        </div>

        <button type="button" class="btn-secondary remove-card">
            Remove Card
        </button>
    `;

    const textareas = newDiv.querySelectorAll("textarea");
    textareas[0].value = question;
    textareas[1].value = answer;

    cardsContainer.appendChild(newDiv);
}

// ---- Edit mode: fill the form with the deck being edited ----
if (editingDeckId) {
    const deck = loadDecks().find(function(d) {
        return d.id === editingDeckId;
    });

    if (deck) {
        pageTitle.textContent = "Edit Deck";
        saveButton.textContent = "Save changes";
        deckTitleInput.value = deck.title;

        // Replace the empty starter block with the deck's own cards.
        cardsContainer.innerHTML = "";
        const cards = Array.isArray(deck.cards) ? deck.cards : [];
        cards.forEach(function(card) {
            createCardBlock(card.question, card.answer, card.reviewed, card.id);
        });

        // A deck with no cards still needs one block to type into.
        if (cards.length === 0) {
            createCardBlock("", "", false, "");
        }
    } else {
        // Unknown id (deleted deck, old link): behave like a new deck.
        editingDeckId = null;
    }
}

// AdD
addCardButton.addEventListener("click", function() {
    createCardBlock("", "", false, "");
});

// CaNCEL
cancelButton.addEventListener("click", function() {
    history.back();
});

// SuBMIT
createDeckForm.addEventListener("submit", function(event) {
    event.preventDefault();
    clearError();

    // Nothing is saved while a title, question, or answer is empty.
    if (showFirstEmptyField()) {
        return;
    }

    // Same deck shape and storage key that my-decks.js reads.
    const cards = [];
    const cardBlocks = cardsContainer.querySelectorAll(".card-block");

    cardBlocks.forEach(function(block, i) {
        const textareas = block.querySelectorAll("textarea");
        // Keep the card's id; a new card (or an old one saved before cards
        // had ids) gets one now.
        let cardId = block.getAttribute("data-id");
        if (cardId === "") {
            cardId = makeCardId(i);
        }
        cards.push({
            id: cardId,
            question: textareas[0].value.trim(),
            answer: textareas[1].value.trim(),
            reviewed: block.getAttribute("data-reviewed") === "true"
        });
    });

    const title = deckTitleInput.value.trim();
    const decks = loadDecks();

    if (editingDeckId) {
        const deck = decks.find(function(d) {
            return d.id === editingDeckId;
        });
        deck.title = title;
        deck.cards = cards;
    } else {
        decks.push({
            id: "deck_" + Date.now() + "_" + Math.floor(Math.random() * 10000),
            title: title,
            cards: cards,
            lastStudied: null
        });
    }

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    } catch (error) {
        console.error("Could not save the deck to storage:", error);
        return;
    }

    window.location.href = "my-decks.html";
});

// ReMOVE
cardsContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-card")) {
        // A deck needs at least one card.
        if (cardsContainer.querySelectorAll(".card-block").length > 1) {
            // Removing a card shifts the card numbers, so drop the error.
            clearError();
            event.target.parentElement.remove();
        }
    }
});

// Typing in the flagged field clears its red border and the error message.
createDeckForm.addEventListener("input", function(event) {
    if (event.target === flaggedField) {
        clearError();
    }
});

// 'pageshow' fires on the first load AND when the Back button restores the
// page from the browser's cache without re-running this script. Anyone who is
// not logged in is sent to Log In, and the page is hidden meanwhile so the
// form never shows.
window.addEventListener("pageshow", function() {
    if (isLoggedIn()) {
        pageMain.hidden = false;
    } else {
        pageMain.hidden = true;
        window.location.href = "login.html";
    }
});
