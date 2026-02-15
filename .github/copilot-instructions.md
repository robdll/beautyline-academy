# Beauty Line Academy - Copilot Instructions

## Repository Overview

Beauty Line Academy is a full-stack web application for a professional beauty training center and supplier. The platform serves three main business pillars:
- Professional education courses and booking
- Cosmetic product distribution with categorization and filtering
- Aesthetic equipment sales and rental management

**Repository Type:** Monorepo with separate frontend and backend applications  
**Primary Languages:** JavaScript (Node.js backend, React frontend)  
**Database:** MongoDB with Mongoose ODM  
**Project Size:** Small to medium-scale educational/e-commerce platform

## Tech Stack

### Backend (`/backEnd`)
- **Runtime:** Node.js (v18 or higher recommended)
- **Framework:** Express 5.2.1
- **Database:** MongoDB with Mongoose 9.2.1
- **Key Dependencies:**
  - `cors` - CORS middleware
  - `dotenv` - Environment configuration
  - `morgan` - HTTP request logger
  - `nodemon` - Development hot-reload
  - `zod` - Schema validation (4.3.6)

### Frontend (`/frontEnd`)
- **Build Tool:** Vite 7.3.1
- **Framework:** React 19.2.0
- **Styling:** Tailwind CSS 4.1.18
- **Linting:** ESLint 9.39.1
- **Key Dependencies:**
  - `@cloudinary/react` & `@cloudinary/url-gen` - Image management
  - `react-dom` - React rendering

## Build & Development Instructions

### Initial Setup (First Time Only)

1. **Install dependencies for both frontend and backend:**
   ```bash
   # Backend dependencies
   cd backEnd
   npm install
   
   # Frontend dependencies
   cd ../frontEnd
   npm install
   ```

2. **Environment Configuration:**
   - Backend: Create `/backEnd/.env` file with:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/beautyline-academy
     ```
   - Frontend: Environment variables are handled through Vite

### Development Workflow

**Always run backend and frontend in separate terminal sessions.**

#### Backend Development
```bash
cd backEnd
npm run dev        # Starts server with nodemon on port 3000
# or
npm start          # Starts server without hot-reload
```
- Server runs on `http://localhost:3000`
- Nodemon automatically restarts on file changes
- MongoDB connection must be active before starting

#### Frontend Development
```bash
cd frontEnd
npm run dev        # Starts Vite dev server on port 5173
# or
npm start          # Alternative command (same as dev)
```
- Development server runs on `http://localhost:5173`
- Hot module replacement (HMR) enabled
- Automatically proxies API requests to backend

#### Linting
```bash
cd frontEnd
npm run lint       # Runs ESLint on frontend code
```
- **Note:** Backend does not have linting configured
- Frontend uses ESLint 9.x with React-specific rules
- Fix linting errors before committing frontend changes

#### Production Build
```bash
cd frontEnd
npm run build      # Creates optimized production build
npm run preview    # Preview production build locally
```
- Build output goes to `/frontEnd/dist`
- Preview runs on different port than dev server

### Testing

**Current Status:** No test infrastructure configured yet.
- Backend `package.json` shows: `"test": "echo \"Error: no test specified\" && exit 1"`
- No test files or testing libraries present
- When adding tests, consider Jest for backend and Vitest for frontend (Vite-native)

## Project Structure & Architecture

```
/
├── backEnd/              # Node.js/Express API server
│   ├── config/          # Database and configuration files
│   │   └── DBmongo.js   # MongoDB connection setup
│   ├── controllrs/      # Route handlers (note: typo in dirname)
│   │   └── user.controlrs.js
│   ├── model/           # Mongoose schemas
│   │   └── userDB.model.js
│   ├── routes/          # Express route definitions
│   │   └── user.router.js
│   ├── middlware/       # Express middleware (note: typo in dirname)
│   ├── validaty/        # Validation schemas (note: typo in dirname)
│   └── server.js        # Application entry point
│
├── frontEnd/            # React/Vite client application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── constants/   # Constants and configuration
│   │   ├── App.jsx      # Root component
│   │   ├── main.jsx     # Application entry point
│   │   └── index.css    # Global styles (Tailwind)
│   ├── public/          # Static assets
│   ├── vite.config.js   # Vite configuration
│   ├── eslint.config.js # ESLint configuration
│   └── postcss.config.js # PostCSS/Tailwind configuration
│
└── README.md            # Project documentation
```

### Key Architectural Notes

