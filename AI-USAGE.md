# AI usage

This project was built with AI assistance. This file is the record of it. It is
graded as the finals badge, and it is worth 100 points.

Start it in week 1 and keep it up as you go. The commit history of this file is
part of the evidence: a file written all at once the night before the deadline
looks exactly like what it is.

## 1. How I used AI

At least six entries. One per real use. Every entry needs a commit link.

### YYYY-MM-DD - short title

- **Tool:**
- **What I asked for:**
- **What it gave back:**
- **What I kept, what I changed, and why:**
- **Commit:** https://github.com/YOUR-USERNAME/YOUR-REPO/commit/SHA

### 2026-09-22 - Home page build and review

- **Tool:** Claude Code
- **What I asked for:** I asked Claude to build the Home page for Memora as the reference pattern for the rest of the group. I gave it the site map, proposal, design system spec, and wireframes, and set the rules: no direct pushes to main, a two-file CSS split (shared.css for sitewide classes, a page-specific file for prefixed classes), and semantic HTML. I later asked for several rounds of fixes to match the wireframes more closely, a review against the course's concept coverage files, a sync check against the design system spec, and a final review before I pushed the branch myself.
- **What it gave back:** It gave back index.html, shared.css, and home.css for the Home page, plus matching edits to Design-System-Specification.css to keep it in sync with shared.css. It added hover and active state transitions, a prefers-reduced-motion rule, and a --content-max-width token. It also ran html-validate and axe-core checks and compared screenshots against the wireframes at mobile and desktop sizes.
- **What I kept, what I changed, and why:** I kept the two-file CSS structure and most of the layout as given. During the session I asked for the heading and intro text sizing to be fixed to match the wireframe, for the footer to stick to the bottom using flexbox, for the button sizing on desktop to be reverted after trying a scoped override, and for the content to be vertically centered instead of horizontally.
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/1fdc64d3c54b32dae52e19269b1b54c9a09ff4eb

### 2026-09-30 - Renaming the My Decks and Study Decks files

- **Tool:** Claude Code
- **What I asked for:** I asked Claude to rename the files of the My Decks and Study Decks pages so they follow the Create Deck naming style (dashes, "deck" spelled out), without breaking any page. I gave it a prompt file with the setup, the source files to read, and the old file names. I told it to work on the renaming-files branch. I said I would commit, push, and merge myself, so it only gave me the commands. I also asked for a note for my teammates about the new names.
- **What it gave back:** It searched the whole repo for the old names first and made a plan before changing anything. It renamed the files with git mv (mydecks._ to my-decks._, study._ to study-decks._) and updated every link that used the old names: the CSS and JS tags, the logo and back links, and the Study button in my-decks.js. It also removed a script tag for a shared.js file that does not exist, and updated the README file names. It checked that no old names were left and that every link in the HTML and JS files points to a file that exists. It served the site locally and the new files loaded. After I merged, it wrote a note for my teammates.
- **What I kept, what I changed, and why:** I kept the new names my-decks and study-decks, and I agreed to removing the shared.js tag. I changed the plan: I took back my earlier instruction to let Claude commit, push, and merge, because I wanted to do those steps myself, and I asked for the teammate note after the merge. I kept the CSS classes and IDs (like .mydecks-\*) unchanged, because they are not file names and changing them is riskier. Claude removed Known Issues 1 to 3 from the README because the rename fixed them, and I reviewed those README edits myself before I committed. Claude only ran an automated link check and a local server test, not a click-through in a real browser, so I tested the pages myself afterwards.
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/9db43a0c5e2bf83efd94487c2dd6f33ac0c53a38

## 2. Where the AI got it wrong

Three cases. Be specific. If you write that the AI was never wrong, this section
scores zero.

### Case 1 - Said the My Decks JavaScript followed the course coverage, but it did not

- **What it gave me:** When Claude built the My Decks page, it told me its JavaScript stayed "within Modules 8 to 11 or the existing code". The version of my-decks.js it wrote used createElement, className, append, appendChild, the hidden property, Boolean(), encodeURIComponent() and a self-running function wrapper around the whole file. Claude did not point any of this out. I found it myself by reading through my-decks.js by hand and comparing what it used with the Concept Coverage files, and those calls are not in them.
- **What was wrong with it:** My rule from the start was that the code must stay strictly within what the Concept Coverage files discuss. When I asked Claude to check, it searched those files and none of those calls appear in the four JavaScript files, which matched what I had seen, so its claim was false. It had also agreed to avoid extra calls whenever a covered way existed. A covered way did exist: Module 10 builds a list by putting a string into innerHTML and uses textContent for text a user typed. Claude kept the old calls anyway and described them as things the existing repo code already used. It only found the problem when I asked whether the files were within coverage.
- **What I did instead:** I asked Claude to review the HTML, CSS and JS against the Concept Coverage files, and I chose the "strict where it is cheap" option. Claude rewrote my-decks.js so render() builds the page from the deck array with innerHTML and sets the deck titles afterwards with textContent. The empty state and the delete confirmation are written in the same way, so createElement, className, append, appendChild, hidden, Boolean(), encodeURIComponent() and the wrapper are gone. A few calls stay on purpose and are listed as outside the coverage: .focus() (I asked to keep it), window.location.href for the login redirect, Array.isArray, and e.key and e.target for the Escape key and clicking outside the modal. localStorage, JSON and URLSearchParams were already agreed as exceptions. I asked it to leave the CSS file out of this review because I have already reviewed it manually. Some CSS in my-decks.css was outside of the Concept Coverage files, such as :focus-visible, etc. I kept them because I understood what they did through my own research. I ran the browser checks again after the rewrite.
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/ab5ab7759131727d2d76a51a1e694f765e3552fc (Claude's first version was never committed. This commit shows the older my-decks.js, which used createElement 7 times, replaced by the final version that uses innerHTML and textContent. Claude's false claim about the coverage is only in my session with Claude, not in the commit.)

## 3. Who wrote what

At least a fifth of this project is code you wrote yourself. Name it, and explain
it in your own words.

> Group projects: give each member their own heading below, and use your GitHub
> handle as the heading. You are graded on your own section.

### Written by me

- **File:**
- **Commit:**
- **What it does and why it is built this way:**

### The AI-written part I understand best

- **File:**
- **Commit:**
- **What it does and why we kept it:**
