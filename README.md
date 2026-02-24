# 🎓 CampusScribe

CampusScribe is a modern, full-stack monorepo application designed as a marketplace for university students to buy and sell authentic class notes, study guides, and flashcards. Built with scalability and performance in mind, this project leverages Turborepo, React, Express, and PostgreSQL.

This repository chronicles the foundational journey of establishing the application architecture across three distinct phases.

---

## 🏗️ Architecture & Tech Stack

The project is structured as a **Turborepo** monorepo to maximize code sharing and organize dependencies cleanly.

- **Frontend (`apps/web`)**: React, Vite, Tailwind CSS, React Router, Lucide Icons.
- **Backend (`apps/api`)**: Node.js, Express, TypeScript, JWT, Bcrypt.
- **Database (`packages/database`)**: PostgreSQL, Prisma ORM.

---

## 🚀 The Build Journey

### Phase 1: Infrastructure & UI Foundations
The journey began with setting up the structural backbone of the monorepo.
* **Workspaces**: Configured Turborepo to orchestrate the Node applications seamlessly (`web`, `api`, `database`).
* **Design System**: Integrated Tailwind CSS into the React frontend, establishing the brand color palette (a distinctive blue hue) and typography.
* **Component Library**: Developed modular UI elements, including:
  * A highly customizable `Button` component with varied sizes, variants, and loading states.
  * A responsive `Navbar` featuring navigation links, a prominent search bar, and clean user action items.

### Phase 2: Core Backend Logic
With the UI foundation set, the focus shifted to data persistence and secure API endpoints.
* **PostgreSQL via Docker**: Spun up a containerized PostgreSQL database to serve as the application's source of truth.
* **Prisma ORM**: Designed the database schema mapping Users, Course Categories, and Notes. Executed migrations and wrote a robust `seed.ts` script to populate dummy data (like Harvard CS50 study guides).
* **Authentication**: Implemented the `AuthService` using `bcrypt` for secure password hashing and `jsonwebtoken` for issuing access tokens.
* **Express Routes**: Created the `NotesService` and wired up RESTful endpoints, protecting them with an Express authentication middleware that validates Bearer tokens against the Prisma database.

### Phase 3: Frontend Integration
The final phase tied the React UI together with the live backend APIs to create a functional full-stack application.
* **Global Context**: Introduced `AuthContext.tsx` to wrap the React application, managing user sessions and JWT tokens seamlessly across components.
* **Auth Flows**: Designed and integrated the `Login` and `Register` pages, attaching React state directly to the Express endpoints.
* **Dynamic UI**: Updated the `Navbar` to conditionally render user profiles upon successful login, hiding generic authentication prompts.
* **Marketplace Browsing**: Built the beautiful `NoteCard` component. Refactored the `Browse` page to aggressively fetch live note listings from the PostgreSQL database, fully enabling search and category functionality.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- Docker Desktop (for running PostgreSQL natively)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sadiqueahmed/CampusScribe.git
   cd CampusScribe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Ensure an `.env` file exists at the root with the following:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/campus_scribe"
   JWT_SECRET="super-secret-jwt-key"
   PORT=5001
   ```

4. **Spin up the Database**
   ```bash
   docker run --name campus_scribe_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=campus_scribe -p 5432:5432 -v postgres_data:/var/lib/postgresql/data -d postgres:15-alpine
   ```

5. **Run Prisma Migrations & Seed**
   ```bash
   cd packages/database
   npx dotenv-cli -e ../../.env -- npx prisma db push
   npx dotenv-cli -e ../../.env -- npx prisma db seed
   cd ../../
   ```

6. **Start the Development Servers**
   ```bash
   # In one terminal, run the Express backend:
   npm run dev --workspace=@campus-scribe/api
   
   # In another terminal, run the React frontend:
   npm run dev --workspace=@campus-scribe/web
   ```

The Frontend will be available at `http://localhost:5173` and the Backend API at `http://localhost:5001`.
