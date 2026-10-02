# AI usage

This project was built with AI assistance. This file is the record of it. It is
graded as the finals badge, and it is worth 100 points.

Start it in week 1 and keep it up as you go. The commit history of this file is
part of the evidence: a file written all at once the night before the deadline
looks exactly like what it is.

## 1. How I used AI

At least six entries. One per real use. Every entry needs a commit link.

### 2026-09-22 - Home page build and review

- **Tool:** Claude Code
- **What I asked for:** I asked Claude to build the Home page for Memora as the reference pattern for the rest of the group. I gave it the site map, proposal, design system spec, and wireframes, and set the rules: no direct pushes to main, a two-file CSS split (shared.css for sitewide classes, a page-specific file for prefixed classes), and semantic HTML. I later asked for several rounds of fixes to match the wireframes more closely, a review against the course's concept coverage files, a sync check against the design system spec, and a final review before I pushed the branch myself.
- **What it gave back:** It gave back index.html, shared.css, and home.css for the Home page, plus matching edits to Design-System-Specification.css to keep it in sync with shared.css. It added hover and active state transitions, a prefers-reduced-motion rule, and a --content-max-width token. It also ran html-validate and axe-core checks and compared screenshots against the wireframes at mobile and desktop sizes.
- **What I kept, what I changed, and why:** I kept the two-file CSS structure and most of the layout as given. During the session I asked for the heading and intro text sizing to be fixed to match the wireframe, because the first version looked noticeably smaller than the wireframe at both mobile and desktop widths. I asked for the footer to stick to the bottom using flexbox because the wireframe shows it at the bottom of short pages, and it was not reaching the bottom on my screen. I asked for the button sizing on desktop to be reverted after trying a scoped override, because I decided the buttons should stay the same size as the shared button classes used everywhere else, instead of having a one-off size just for this page. I asked for the content to also be vertically centered, because the wireframe shows the heading, intro text, and buttons centered both ways, as a block sitting in the middle of the space between the nav bar and the footer, and the first version only had the horizontal centering.
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/1fdc64d3c54b32dae52e19269b1b54c9a09ff4eb

### 2026-09-30 - Renaming the My Decks and Study Decks files

- **Tool:** Claude Code
- **What I asked for:** I asked Claude to rename the files of the My Decks and Study Decks pages so they follow the Create Deck naming style (dashes, "deck" spelled out), without breaking any page. I gave it a prompt file with the setup, the source files to read, and the old file names. I told it to work on the renaming-files branch. I said I would commit, push, and merge myself, so it only gave me the commands. I also asked for a note for my teammates about the new names.
- **What it gave back:** It searched the whole repo for the old names first and made a plan before changing anything. It renamed the files with git mv (`mydecks` to `my-decks`, `study` to `study-decks`) and updated every link that used the old names: the CSS and JS tags, the logo and back links, and the Study button in my-decks.js. It also removed a script tag for a shared.js file that does not exist, and updated the README file names. It checked that no old names were left and that every link in the HTML and JS files points to a file that exists. It served the site locally and the new files loaded. After I merged, it wrote a note for my teammates.
- **What I kept, what I changed, and why:** I kept the new names my-decks and study-decks, and I agreed to removing the shared.js tag. I changed the plan: I took back my earlier instruction to let Claude commit, push, and merge, because I wanted to do those steps myself, and I asked for the teammate note after the merge. I kept the CSS classes and IDs (like .mydecks-\*) unchanged, because they are not file names and changing them is riskier. Claude removed Known Issues 1 to 3 from the README because the rename fixed them, and I reviewed those README edits myself before I committed. Claude only ran an automated link check and a local server test, not a click-through in a real browser, so I tested the pages myself afterwards.
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/9db43a0c5e2bf83efd94487c2dd6f33ac0c53a38

## 2. Where the AI got it wrong

Three cases. Be specific. If you write that the AI was never wrong, this section
scores zero.

