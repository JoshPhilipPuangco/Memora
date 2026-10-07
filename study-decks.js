// study-decks.js — logic ONLY for study-decks.html
// Reads the clicked deck (?deck=<id>) from localStorage ("memora_decks",
// the same key my-decks.js uses) and saves reviewed marks back to it.
//
// Studying happens in rounds. A round is a list of cards (the whole deck, or
// only the not-yet-reviewed ones) and it is finished once every card in it
// has been marked, with either button. Then a dialog asks the student what to
// do next. The arrays below are the truth; the page is a picture of them.

(function () {
  'use strict';

  const STORAGE_KEY = 'memora_decks';
  const USER_KEY = 'currentUser'; // written by login.js

  // ---- DOM refs ----
  const studyMain = document.querySelector('.study-main');
  const studyMessage = document.getElementById('studyMessage');
  const studyMessageText = document.getElementById('studyMessageText');
  const studyHeader = document.getElementById('studyHeader');
  const flashcard = document.getElementById('flashcard');
  const cardQuestion = document.getElementById('cardQuestion');
  const cardAnswer = document.getElementById('cardAnswer');
  const deckTitle = document.getElementById('deckTitle');
  const progressText = document.getElementById('progressText');
  const roundText = document.getElementById('roundText');
  const markRow = document.getElementById('studyMarkRow');
  const navRow = document.getElementById('studyNavRow');
  const markReviewedBtn = document.getElementById('markReviewedBtn');
  const markNotReviewedBtn = document.getElementById('markNotReviewedBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const modalOverlay = document.getElementById('studyModalOverlay');
  const modalTitle = document.getElementById('studyModalTitle');
  const modalText = document.getElementById('studyModalText');
  const reviewMissedBtn = document.getElementById('studyReviewMissedBtn');
  const resetBtn = document.getElementById('studyResetBtn');
  const dismissBtn = document.getElementById('studyModalDismiss');

  // ---- State ----
  let decks = [];
  let deck = null;
  let isFlipped = false;

  // The current round. roundCards holds positions in deck.cards, marked[i] is
  // true once roundCards[i] has been marked in this round, and position is
  // where the student is inside roundCards (not inside deck.cards).
  let roundCards = [];
  let marked = [];
  let position = 0;
  let isReviewRound = false;
  let isDialogOpen = false;
  let pressStartedOnOverlay = false;
  let hasStarted = false;

  // ---- Login check ----
  function isLoggedIn() {
    try {
      return localStorage.getItem(USER_KEY) !== null;
    } catch (err) {
      console.error('Could not read the current user from storage:', err);
      return false;
    }
  }

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

  function writeDecks(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      console.error('Could not save decks to storage:', err);
    }
  }

  // Only this deck's marks are written back, into the list as it is in storage
  // right now. Saving the list loaded when the page opened would undo anything
  // done in another tab since (a deleted deck would come back, edited cards
  // would be replaced). If this deck was deleted in the meantime, nothing is
  // saved. Each mark is copied onto the saved card with the same id, wherever
  // that card is now; a card that was removed elsewhere is skipped, so a mark
  // can never land on the wrong card.
  function saveDecks() {
    const latest = loadDecks();
    const saved = latest.find((d) => d.id === deck.id);
    if (!saved) return;

    if (Array.isArray(saved.cards)) {
      for (const card of deck.cards) {
        const savedCard = saved.cards.find((c) => c.id === card.id);
        if (savedCard) savedCard.reviewed = card.reviewed;
      }
    }
    saved.lastStudied = deck.lastStudied;

    writeDecks(latest);
  }

  // Decks saved before cards had ids have none. Each such card gets one here,
  // matched to the saved card at the same position with the same question
  // (the only way left to tell them apart), and it is saved once. Create Deck
  // gives every card an id from then on. The id format is the same as
  // makeCardId in create-deck.js. The pages share no JS file, so keep the two
  // in sync by hand.
  function giveCardsIds() {
    let missing = false;
    deck.cards.forEach((card, i) => {
      if (!card.id) {
        card.id = 'card_' + Date.now() + '_' + i + '_' + Math.floor(Math.random() * 10000);
        missing = true;
      }
    });
    if (!missing) return;

    const latest = loadDecks();
    const saved = latest.find((d) => d.id === deck.id);
    if (!saved || !Array.isArray(saved.cards)) return;

    deck.cards.forEach((card, i) => {
      const savedCard = saved.cards[i];
      if (savedCard && !savedCard.id && savedCard.question === card.question) {
        savedCard.id = card.id;
      }
    });
    writeDecks(latest);
  }

  // ---- Empty / error states ----
  // The header stays so the page keeps its <h1>; only the progress lines go.
  function showMessage(text) {
    studyMessageText.textContent = text;
    studyMessage.hidden = false;
    progressText.hidden = true;
    roundText.hidden = true;
    flashcard.hidden = true;
    markRow.hidden = true;
    navRow.hidden = true;
  }

  // ---- Round lookups (no page changes) ----
  function currentCard() {
    return deck.cards[roundCards[position]];
  }

  function getAllIndexes() {
    return deck.cards.map((card, i) => i);
  }

  function getNotReviewedIndexes() {
    const indexes = [];
    for (let i = 0; i < deck.cards.length; i++) {
      if (!deck.cards[i].reviewed) indexes.push(i);
    }
    return indexes;
  }

  function isRoundDone() {
    return marked.every((m) => m);
  }

  // The next card in the round that has not been marked yet, looking forward
  // first and then wrapping to the start. -1 when every card is marked.
  function findNextUnmarked(from) {
    for (let i = from + 1; i < marked.length; i++) {
      if (!marked[i]) return i;
    }
    for (let i = 0; i < from; i++) {
      if (!marked[i]) return i;
    }
    return -1;
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

  function updateRoundText() {
    const where = 'Card ' + (position + 1) + ' of ' + roundCards.length;
    roundText.textContent = isReviewRound ? 'Review round: ' + where.toLowerCase() : where;
  }

  // A button only looks pressed once the card has been marked in this round,
  // so a reviewed value saved on an earlier visit doesn't look like a choice.
  function updateMarkButtons() {
    const isReviewed = marked[position] && currentCard().reviewed;
    const isNotReviewed = marked[position] && !currentCard().reviewed;
    markReviewedBtn.classList.toggle('is-marked', isReviewed);
    markNotReviewedBtn.classList.toggle('is-marked', isNotReviewed);
    markReviewedBtn.setAttribute('aria-pressed', isReviewed ? 'true' : 'false');
    markNotReviewedBtn.setAttribute('aria-pressed', isNotReviewed ? 'true' : 'false');
  }

  function updateNavButtons() {
    prevBtn.disabled = position === 0;
    nextBtn.disabled = position === roundCards.length - 1;
  }

  function renderCard() {
    const card = currentCard();
    cardQuestion.textContent = card.question;
    cardAnswer.textContent = card.answer;
    isFlipped = false;
    flashcard.classList.remove('is-flipped');
    updateRoundText();
    updateMarkButtons();
    updateNavButtons();
  }

  // ---- Finish dialog ----
  // One dialog, four cases: it opens when a round ends or when a deck with
  // saved progress is opened, and either some cards are still not reviewed or
  // every card is. Only the text and which buttons show change.
  function openFinishDialog(isOnOpen) {
    const missed = getNotReviewedIndexes().length;
    const allReviewed = missed === 0;
    const cardWord = missed === 1 ? 'card' : 'cards';

    if (isOnOpen) {
      modalTitle.textContent = 'Welcome back';
    } else if (allReviewed) {
      modalTitle.textContent = 'All cards reviewed';
    } else {
      modalTitle.textContent = 'Round complete';
    }

    if (allReviewed) {
      modalText.textContent =
        'Every card in this deck is marked Reviewed. ' +
        'Do you want to reset the deck\'s progress and start over?';
    } else {
      modalText.textContent =
        missed + ' ' + cardWord + ' still marked Not Yet Reviewed. ' +
        'Do you want to review ' + (missed === 1 ? 'it' : 'them') +
        ' now, or reset the deck\'s progress?';
    }
    reviewMissedBtn.textContent = 'Review ' + missed + ' ' + cardWord;

    // Reset is the one question when everything is reviewed, so it becomes the
    // primary button; otherwise reviewing the missed cards is.
    reviewMissedBtn.classList.toggle('is-hidden', allReviewed);
    dismissBtn.classList.toggle('is-hidden', !allReviewed);
    resetBtn.classList.toggle('btn-primary', allReviewed);
    resetBtn.classList.toggle('btn-secondary', !allReviewed);

    modalOverlay.classList.add('is-open');
    isDialogOpen = true;
    if (allReviewed) {
      resetBtn.focus();
    } else {
      reviewMissedBtn.focus();
    }
  }

  function closeFinishDialog() {
    modalOverlay.classList.remove('is-open');
    isDialogOpen = false;
    flashcard.focus();
  }

  // ---- Actions ----
  // The page behind the dialog can still be reached with Tab, so the actions
  // below do nothing while the dialog is open.
  function flipCard() {
    if (isDialogOpen) return;
    isFlipped = !isFlipped;
    flashcard.classList.toggle('is-flipped', isFlipped);
  }

  function startRound(indexes, isReview) {
    roundCards = indexes;
    marked = indexes.map(() => false);
    position = 0;
    isReviewRound = isReview;
    updateProgress();
    renderCard();
  }

  function goTo(index) {
    if (isDialogOpen) return;
    if (index < 0 || index >= roundCards.length) return;
    position = index;
    renderCard();
  }

  function setReviewed(value) {
    if (isDialogOpen) return;
    currentCard().reviewed = value;
    marked[position] = true;
    saveDecks();
    updateProgress();

    if (isRoundDone()) {
      updateMarkButtons();
      openFinishDialog(false);
      return;
    }
    goTo(findNextUnmarked(position));
  }

  function handleReviewMissed() {
    closeFinishDialog();
    startRound(getNotReviewedIndexes(), true);
  }

  function resetProgress() {
    for (const card of deck.cards) {
      card.reviewed = false;
    }
    saveDecks();
    closeFinishDialog();
    startRound(getAllIndexes(), false);
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

    giveCardsIds();
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
    prevBtn.addEventListener('click', () => goTo(position - 1));
    nextBtn.addEventListener('click', () => goTo(position + 1));

    reviewMissedBtn.addEventListener('click', handleReviewMissed);
    resetBtn.addEventListener('click', resetProgress);
    dismissBtn.addEventListener('click', closeFinishDialog);
    // Only a press that also started on the dark area closes the dialog, so
    // dragging out of the box (selecting text) doesn't close it by accident.
    modalOverlay.addEventListener('mousedown', (e) => {
      pressStartedOnOverlay = e.target === modalOverlay;
    });
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay && pressStartedOnOverlay) closeFinishDialog();
    });
    // On the document so Escape closes the dialog whichever element has focus.
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isDialogOpen) closeFinishDialog();
    });

    // A normal pass over every card is always set up underneath. When the deck
    // already has progress, the student first gets to choose what to do.
    startRound(getAllIndexes(), false);
    if (deck.cards.some((c) => c.reviewed)) openFinishDialog(true);
  }

  // 'pageshow' fires on the first load AND when the Back button restores the
  // page from the browser's cache without re-running this script. Anyone who
  // is not logged in is sent to Log In, and the page is hidden meanwhile.
  // init() runs only once, because it adds the event listeners.
  window.addEventListener('pageshow', () => {
    if (!isLoggedIn()) {
      studyMain.hidden = true;
      window.location.href = 'login.html';
      return;
    }
    studyMain.hidden = false;
    if (!hasStarted) {
      hasStarted = true;
      init();
    }
  });
})();
