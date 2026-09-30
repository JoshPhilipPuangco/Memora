# Memora

A free flashcard web app for college students.

## 1. Overview

Memora is a free flashcard web app for college students who want a faster way to review than paper cards. Students can create their own decks, study them with a flip-card interface, and see how many cards they still need to review, all without a paid subscription.

## 2. How to view it

**Live site:** https://joshphilippuangco.github.io/Memora/

**To run it locally:** clone the repository, then open `index.html` directly in a browser. No build step or local server is needed, since the site is plain HTML, CSS, and JavaScript.

```
git clone https://github.com/JoshPhilipPuangco/Memora.git
```

## 3. Pages and features

| Page                                 | What it does                                                                                                                                                                                                                                  | Navigation                                                                                                       | JavaScript                                                                                                                                                                                                                                                           |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Home** (`index.html`)              | Intro to Memora with Log In / Sign Up buttons and a footer.                                                                                                                                                                                   | Links to Log In / Sign Up.                                                                                       | None.                                                                                                                                                                                                                                                                |
| **Log In / Sign Up** (`login.html`)  | One page with a Login tab and a Signup tab. Switching tabs shows the matching form. Fields are validated before saving (username 6+ characters, valid email format, password 6+ characters).                                                  | On success, the user is sent to My Decks. The logo or "Back to Home" link returns to Home. | `login.js` handles tab switching, field validation, and saves the account and current user to `localStorage` (there is no real backend yet).                                                                                                                         |
| **My Decks** (`my-decks.html`)       | Shows the student's decks as cards, each with its title, card count, and last studied date, plus a progress summary. A "Create Deck" link opens Create Deck, and a modal lets a student rename or delete decks.                                    | "Study" on a deck card opens Study Mode. "Create new deck" opens Create Deck.                                    | `my-decks.js` renders the decks from `localStorage`, handles the rename/delete modal, and re-renders the page after every change.                                                                                                                              |
| **Create Deck** (`create-deck.html`) | Lets a student name a new deck and add question/answer card fields, with buttons to add or remove individual cards before saving.                                                                                                             | "Cancel" returns to the previous page. "Save deck" returns to My Decks (see Known Issues #1 and #2). The logo also returns to My Decks.       | `create-deck.js` dynamically adds and removes card fields, each with a unique ID.                                                                                                                                                                                    |
| **Study Mode** (`study-decks.html`)  | Shows one deck's cards one at a time: a title with a progress summary, a flip card that shows the question first and flips to the answer on click, and buttons to mark a card reviewed or not reviewed and move to the next or previous card. | "Back" or "Exit" returns to My Decks.                                                                            | An inline `<script>` block at the bottom of `study-decks.html`, instead of a separate `.js` file. It loads the sample deck and renders the flip card, but currently always shows the same hardcoded deck rather than reading which deck was clicked (see Known Issues #3). |

## 4. Project structure

```
Memora/
├── index.html, login.html, create-deck.html, my-decks.html, study-decks.html
├── shared.css (site-wide styles) + one CSS file per page
├── login.js, create-deck.js, my-decks.js (one JS file per interactive page)
├── style.css, script.js (unused repo template leftovers)
├── assets/screenshots/ (README screenshots)
└── .github/ (CODEOWNERS + GitHub Pages deploy workflow)
```

Each page loads `shared.css` plus its own page-specific CSS file. `style.css` and `script.js` are confirmed leftovers from the repo template. Neither is linked from any page and neither will be used going forward.

## 5. Screenshots

| Page             | Screenshot                                                     |
| ---------------- | -------------------------------------------------------------- |
| Home             | ![Home Page](assets/screenshots/Home-Page.png)                 |
| Log In / Sign Up | ![Login Signup Page](assets/screenshots/Login-Signup-Page.png) |
| Create Deck      | ![Create Deck Page](assets/screenshots/Create-Deck-Page.png)   |
| My Decks         | ![My Decks Page](assets/screenshots/My-Decks-Page.png)         |
| Study Mode       | ![Study Mode Page](assets/screenshots/Study-Mode-Page.png)     |

## 6. Known issues and next steps

| #   | Issue                                                                                                                          | Next step                                                                                              |
| --- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| 1   | The Create Deck form doesn't save anything. "Save deck" only redirects to My Decks.                                | Wire up the submit handler to actually store the deck title and its cards.                             |
| 2   | My Decks and Create Deck use two disconnected "create a deck" systems, so no deck a user creates ever ends up with real cards. | Merge the two flows into one, so saving a deck on either page produces a deck that actually has cards. |
| 3   | The Study page always shows the same hardcoded deck, no matter which deck's "Study" button was clicked.                        | Read the `?deck=` ID from the URL and load that specific deck from `localStorage`.                     |
| 4   | The "Log Out" link goes to Home but does not clear the logged-in user.                                                              | Clear the current user from `localStorage` on log out.                                                 |
| 5   | My Decks, Create Deck, and Study can all be opened directly by URL without logging in first.                                   | Add a login check at the top of each protected page's JavaScript.                                      |
| 9   | Only one account can ever exist per browser, since accounts are saved under a single key instead of a list.                    | Store accounts as a list so more than one person can sign up per browser.                              |

## AI use

If you used AI while building this, say so here. Honest disclosure is the
standard in this course and increasingly outside it, and reporting heavy use
accurately costs you nothing.

This section is the last 10 points of the finals badge, and it wants three
things:

![Built with AI assistance](https://img.shields.io/badge/built%20with-AI%20assistance-0b5fff)

- the badge above, or one you like better
- a line naming which assistant you used and how much of the work it touched
- a link to [AI-USAGE.md](AI-USAGE.md), where the full account lives

Keep the detail in `AI-USAGE.md` rather than here. This section is the summary a
visitor reads; that file is the record the badge is graded from.