### Case 1 - Said the My Decks JavaScript followed the course coverage, but it did not

- **What it gave me:** When Claude built the My Decks page, it told me its JavaScript stayed "within Modules 8 to 11 or the existing code". The version of my-decks.js it wrote used createElement, className, append, appendChild, the hidden property, Boolean(), encodeURIComponent() and a self-running function wrapper around the whole file. Claude did not point any of this out. I found it myself by reading through my-decks.js by hand and comparing what it used with the Concept Coverage files, and those calls are not in them.
- **What was wrong with it:** My rule from the start was that the code must stay strictly within what the Concept Coverage files discuss. When I asked Claude to check, it searched those files and none of those calls appear in the four JavaScript files, which matched what I had seen, so its claim was false. It had also agreed to avoid extra calls whenever a covered way existed. A covered way did exist: Module 10 builds a list by putting a string into innerHTML and uses textContent for text a user typed. Claude kept the old calls anyway and described them as things the existing repo code already used. It only found the problem when I asked whether the files were within coverage.
- **What I did instead:** I asked Claude to review the HTML, CSS and JS against the Concept Coverage files, and I chose the "strict where it is cheap" option. Claude rewrote my-decks.js so render() builds the page from the deck array with innerHTML and sets the deck titles afterwards with textContent. The empty state and the delete confirmation are written in the same way, so createElement, className, append, appendChild, hidden, Boolean(), encodeURIComponent() and the wrapper are gone. A few calls stay on purpose and are listed as outside the coverage: .focus() (I asked to keep it), window.location.href for the login redirect, Array.isArray, and e.key and e.target for the Escape key and clicking outside the modal. localStorage, JSON and URLSearchParams were already agreed as exceptions.
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/ab5ab7759131727d2d76a51a1e694f765e3552fc (Claude's first version of my-decks.js was never committed, because I found the problem before committing. The older my-decks.js in this repository came from an earlier commit (https://github.com/JoshPhilipPuangco/Memora/commit/81f0804e5cbd5852ac488d31b1d0ee64f45cb2f3) and used createElement 7 times. This commit replaces that older file with the final version that uses innerHTML and textContent, so the diff shows createElement going away. Claude's false claim about the coverage is only in my session with Claude, not in the commit.)


### Case 2 - Incorrect form selector

- **What it gave me:** An incorrect way of selecting the form using the element ID selector format.
- **What was wrong with it:** The form uses the class `create-deck-form`, so the selector needs to use `querySelector` with `.create-deck-form`.
- **What I did instead:** I used `document.querySelector(".create-deck-form")`.
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/c34cc32


## 3. Who wrote what

At least a fifth of this project is code you wrote yourself. Name it, and explain
it in your own words.

> Group projects: give each member their own heading below, and use your GitHub
> handle as the heading. You are graded on your own section.

### JoshPhilipPuangco

#### Written by me

##### Login/Signup page markup

