let cardNumber = 1;

const createDeckForm = document.querySelector(".create-deck-form");
const addCardButton = document.getElementById("add-card");
const cardsContainer = document.getElementById("card-container");
const cancelButton = document.getElementById("cancel-deck");

// AdD
addCardButton.addEventListener("click", function() {
    cardNumber++;

    

    const newDiv = document.createElement("div");
    newDiv.classList.add("card-block");

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

    cardsContainer.appendChild(newDiv);
});

// CaNCEL
cancelButton.addEventListener("click", function() {
    history.back();
});

// SuBMIT
createDeckForm.addEventListener("submit", function(event) {
    event.preventDefault();

});

// ReMOVE
cardsContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-card")) {
        event.target.parentElement.remove();
    }
});