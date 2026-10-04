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

Memora has no backend. All data (the account, the logged-in user, and the decks) is saved in the browser's `localStorage`. The pages pass a deck to each other through the URL, for example `study-decks.html?deck=<id>`.

The usual flow is: Home, then Log In / Sign Up, then My Decks. From My Decks, a student can create a deck, edit a deck, delete a deck, or study a deck.

| Page                                 | What it does                                                                                                                                                                                                                                  | Navigation                                                                                                                                                                  | JavaScript                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Home** (`index.html`)              | Intro to Memora with Log In / Sign Up buttons and a footer.                                                                                                                                                                                   | "Log In" opens Log In / Sign Up. "Sign Up" opens the same page on the Sign Up tab (`login.html#signup`).                                                                   | None.                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Log In / Sign Up** (`login.html`)  | One page with a Log In tab and a Sign Up tab. Switching tabs shows the matching form. Fields are checked before saving (username 6+ characters with only letters, numbers, and `_`; valid email format; password 6+ characters). Error messages show in a red line. The Log In tab has email and password fields. The page checks them against the saved account and shows "Incorrect email or password" if they do not match. A user who is already logged in is sent straight to My Decks instead of seeing the forms.                                                  | On success, the user is sent to My Decks. The logo or "Back to Home" link returns to Home.                                                                                  | `login.js` switches tabs, checks the fields, and saves the account and the current user to `localStorage`. If the URL ends with `#signup`, the Sign Up tab opens first. It also checks for a logged-in user every time the page is shown, including when the browser's Back button restores it, and sends that user to My Decks. The page is hidden during the redirect so the form never flashes. Only one account is supported per browser, by design. The password is saved as plain text, which is fine for a class project but not safe for a real app.                                                                              |
| **My Decks** (`my-decks.html`)       | Shows the student's decks as cards. Each card has a title link, a progress summary (total, reviewed, not yet reviewed), an "Edit" link, and a "Delete" button. Delete opens a confirmation pop-up. If there are no decks, an empty message and a "+ Create Deck" button show instead. Anyone who is not logged in is sent to Log In. | Clicking a deck title opens Study Mode for that deck. "Edit" opens that deck in Create Deck. "+ Create Deck" opens a blank Create Deck. "Log Out" in the nav bar clears the logged-in user and goes to Home (only My Decks has this link).                                     | `my-decks.js` checks that a user is logged in, removes the current user from `localStorage` when "Log Out" is clicked, then draws the decks from `localStorage`. The page is rebuilt from the saved decks after every change, and every time the page is shown, including when the browser's Back button restores it. The delete pop-up closes on "Cancel", on a click outside the box, or on the `Escape` key. "Delete" removes the deck and redraws the page.                                                                                                                     |
| **Create Deck** (`create-deck.html`) | Lets a student name a new deck and add question/answer cards, with buttons to add or remove individual cards before saving. A deck must keep at least one card. The same page works as the Edit Deck page.                                     | "Cancel" returns to the previous page without saving. "Save deck" saves the deck and returns to My Decks. The logo also returns to My Decks.                                | `create-deck.js` adds and removes card fields, each with a unique ID. Every saved card also gets its own card ID, which editing keeps. With no `?deck=` in the URL, it starts empty (Create mode). With `?deck=<id>`, it fills the form from `localStorage` and saves changes to that deck (Edit mode). In Edit mode, the heading changes to "Edit Deck" and the button changes to "Save changes". Editing keeps each card's reviewed mark. If the title, a question, or an answer is empty (or only spaces), a red message shows above the buttons, the empty field gets a red border, and nothing is saved.                                                              |
| **Study Mode** (`study-decks.html`)  | Shows one deck's cards one at a time: a title with a progress summary, a flip card that shows the question first and flips to the answer on click, and buttons to mark a card reviewed or not reviewed and move to the next or previous card. Marking a card moves on to the next unmarked card and the marked button turns dark. Once every card in the round has been marked, a pop-up asks what to do next: review only the not-yet-reviewed cards or reset the deck's progress (or, when every card is reviewed, just whether to reset). The same pop-up shows when a deck that already has progress is opened. | "Back to My Decks" returns to My Decks. The logo also returns to My Decks.                                                                                                  | `study-decks.js` reads the `?deck=<id>` from the URL and loads that deck from `localStorage`. It saves each card's reviewed mark and the last studied date back to the deck, matching each mark to the saved card with the same card ID, so edits made to the deck in another tab are kept and a mark never lands on the wrong card. Decks saved before cards had IDs get them the first time they are studied. If there is no deck ID, the deck is not found, or the deck has no cards, it shows a message instead of the flip card. The card can also be flipped with Enter or Space. Studying runs in rounds: a list of card positions and a matching list of true/false marks. A round is finished when every mark is true. The pop-up closes on its buttons, on a click outside the box, or on the `Escape` key. "Reset progress" sets every card back to not reviewed. "Review" starts a new round with only the not-yet-reviewed cards. |

## 4. Project structure

```
Memora/
├── index.html, login.html, create-deck.html, my-decks.html, study-decks.html
├── shared.css (site-wide styles) + one CSS file per page
├── login.js, create-deck.js, my-decks.js, study-decks.js (one JS file per interactive page)
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

| #   | Issue                                                                                                                                                                                                 | Next step                                                                                                                    |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 1   | Create Deck and Study can still be opened directly by URL without logging in first. (My Decks already checks.)                                                                                       | Add the same login check at the top of each of those pages' JavaScript.                                                      |

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
