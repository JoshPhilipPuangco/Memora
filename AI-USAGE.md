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

### 2026-10-02 - Home page build and review

- **Tool:** Claude Code
- **What I asked for:** I asked Claude to build the Home page for Memora as the reference pattern for the rest of the group. I gave it the site map, proposal, design system spec, and wireframes, and set the rules: no direct pushes to main, a two-file CSS split (shared.css for sitewide classes, a page-specific file for prefixed classes), and semantic HTML. I later asked for several rounds of fixes to match the wireframes more closely, a review against the course's concept coverage files, a sync check against the design system spec, and a final review before I pushed the branch myself.
- **What it gave back:** It gave back index.html, shared.css, and home.css for the Home page, plus matching edits to Design-System-Specification.css to keep it in sync with shared.css. It added hover and active state transitions, a prefers-reduced-motion rule, and a --content-max-width token. It also ran html-validate and axe-core checks and compared screenshots against the wireframes at mobile and desktop sizes.
- **What I kept, what I changed, and why:** [CHECK] I kept the two-file CSS structure and most of the layout as given. During the session I asked for the heading and intro text sizing to be fixed to match the wireframe, for the footer to stick to the bottom using flexbox, for the button sizing on desktop to be reverted after trying a scoped override, and for the content to be vertically centered instead of horizontally. [CHECK: please confirm if there were other changes you made by hand after this, since I only have the in-session record, not the final diff of the commit.]
- **Commit:** https://github.com/JoshPhilipPuangco/Memora/commit/1fdc64d3c54b32dae52e19269b1b54c9a09ff4eb

## 2. Where the AI got it wrong

Three cases. Be specific. If you write that the AI was never wrong, this section
scores zero.

### Case 1 - short title

- **What it gave me:**
- **What was wrong with it:**
- **What I did instead:**
- **Commit:** https://github.com/YOUR-USERNAME/YOUR-REPO/commit/SHA

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
