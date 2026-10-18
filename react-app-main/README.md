# Recipe Book — Redesigned Frontend

React + Vite + TypeScript frontend. The design uses an espresso-dark system background, walnut recipe cards, light-brown/caramel accents, readable white text, and food photography (not coffee imagery). It retains the Recipe Book user and admin routes and includes a shared logout action on protected pages.

## Run locally
1. Open this folder in VS Code.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set `VITE_API_URL` to your local Express API base URL for local development.
4. Run `npm run dev`.

## Vercel deployment
- Set the project root to this frontend folder.
- Build command: `npm run build`
- Output directory: `dist`
- Set `VITE_API_URL` in Vercel to the actual production backend base URL, for example `https://your-api.onrender.com` (add `/api` only if your backend expects that prefix).
- Do not use localhost for the production URL. Redeploy after changing environment variables.

The API URL shown in `.env.example` is a placeholder and must be replaced with your real backend URL. Authentication and recipe persistence still depend on the connected Express API.


## Express API integration

The frontend now calls the Express API; it no longer seeds demo accounts or stores recipes in local storage. Configure `VITE_API_URL` in `.env` to the backend base URL (for example `http://localhost:5000/api`) and restart Vite after changing it.

The frontend expects these endpoints relative to that base URL:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/auth/login` | Accept `{ "email", "password" }`; return `{ "user": { "id", "name", "email", "role" }, "token": "..." }` or set a session cookie |
| POST | `/auth/signup` | Accept `{ "name", "email", "password" }`; return the created user and optionally a bearer token |
| GET | `/auth/me` | Return the currently authenticated user (directly or under `user`/`data`) |
| POST | `/auth/logout` | End the server session |
| GET | `/users` | Return an array of users, or `{ "users": [...] }` (admin-only) |
| GET | `/recipes` | Return recipes visible to the authenticated user |
| GET | `/recipes/mine` | Return recipes owned by the current user |
| GET | `/recipes/:id` | Return one recipe |
| POST | `/recipes` | Create a recipe from the submitted recipe fields |
| PUT | `/recipes/:id` | Update a recipe |
| DELETE | `/recipes/:id` | Delete a recipe |

Recipe objects should use the frontend fields `id`, `title`, `description`, `imageUrl`, `cuisine`, `category`, `minutes`, `servings`, `difficulty`, `ingredients` (string array), `steps` (string array), `authorId`, `authorName`, and `createdAt`. The backend must enforce authentication, recipe ownership, and admin permissions; frontend checks alone are not security.

For bearer-token authentication, return `token` or `accessToken` from login/signup. For cookie sessions, enable credentials/CORS on the Express server and keep the frontend's `withCredentials` enabled. Do not use a placeholder API URL in deployment settings.