- **File:** Memora/login.html
- **Commit:** [ef717c4](https://github.com/JoshPhilipPuangco/Memora/commit/ef717c4599e870d2a027a74067d2236730ad841a) (This commit holds both files. login.html is the one I wrote. Claude is listed as co-author because login.js in the same commit was mostly AI-written.)
- **What it does and why it is built this way:** This file is the HTML for the Login and Sign Up page. It is one page with two forms inside it, a login form and a signup form, instead of two separate pages. A pair of buttons at the top, the tab switcher, show one form and hide the other, using the hidden attribute, so the user never sees both at once and the page never reloads when they switch. Each form has a short note that says which fields are required, labels with a red asterisk on each required field, and an empty paragraph where an error message can be shown. The signup form also has a short helper line under each field that explains the rule for that field, such as the minimum length for the password.

  Both forms have the novalidate attribute, which turns off the browser's own pop-up validation, so the JavaScript file the AI wrote mostly (login.js) is the only thing that checks the input and shows error text. Every input, form, and error paragraph has an id, because login.js finds them with getElementById and uses them to read what the user typed and to save or check the account in localStorage. If an id here is changed without changing login.js to match, the matching lookup in login.js would stop working. Lastly, the novalidate attribute and the hidden attribute are not in Module 5 (Tables and Forms), which only covers required, type, pattern, minlength, and maxlength for the browser's built in validation. These two were not discussed in class, so outside research on MDN was needed to learn what they do and how to use them.

#### The AI-written part I understand best

##### Login/Signup validation and tab logic

- **File:** Memora/login.js
- **Commit:** [ef717c4](https://github.com/JoshPhilipPuangco/Memora/commit/ef717c4599e870d2a027a74067d2236730ad841a)
- **What it does and why we kept it:** This file is the JavaScript for the Login and Sign Up page. It finds the tab buttons, the two forms, the two error paragraphs, and all five inputs by id. The showTab function switches the class on the tab buttons and the hidden property on the two forms, so only one form shows at a time, and it clears both error messages every time the tab changes.

  The initTabFromHash function reads the page's URL hash when the page loads and picks the signup tab if the hash is #signup, so the Sign Up button on the Home page can open straight to that tab. The three isXValid functions check the username, email, and password by hand, using character loops, includes, and indexOf, instead of a regular expression, because the course has not covered RegExp. getAccount, saveAccount, and setCurrentUser read and write to localStorage with JSON.stringify and JSON.parse, since this project has no server and localStorage was agreed as an allowed exception. handleSignup and handleLogin run when a form is submitted. They call event.preventDefault() so the page does not reload, read the typed values, run them through the checks in order, and either show an error message or save the account and send the user to my-decks.html. We kept this file because it covers the whole signup and login flow in a way I can trace end to end, and most of it uses array and string methods already taught in class.
    
  A few parts (className, the hidden property, event.preventDefault(), and location.hash) are not in the Concept Coverage files, so I looked them up myself to understand them before accepting the code. I kept them in login.js, but I had className and the hidden property removed from my-decks.js (see Case 1). The reason is that the login page works in a different way. It is one page with two forms, and it must switch between them without a reload. event.preventDefault() stops the page from reloading when a form is submitted. location.hash lets the Sign Up button on the Home page open the page on the signup tab. The hidden property switches between two forms that are already in the HTML, so the page does not have to rebuild them. I did not find a way in the Concept Coverage files to prevent the reload, read the hash, or switch between two existing forms. className is the weakest case. It changes which tab button looks active when showTab runs, and initTabFromHash decides which tab shows first. I did not look for a covered way to do what className does. login.js was merged before the coverage review in Case 1, and after the review I decided to keep it for the reasons above.


### CharlesM-27

#### Written by me

##### Create Deck HTML

- **File:** `create-deck.html`
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/c34cc32
- **What it does and why it is built this way:** This file creates the Create Deck page structure. It contains the deck title field, question and answer fields, card container, and buttons. It reuses the shared classes from `shared.css` and uses Create Deck-specific classes where needed.

##### Create Deck CSS

- **File:** `create-deck.css`
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/c34cc32
- **What it does and why it is built this way:** This file contains styling specific to the Create Deck page. It controls the title alignment, form layout, and textarea size while leaving reusable component styles in `shared.css`.

##### Create Deck JavaScript

- **File:** `create-deck.js`
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/c34cc32
- **What it does and why it is built this way:** This file provides the page interactions. It adds new cards, gives their fields unique numbers, removes cards, handles Cancel, and prevents the form from reloading the page when submitted.

#### The AI-written part I understand best

##### Dynamic card creation

- **File:** `create-deck.js`
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/c34cc32
- **What it does and why we kept it:** The JavaScript creates new card sections when Add another card is clicked. The `cardNumber` variable increases so each new question and answer gets a unique ID. The Remove Card event listener allows dynamically created cards to be removed. I tested these functions in the browser and understand how the event listeners, DOM elements, and card container work together.
