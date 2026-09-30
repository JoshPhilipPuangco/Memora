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
| **Log In / Sign Up** (`login.html`)  | One page with a Login tab and a Signup tab. Switching tabs shows the matching form. Fields are validated before saving (username 6+ characters, valid email format, password 6+ characters).                                                  | On success, the user is sent to My Decks. The logo or "Back to Home" link returns to Home. | `login.js` handles tab switching, field validation, and saves the account and current user to `localStorage` (there is no real backend yet). Only one account is supported per browser, by design.                                                                                                                         |
| **My Decks** (`my-decks.html`)       | Shows the student's decks as cards, each with its title and a progress summary (total, reviewed, not yet reviewed). The whole card opens Study Mode. A "Create Deck" link opens Create Deck, "Edit" opens the deck in the Create Deck form so its title and cards can be changed, and a confirmation modal handles deleting a deck. Anyone who isn't logged in is sent to Log In.                                    | Clicking a deck card opens Study Mode. "Edit" on a card opens that deck in Create Deck. "Create Deck" opens a blank Create Deck.                                    | `my-decks.js` checks that a user is logged in, renders the decks from `localStorage`, handles the delete confirmation modal, and re-renders the page after every change.                                                                                                                              |
| **Create Deck** (`create-deck.html`) | Lets a student name a new deck and add question/answer card fields, with buttons to add or remove individual cards before saving.                                                                                                             | "Cancel" returns to the previous page. "Save deck" saves the deck and returns to My Decks. The logo also returns to My Decks.       | `create-deck.js` dynamically adds and removes card fields, each with a unique ID. It also runs as the Edit Deck page (`?deck=<id>`): it fills the form from `localStorage` and saves changes to that deck.                                                                                                                                                                                    |
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
| My Decks         | ![My Decks Page](assets/screenshots/My-Decks-Page.png)         |
| Create Deck      | ![Create Deck Page](assets/screenshots/Create-Deck-Page.png)   |
| Study Mode       | ![Study Mode Page](assets/screenshots/Study-Mode-Page.png)     |

## 6. Known issues and next steps

| #   | Issue                                                                                                                          | Next step                                                                                              |
| --- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| 3   | The Study page always shows the same hardcoded deck, no matter which deck card was clicked. Marking a card reviewed or not reviewed is also never saved, so My Decks always shows "0 reviewed" and no "last studied" date can be shown.                        | Read the `?deck=` ID from the URL, load that specific deck from `localStorage`, and save each card's reviewed mark (and the last studied date) back to it.                     |
| 4   | The "Log Out" link goes to Home but does not clear the logged-in user.                                                              | Clear the current user from `localStorage` on log out.                                                 |
| 5   | Create Deck and Study can still be opened directly by URL without logging in first. (My Decks now checks.)                     | Add the same login check at the top of each of those pages' JavaScript.                                |
| 6   | On the Create Deck / Edit Deck page, the heading sits tight against the nav bar and the Remove Card buttons stretch full width (desktop and mobile), and the button row touches the footer (desktop). | Adjust the spacing in `create-deck.css`: room above the heading and below the buttons, and Remove Card at its natural width. |

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
