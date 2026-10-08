// shared.js — code used by more than one page, the JavaScript counterpart of
// shared.css. Each page loads this file BEFORE its own JS file, so the names
// below are already defined when that file runs. Keep a name here only if two
// or more pages use it, and do not declare it again in a page's own file.

'use strict';

const STORAGE_KEY = 'memora_decks'; // the deck list, used by my-decks.js, create-deck.js, and study-decks.js
const USER_KEY = 'currentUser'; // written by login.js, read by every page that checks the login

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
    const decks = raw ? JSON.parse(raw) : [];
    return Array.isArray(decks) ? decks : [];
  } catch (err) {
    console.error('Could not read decks from storage:', err);
    return [];
  }
}

// ---- Cards ----
// Every saved card has a unique id, so Study Mode can save a mark onto the
// right card even if the cards were edited in another tab. The position is in
// the id because cards saved in the same millisecond share the time.
// create-deck.js gives ids to new cards, and study-decks.js gives them to
// older cards that were saved without one.
function makeCardId(position) {
  return 'card_' + Date.now() + '_' + position + '_' + Math.floor(Math.random() * 10000);
}
