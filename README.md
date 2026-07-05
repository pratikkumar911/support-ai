<<<<<<< HEAD
# Assistly

<img width="1902" height="1029" alt="Screenshot 2026-07-04 151805" src="https://github.com/user-attachments/assets/c5aaf3ba-9033-4dcd-a92b-996583e25a26" />

<img width="642" height="737" alt="Screenshot 2026-07-04 152729" src="https://github.com/user-attachments/assets/65045272-1280-43b6-8789-55c719ede53c" />

Assistly is a modern AI support platform built with Next.js. It allows a business owner to authenticate, configure their assistant knowledge, generate an embeddable chat widget, and let website visitors ask questions through an AI-powered support experience.

The project combines authentication, database-backed settings, and a Gemini-powered chat API into one flow that feels simple from the user’s perspective but is structured enough to scale.

## What this project does

Assistly helps a company do three main things:

1. Authenticate an admin user
2. Store business-specific support knowledge
3. Embed a live AI chat assistant into a website

Once configured, the assistant can answer questions based on the company’s saved information such as policies, delivery rules, refund details, support hours, and general FAQs.

## Core project flow

Here is the main user journey in this application:

1. A visitor lands on the home page
2. If they are not signed in, they can log in through ScaleKit authentication
3. After login, the app creates a session and the user can enter the dashboard
4. In the dashboard, the owner enters company details and support knowledge
5. These settings are saved to MongoDB
6. The owner opens the embed page and copies a small script snippet
7. The script is pasted into a website, where it injects a floating support chat widget
8. When a customer sends a message, the widget sends it to the chat API
9. The chat API loads the owner’s saved settings, builds a prompt, and sends it to Gemini
10. The response is returned to the website chat widget as the assistant answer

## Architecture overview

### Frontend

The frontend is built with Next.js App Router and React. The important UI pages are:

- Home page: landing experience and login/logout flow
- Dashboard page: settings management for the assistant
- Embed page: script generation for website integration

### Backend APIs

The app uses server-side route handlers to manage authentication and chat behavior:

- /api/auth/login: starts the authentication redirect flow
- /api/auth/callback: receives the OAuth callback and creates the session cookie
- /api/settings: saves or updates assistant settings
- /api/settings/get: retrieves saved settings for a specific owner
- /api/chat: receives chat messages and returns AI-generated answers

### Data layer

The project uses MongoDB through Mongoose to store assistant configuration. Each owner has a single settings document keyed by ownerId.

## Main folders

- src/app: application routes, pages, and API handlers
- src/components: client-side UI components such as the home, dashboard, and embed screens
- src/lib: shared logic for database connection, session handling, and authentication client setup
- src/model: Mongoose schemas for persisted data
- public: static assets such as the embeddable chat script

## How the assistant works

The assistant is not a generic chatbot by default. It is designed to answer only from the information you provide in the dashboard.

When a customer asks a question:

- the widget sends the message and ownerId to the chat endpoint
- the server loads the matching saved settings
- a constrained prompt is created using the company information
- Gemini responds using only that knowledge
- if the question is unrelated or not answerable from the provided data, the assistant returns a fallback response

This keeps the assistant consistent, controlled, and useful for customer support.

## Environment variables

Create a .env.local file in the project root and add the following values:

- NEXT_PUBLIC_APP_URL: the public URL of your application
- SCALEKIT_ENVIRONMENT_URL: your ScaleKit environment URL
- SCALEKIT_CLIENT_ID: your ScaleKit client ID
- SCALEKIT_CLIENT_SECRET: your ScaleKit client secret
- MONGODB_URL: your MongoDB connection string
- GEMINI_API_KEY: your Google Gemini API key

## Getting started

Install dependencies:

npm install

Run the development server:

npm run dev

Then open http://localhost:3000 in your browser.

## Build and lint

To create a production build:

npm run build

To run lint checks:

npm run lint

## Deployment notes

This project is designed to be deployed as a Next.js app. Make sure your environment variables are configured in your hosting platform and that the public application URL is correct for authentication and embed script behavior.

If you self-host or change the deployment domain, update the chat endpoint reference in the embed script so it points to the correct backend route.

## Summary

Assistly is a simple but complete AI support workflow:

- authenticate the owner
- store company support knowledge
- generate an embed script
- let website visitors chat with an AI assistant

That makes it a practical starting point for building a branded customer support experience for any business.
