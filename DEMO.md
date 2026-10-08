# Memora demo walkthrough

This walkthrough takes you through Memora's main flow in about five minutes. You do not need any setup: open the [live site](https://joshphilippuangco.github.io/Memora/) (or `index.html` if you cloned the repository).

Memora has no backend. Everything you create is saved in your own browser's `localStorage`, so nobody else can see it. The site supports **one account per browser**, so you make your own account in step 1 instead of using a ready-made one.

## 1. Sign up

On the Home page, click **Sign Up**. You can use these example values, or your own:

| Field    | Example value        | Rule                                                        |
| -------- | -------------------- | ----------------------------------------------------------- |
| Username | `demo_student`       | At least 6 characters. Letters, numbers, and `_` only.      |
| Email    | `demo@example.com`   | Must be a valid email format.                               |
| Password | `memora123`          | At least 6 characters.                                      |

After you sign up, you are taken to **My Decks**. It is empty, so the page shows a "+ Create Deck" button.

## 2. Create two decks

Click **+ Create Deck**. Type the title, then fill in each Question and Answer. Click **Add another card** to get more card fields, and **Save deck** when you are done. Do this once for each deck below.

### Deck 1: Calculus

| # | Question                                      | Answer                                  |
| - | --------------------------------------------- | --------------------------------------- |
| 1 | What is the derivative of x^2?                | 2x                                      |
| 2 | What is the derivative of sin(x)?             | cos(x)                                  |
| 3 | What is the integral of 1/x?                  | ln\|x\| + C                             |
| 4 | What does the Fundamental Theorem of Calculus say? | Differentiation and integration are inverse operations. |

### Deck 2: Spanish

| # | Question                  | Answer       |
| - | ------------------------- | ------------ |
| 1 | How do you say "hello"?   | hola         |
| 2 | How do you say "thank you"? | gracias    |
| 3 | How do you say "library"? | biblioteca   |
| 4 | How do you say "tomorrow"? | mañana      |

## 3. Try the main features

1. **My Decks:** both decks now show as cards with a progress summary (for example, "4 total, 0 reviewed, 4 not yet reviewed"). Type `span` in "Search decks" to filter the list by title.
2. **Study Mode:** click a deck title. Click the card (or press Enter or Space) to flip it between the question and the answer. Click **Mark Reviewed** or **Mark Not Yet Reviewed**, and watch the progress numbers change. Use **Previous card** and **Next card** to move around.
3. **Finish a round:** once every card is marked, a pop-up ("Round complete") asks whether to review only the cards still marked Not Yet Reviewed (the "Review N cards" button) or to start over (the "Reset progress" button). Try both. If every card is marked Reviewed, the pop-up only asks about resetting. The same pop-up ("Welcome back") shows when you open a deck that already has progress.
4. **Edit:** back on My Decks, click **Edit** on a deck, change a card, add or remove a card, and click **Save changes**. Cards you already marked keep their reviewed mark.
5. **Delete:** click **Delete** on a deck and confirm in the pop-up (or cancel it).
6. **Log out and back in:** click **Log Out** on My Decks. From the Home page, click **Log In** and use the email and password from step 1. Your decks are still there.

## 4. Start over

To reset the demo, clear this site's data in your browser (in the browser's developer tools, open the Application or Storage tab and clear `localStorage` for the site). Then you can sign up again with new values.
