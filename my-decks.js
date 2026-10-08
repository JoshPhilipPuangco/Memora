// my-decks.js — logic ONLY for my-decks.html
// Decks are stored in localStorage for now (no backend yet).
// Swap `loadDecks` (in shared.js) / `saveDecks` for real API calls once one
// exists — everything else (rendering, modal, events) stays the same.
// STORAGE_KEY, USER_KEY, isLoggedIn() and loadDecks() come from shared.js,
// which my-decks.html loads first.
//
// Decks are created on the Create Deck page (create-deck.js), which saves
// into the same "memora_decks" list, and edits them (title and cards) via
// create-deck.html?deck=<id>. This page only lists, searches, and deletes them.
// The search box filters by title as the user types. The full list stays
// untouched; render() draws a filtered copy of it.
//
// The page is built the way Module 10 teaches: the array is the truth, and
// each render() rewrites the page from it with innerHTML. Anything a user
// typed (deck titles) goes in afterwards with textContent, never innerHTML.

'use strict';

const headerAction = document.getElementById('mydecksHeaderAction');
const content = document.getElementById('mydecksContent');
const modalRoot = document.getElementById('mydecksModalRoot');
const search = document.getElementById('mydecksSearch');
const searchInput = document.getElementById('mydecksSearchInput');
const logoutLink = document.getElementById('logoutLink');
const pageMain = document.querySelector('.mydecks-main');

// The deck the modal is currently about (null while the modal is closed).
let activeDeckId = null;

// ---- Login ----
// Removes the logged-in user. The link's own href then takes the browser to
// Home. The account and the decks stay saved.
function logOut() {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (err) {
    console.error('Could not clear the current user from storage:', err);
  }
}

// ---- Storage ----
function saveDecks(decks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  } catch (err) {
    console.error('Could not save decks to storage:', err);
  }
}

// ---- Helpers ----
function countProgress(deck) {
  const cards = deck.cards || [];
  const reviewed = cards.filter((card) => card.reviewed).length;
  return {
    total: cards.length,
    reviewed: reviewed,
    notReviewed: cards.length - reviewed,
  };
}

// ---- Rendering ----
function render() {
  const decks = loadDecks();

  if (decks.length === 0) {
    search.hidden = true;
    headerAction.innerHTML = '';
    content.innerHTML = `
      <div class="mydecks-empty" id="mydecksEmpty">
        <p class="mydecks-empty__text">
          You don't have any decks yet. Create your first one to start studying.
        </p>
        <a class="btn-accent" id="mydecksEmptyCreateBtn" href="create-deck.html">+ Create Deck</a>
      </div>
    `;
    return;
  }

  search.hidden = false;
  headerAction.innerHTML =
    '<a class="btn-accent" id="mydecksCreateBtn" href="create-deck.html">+ Create Deck</a>';

  // Compare in lowercase so the search ignores case.
  const typed = searchInput.value.trim();
  const query = typed.toLowerCase();
  const visibleDecks = decks.filter((deck) =>
    deck.title.toLowerCase().includes(query)
  );

  if (visibleDecks.length === 0) {
    content.innerHTML = `
      <div class="mydecks-empty" id="mydecksNoResults">
        <p class="mydecks-empty__text"></p>
      </div>
    `;
    // What the user typed goes in with textContent, never innerHTML.
    document.querySelector('#mydecksNoResults .mydecks-empty__text').textContent =
      `No decks match "${typed}".`;
    return;
  }

  // Only our own data (generated ids, numbers) goes into this string.
  let html = '';
  for (const deck of visibleDecks) {
    const progress = countProgress(deck);
    html += `
      <article class="deck-card mydecks-card">
        <h2 class="deck-card__title">
          <a class="mydecks-card__link" href="study-decks.html?deck=${deck.id}"></a>
        </h2>
        <p class="deck-card__progress">
          Progress: ${progress.total} total, ${progress.reviewed} reviewed, ${progress.notReviewed} not yet reviewed
        </p>
        <div class="mydecks-card__actions">
          <a class="btn-secondary" href="create-deck.html?deck=${deck.id}">Edit</a>
          <button type="button" class="mydecks-card__delete">Delete</button>
        </div>
      </article>
    `;
  }
  content.innerHTML = html;

  // The typed part: titles go in with textContent. Then each Delete button
  // gets its listener. The Nth card on the page belongs to visibleDecks[N].
  const titleLinks = document.querySelectorAll('.mydecks-card__link');
  const deleteButtons = document.querySelectorAll('.mydecks-card__delete');
  for (let i = 0; i < visibleDecks.length; i++) {
    const deckId = visibleDecks[i].id;
    titleLinks[i].textContent = visibleDecks[i].title;
    deleteButtons[i].addEventListener('click', () => openModal(deckId));
  }
}

// ---- Deck actions ----
function deleteDeck(id) {
  const decks = loadDecks();
  saveDecks(decks.filter((d) => d.id !== id));
  render();
}

// ---- Modal ----
// The modal only exists in the page while it is open: openModal() writes it
// into #mydecksModalRoot and closeModal() empties that again.
function openModal(deckId) {
  activeDeckId = deckId;

  modalRoot.innerHTML = `
    <div class="mydecks-modal-overlay" id="mydecksModalOverlay">
      <div class="mydecks-modal" role="dialog" aria-modal="true" aria-labelledby="mydecksModalTitle">
        <h2 class="mydecks-modal__title" id="mydecksModalTitle">Delete Deck</h2>
        <p class="mydecks-modal__text">Are you sure you want to delete this deck?</p>
        <p class="mydecks-modal__text">This can't be undone.</p>
        <div class="mydecks-modal__actions">
          <button type="button" class="btn-secondary" id="mydecksDeleteCancel">Cancel</button>
          <button type="button" class="mydecks-modal__delete" id="mydecksDeleteConfirm">Delete</button>
        </div>
      </div>
    </div>
  `;

  const overlay = document.getElementById('mydecksModalOverlay');
  const cancelBtn = document.getElementById('mydecksDeleteCancel');
  const confirmBtn = document.getElementById('mydecksDeleteConfirm');

  cancelBtn.addEventListener('click', closeModal);
  confirmBtn.addEventListener('click', handleDeleteConfirm);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  cancelBtn.focus();
}

function closeModal() {
  modalRoot.innerHTML = '';
  activeDeckId = null;
}

function handleDeleteConfirm() {
  deleteDeck(activeDeckId);
  closeModal();
}

// ---- Events ----
logoutLink.addEventListener('click', logOut);

// Redraw the filtered list on every keystroke.
searchInput.addEventListener('input', render);

// On the document so Escape closes the modal whichever element has focus.
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && activeDeckId !== null) closeModal();
});

// ---- Init ----
// 'pageshow' fires on the first load AND when the Back button restores the
// page from the browser's cache without re-running this script. Redrawing
// each time keeps the progress numbers current. Anyone who is not logged in
// is sent to Log In, and the page is hidden meanwhile so the list never shows.
window.addEventListener('pageshow', () => {
  if (isLoggedIn()) {
    pageMain.hidden = false;
    closeModal();
    render();
  } else {
    pageMain.hidden = true;
    window.location.href = 'login.html';
  }
});
