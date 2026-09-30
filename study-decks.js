// study-decks.js — logic ONLY for study-decks.html
// Reads the clicked deck (?deck=<id>) from localStorage ("memora_decks",
// the same key my-decks.js uses) and saves reviewed marks back to it.

(function () {
  'use strict';

  const STORAGE_KEY = 'memora_decks';

  // ---- DOM refs ----
  const studyMessage = document.getElementById('studyMessage');
  const studyMessageText = document.getElementById('studyMessageText');
  const studyHeader = document.getElementById('studyHeader');
  const flashcard = document.getElementById('flashcard');
  const cardQuestion = document.getElementById('cardQuestion');
  const cardAnswer = document.getElementById('cardAnswer');
  const deckTitle = document.getElementById('deckTitle');
  const progressText = document.getElementById('progressText');
  const markRow = document.getElementById('studyMarkRow');
  const navRow = document.getElementById('studyNavRow');
  const markReviewedBtn = document.getElementById('markReviewedBtn');
  const markNotReviewedBtn = document.getElementById('markNotReviewedBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  // ---- State ----
  let decks = [];
  let deck = null;
  let currentIndex = 0;
  let isFlipped = false;

  // ---- Storage ----
  function loadDecks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error('Could not read decks from storage:', err);
      return [];
    }
  }

  function saveDecks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    } catch (err) {
      console.error('Could not save decks to storage:', err);
    }
  }

  // ---- Empty / error states ----
  function showMessage(text) {
    studyMessageText.textContent = text;
    studyMessage.hidden = false;
    studyHeader.hidden = true;
    flashcard.hidden = true;
    markRow.hidden = true;
    navRow.hidden = true;
  }

  // ---- Rendering ----
  function updateProgress() {
    const total = deck.cards.length;
    const reviewed = deck.cards.filter((c) => c.reviewed).length;
    deckTitle.textContent = deck.title;
    progressText.textContent =
      'Progress: ' + total + ' total, ' + reviewed + ' reviewed, ' +
      (total - reviewed) + ' not yet reviewed';
  }

  function updateMarkButtons() {
    const card = deck.cards[currentIndex];
    markReviewedBtn.setAttribute('aria-pressed', card.reviewed ? 'true' : 'false');
    markNotReviewedBtn.setAttribute('aria-pressed', card.reviewed ? 'false' : 'true');
  }

  function updateNavButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === deck.cards.length - 1;
  }

  function renderCard() {
    const card = deck.cards[currentIndex];
    cardQuestion.textContent = card.question;
    cardAnswer.textContent = card.answer;
    isFlipped = false;
    flashcard.classList.remove('is-flipped');
    updateMarkButtons();
    updateNavButtons();
  }

  // ---- Actions ----
  function flipCard() {
    isFlipped = !isFlipped;
    flashcard.classList.toggle('is-flipped', isFlipped);
  }

  function setReviewed(value) {
    deck.cards[currentIndex].reviewed = value;
    saveDecks();
    updateProgress();
    updateMarkButtons();
  }

  function goTo(index) {
    if (index < 0 || index >= deck.cards.length) return;
    currentIndex = index;
    renderCard();
  }

  // ---- Init ----
  function init() {
    const deckId = new URLSearchParams(window.location.search).get('deck');
    decks = loadDecks();

    if (!deckId) {
      showMessage('No deck selected. Go back to My Decks and press Study on a deck.');
      return;
    }

    deck = decks.find((d) => d.id === deckId);

    if (!deck) {
      showMessage("We couldn't find that deck. It may have been deleted.");
      return;
    }

    if (!Array.isArray(deck.cards) || deck.cards.length === 0) {
      showMessage('"' + deck.title + '" has no cards yet, so there is nothing to study.');
      return;
    }

    deck.lastStudied = Date.now();
    saveDecks();

    flashcard.addEventListener('click', flipCard);
    flashcard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flipCard();
      }
    });
    markReviewedBtn.addEventListener('click', () => setReviewed(true));
    markNotReviewedBtn.addEventListener('click', () => setReviewed(false));
    prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
    nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

    updateProgress();
    renderCard();
  }

  init();
})();
