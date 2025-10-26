# Coldr Frontend

A React-based frontend for the Coldr cold-email application. Built with React 19

> This project was entirely vibe coded with cursor

## Features

- Profile management with localStorage persistence
- Resume upload and management (PDF only)
- Multi-step application form
- Real-time form validation
- Modern UI with responsive design
- Profile and resume selection dropdowns
- Progress tracking and success/error notifications

## Tech Stack

- React 19.1.1
- Vite 7.1.7
- ESLint with React plugins
- CSS3 with modern features

## Prerequisites

- Node.js (version that supports React 19)
- npm or yarn
- Backend server running (default: http://localhost:5000)

## Setup

1. Install dependencies:

```powershell
npm install
```

2. Start the development server:

```powershell
npm run dev
```

The app will be available at http://localhost:5173 (or next available port).

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks

## Build for Production

```powershell
npm run build
npm run preview  # Optional: preview the build locally
```

The build output will be in the `dist/` directory.

## Project Structure

```
Frontend/
├── public/          # Static assets
├── src/
│   ├── assets/     # Project assets
│   ├── App.jsx     # Main application component
│   ├── App.css     # Styles for App component
│   ├── main.jsx    # Application entry point
│   └── index.css   # Global styles
├── index.html      # HTML entry point
└── vite.config.js  # Vite configuration
```

## Features Overview

### Profile Management
- Create and edit multiple profiles
- Persistent storage using localStorage
- Profile selection for quick reuse

### Resume Management
- Upload and store multiple PDF resumes
- Size limit: 10MB
- Quick resume selection for applications

### Application Form
1. Step 1: Profile & Resume Setup
   - Upload resume (PDF)
   - Create/edit profile
   - Save multiple profiles
2. Step 2: Application Details
   - Select saved profile/resume
   - Enter recipient details
   - Submit application

## Development Notes

- The app assumes the backend is running at `http://localhost:5000`
- Resumes are stored as base64 in localStorage
- Profile and resume data persist across sessions
- Form validations are implemented for all required fields

## ESLint Configuration

ESLint is configured with:
- React hooks plugin
- React refresh plugin
- Modern JavaScript features

## Contributing

1. Follow the ESLint configuration
2. Run `npm run lint` before committing
3. Ensure responsive design works
4. Test with various profiles and resume sizes

## Related

- [Backend Documentation](../Backend/README.md)
- [Project Overview](../README.md)
