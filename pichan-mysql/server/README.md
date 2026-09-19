# pi-chan admin API

Small Express + MySQL backend that stores **admin panel edits** — it does not
hold the site's actual content (that stays in `src/models/*.ts`, exactly as
before, and ships in the static frontend build). This server stores only:

- edited text for existing content (`field_overrides`)
- new subtopics / theory items / practice problems added through the admin
  panel (`added_items`)

The frontend fetches this on load and merges it on top of the static
content, same as the old localStorage-based version — the only thing that
changed is *where* it's stored, so edits are now shared across browsers and
devices instead of being stuck in one browser's localStorage.

## Setup

1. Create a MySQL database and load the schema:
   ```bash
   mysql -u root -p -e "CREATE DATABASE pichan CHARACTER SET utf8mb4"
   mysql -u root -p pichan < schema.sql
   ```
2. Copy the env file and fill in your MySQL credentials:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies and start the server:
   ```bash
   npm install
   npm run dev
   ```
   It listens on `http://localhost:4000` by default (`PORT` in `.env`).

4. Point the frontend at it — in the project root (not `server/`), create
   `.env` with:
   ```bash
   VITE_API_URL=http://localhost:4000
   ```
   then run the frontend as usual (`npm run dev` in the project root).

## Auth model

There's no user table or sessions — just one shared admin passphrase
(`ADMIN_PASSPHRASE` in `.env`, defaults to `pichan-admin`). Logging in from
the admin panel sends the password to `POST /api/auth/login`; if correct,
the frontend keeps it in memory and sends it back as
`Authorization: Bearer <password>` on every write request. This is fine for
"one trusted person edits the site" but is **not** a real multi-user auth
system — don't reuse this pattern for anything with actual user accounts.

## Endpoints

| Method | Path                     | Auth  | What it does                                   |
|--------|--------------------------|-------|-------------------------------------------------|
| POST   | `/api/auth/login`        | —     | Checks the password, returns a token            |
| GET    | `/api/overrides`         | —     | Returns all field edits + added items           |
| PATCH  | `/api/overrides/field`   | admin | Upserts one edited text field                   |
| POST   | `/api/overrides/item`    | admin | Appends a new item to a group (subtopic, theory item, practice problem, …) |
| POST   | `/api/overrides/reset`   | admin | Wipes all edits                                 |
