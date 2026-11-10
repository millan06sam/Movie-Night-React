# Movie Night · Ghibli Edition

M3 · Reactor Core.

A React 19 app for browsing Studio Ghibli movies. Built with Vite.

## Run locally

With Node.js 24 and npm installed:

```sh
npm install
npm run dev
```

Open the localhost URL printed by Vite. No API key is required.

## Features

- Search movies by title.
- Filter by year and minimum critic score.
- View average scores for the displayed movies.
- Loading, error, retry, and empty-result states.
- Responsive layout and keyboard-accessible controls.

The catalogue loads from https://ghibliapi.vercel.app/.
Searches and filters operate on the loaded data.

Scores are Rotten Tomatoes percentages supplied by the API.
Missing scores are excluded from the average.

## Checks

```sh
npm run lint
npm run build
```

##Uso de IA

I used OpenAI Codex to generate and explain complicated parts of the code,
review it against the course theory, and run automated checks.

Actual request:
"Go through each code snippet explaining the syntax, the structure,
and the logic. Not just the how but the why, and how it relates to the
requirements of the assignment. I want you to explain as if you had to prepare a student for a defence."

I added code from the explanations and committed work in stages

I am responsible for understanding and defending the logic of the submitted code.

## Autopsia

1. I chose a smaller, credential-free film API instead of retaining TMDB.
   This lets the browser request data directly and removes the custom
   backend and private-token setup. The disadvantage is that the app
   only searches the Ghibli catalogue. Keeping TMDB would provide more
   movies but require additional infrastructure to keep its token private.

2. I calculate filtered results and score statistics directly from the
   loaded movies and selected filters. An alternative was storing those
   results in separate state and updating them with effects. I rejected
   that approach because the values can already be derived, and separate
   state would create more opportunities for them to become inconsistent.
