// my-decks.js — logic ONLY for my-decks.html
// Decks are stored in localStorage for now (no backend yet).
// Swap `loadDecks` / `saveDecks` for real API calls once one exists —
// everything else (rendering, modal, events) stays the same.

(function () {
  const STORAGE_KEY = "memora_decks";

  // ---- DOM refs ----
  const grid = document.getElementById("mydecksGrid");
  const emptyState = document.getElementById("mydecksEmpty");
  const createBtn = document.getElementById("mydecksCreateBtn");
  const emptyCreateBtn = document.getElementById("mydecksEmptyCreateBtn");

  const modalOverlay = document.getElementById("mydecksModalOverlay");
  const modalTitle = document.getElementById("mydecksModalTitle");
  const modalInput = document.getElementById("mydecksModalInput");
  const modalError = document.getElementById("mydecksModalError");
  const modalSave = document.getElementById("mydecksModalSave");
  const modalCancel = document.getElementById("mydecksModalCancel");

  // Tracks whether the modal is creating a new deck or renaming an
  // existing one (holds the deck id while editing, null while creating).
  let editingDeckId = null;

  // ---- Storage ----
  function loadDecks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error("Could not read decks from storage:", err);
      return [];
    }
  }

  function saveDecks(decks) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    } catch (err) {
      console.error("Could not save decks to storage:", err);
    }
  }

  // ---- Helpers ----
  function formatLastStudied(timestamp) {
    if (!timestamp) return "Not studied yet";
    const diffMs = Date.now() - timestamp;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return "Studied today";
    if (diffDays === 1) return "Last studied 1 day ago";
    return `Last studied ${diffDays} days ago`;
  }

  function makeId() {
    return "deck_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
  }

  // ---- Rendering ----
  function render() {
    const decks = loadDecks();
    grid.innerHTML = "";

    if (decks.length === 0) {
      grid.hidden = true;
      emptyState.hidden = false;
      return;
    }

    grid.hidden = false;
    emptyState.hidden = true;

    decks.forEach((deck) => {
      const card = document.createElement("article");
      card.className = "mydecks-card";
      card.dataset.deckId = deck.id;

      const title = document.createElement("h2");
      title.className = "mydecks-card__title";
      title.textContent = deck.title;

      const meta = document.createElement("p");
      meta.className = "mydecks-card__meta";
      const cardCount = deck.cards ? deck.cards.length : 0;
      meta.textContent = `${cardCount} card${cardCount === 1 ? "" : "s"} · ${formatLastStudied(deck.lastStudied)}`;

      const actions = document.createElement("div");
      actions.className = "mydecks-card__actions";

      const studyLink = document.createElement("a");
      studyLink.className = "btn-primary mydecks-card__study";
      studyLink.href = `study.html?deck=${encodeURIComponent(deck.id)}`;
      studyLink.textContent = "Study";

      const editBtn = document.createElement("button");
      editBtn.className = "btn-secondary mydecks-card__edit";
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => openModal("edit", deck.id));

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "mydecks-card__delete";
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => deleteDeck(deck.id));

      actions.append(studyLink, editBtn, deleteBtn);
      card.append(title, meta, actions);
      grid.appendChild(card);
    });
  }

  // ---- Deck actions ----
  function createDeck(title) {
    const decks = loadDecks();
    decks.push({
      id: makeId(),
      title,
      cards: [],
      lastStudied: null,
    });
    saveDecks(decks);
    render();
  }

  function renameDeck(id, newTitle) {
    const decks = loadDecks();
    const deck = decks.find((d) => d.id === id);
    if (deck) {
      deck.title = newTitle;
      saveDecks(decks);
      render();
    }
  }

  function deleteDeck(id) {
    const decks = loadDecks();
    const deck = decks.find((d) => d.id === id);
    if (!deck) return;
    const confirmed = window.confirm(`Delete "${deck.title}"? This can't be undone.`);
    if (!confirmed) return;
    saveDecks(decks.filter((d) => d.id !== id));
    render();
  }

  // ---- Modal ----
  function openModal(mode, deckId) {
    editingDeckId = mode === "edit" ? deckId : null;
    modalError.hidden = true;

    if (mode === "edit") {
      const decks = loadDecks();
      const deck = decks.find((d) => d.id === deckId);
      modalTitle.textContent = "Rename Deck";
      modalInput.value = deck ? deck.title : "";
    } else {
      modalTitle.textContent = "Create Deck";
      modalInput.value = "";
    }

    modalOverlay.hidden = false;
    modalInput.focus();
  }

  function closeModal() {
    modalOverlay.hidden = true;
    editingDeckId = null;
  }

  function handleModalSave() {
    const value = modalInput.value.trim();
    if (!value) {
      modalError.hidden = false;
      return;
    }

    if (editingDeckId) {
      renameDeck(editingDeckId, value);
    } else {
      createDeck(value);
    }
    closeModal();
  }

  // ---- Events ----
  createBtn.addEventListener("click", () => openModal("create"));
  emptyCreateBtn.addEventListener("click", () => openModal("create"));
  modalCancel.addEventListener("click", closeModal);
  modalSave.addEventListener("click", handleModalSave);

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  modalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleModalSave();
    if (e.key === "Escape") closeModal();
  });

  // ---- Init ----
  render();
})();