- **Monorepo Structure:** Frontend and backend are separate npm projects
- **Directory Naming:** Several backend directories have typos (`controllrs`, `middlware`, `validaty`) - these are intentional/existing and should be preserved
- **API Integration:** Frontend expects backend on `http://localhost:3000`
- **Database Connection:** MongoDB connection is established in `server.js` via `connectDB()` from `config/DBmongo.js`
- **Routing:** Backend uses single router file (`user.router.js`) mounted at root path

## Common Patterns & Best Practices

### Backend Patterns
- **Server Entry Point:** All setup happens in `server.js` - middleware, routing, DB connection
- **Middleware Order:** CORS → JSON parser → Morgan logger → Routes
- **Environment Variables:** Always use `process.env` with fallback values (e.g., `process.env.PORT || 3000`)
- **Database Models:** Use Mongoose schemas in `/model` directory

### Frontend Patterns
- **Component Organization:** Components stored in `/src/components`
- **Styling:** Tailwind CSS utility classes (configured via PostCSS)
- **Asset Management:** Cloudinary integration for image handling
- **Build Output:** Never commit `/frontEnd/dist` directory (it's in `.gitignore`)

### Code Style
- **Backend:** Node.js CommonJS modules (`require`/`module.exports`)
- **Frontend:** ES Modules (`import`/`export`)
- **Indentation:** 2 spaces (both frontend and backend)
- **Semicolons:** Used in backend, optional in frontend (React)

## Common Issues & Workarounds

### MongoDB Connection Issues
- **Problem:** Server starts but can't connect to MongoDB
- **Solution:** Ensure MongoDB is running locally or valid MONGODB_URI in `.env`
- **Error Message:** Look for connection errors in server console

### Port Conflicts
- **Problem:** "Port 3000/5173 is already in use"
- **Solution:** Kill the process or use different port in `.env`/`vite.config.js`

### Dependency Installation
- **Always run `npm install` in both `/backEnd` and `/frontEnd` directories separately**
- Never run `npm install` from root directory
- If dependencies seem corrupted, delete `node_modules` and `package-lock.json`, then reinstall

### Frontend Build Issues
- **Problem:** Build fails with Tailwind/PostCSS errors
- **Solution:** Ensure `postcss.config.js` is properly configured
- Check Tailwind version compatibility (using v4.x)

### CORS Issues
- Backend already has CORS enabled via `cors()` middleware
- If frontend can't reach backend, verify both servers are running
- Check browser console for CORS-related errors

## Development Best Practices

1. **Always start backend before frontend** to ensure API is available
2. **Check both terminals** when debugging - errors may appear in either
3. **Use `npm run dev`** for development (not `npm start`) to get hot-reload
4. **Lint frontend code** before committing with `npm run lint`
5. **Never commit `.env` files** - they're in `.gitignore` for security
6. **Preserve directory typos** (`controllrs`, `middlware`, `validaty`) - these are part of existing structure
7. **MongoDB must be running** before backend can start successfully
8. **Keep package-lock.json** - commit it to ensure consistent dependency versions

## File Locations Reference

- **Backend Entry:** `/backEnd/server.js`
- **Frontend Entry:** `/frontEnd/src/main.jsx`
- **Database Config:** `/backEnd/config/DBmongo.js`
- **Routes:** `/backEnd/routes/user.router.js`
- **Models:** `/backEnd/model/userDB.model.js`
- **React Root:** `/frontEnd/src/App.jsx`
- **Frontend Config:** `/frontEnd/vite.config.js`, `/frontEnd/eslint.config.js`
- **Environment Files:** `/backEnd/.env` (create manually, not in repo)

## Quick Command Reference

```bash
# Backend
cd backEnd && npm install           # Install backend dependencies
cd backEnd && npm run dev           # Start backend development server

# Frontend  
cd frontEnd && npm install          # Install frontend dependencies
cd frontEnd && npm run dev          # Start frontend development server
cd frontEnd && npm run lint         # Run ESLint
cd frontEnd && npm run build        # Build for production

# Both (run in separate terminals)
cd backEnd && npm run dev           # Terminal 1
cd frontEnd && npm run dev          # Terminal 2
```

## Trust These Instructions

These instructions have been validated against the current repository state. Only search for additional information if:
- These instructions are incomplete for your specific task
- You encounter errors not documented here
- The repository structure has changed since these instructions were written
- You need to understand specific business logic in the codebase

For exploring code logic and implementation details, use grep/search tools as needed.
