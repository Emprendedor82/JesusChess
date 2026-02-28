# Jugadas Estrategicas - Chess Learning App

## Original Problem Statement
Frontend prototype of a gamified chess learning app for four roles: Student (Alumno), Teacher (Profesor), Parent (Apoderado), and School (Colegio). Mobile-first design with a bottom navigation and interactive chessboard.

## Architecture
- **Frontend-only** React prototype (Create React App + CRACO)
- **Styling:** Tailwind CSS
- **State:** React Context API + localStorage for course persistence
- **Routing:** react-router-dom
- **Deployment:** Configured for Vercel (vercel.json)

## Completed Features
- 4-role system (Alumno, Profesor, Apoderado, Colegio)
- Branded welcome screen with company branding
- Mobile-first responsive design (centered on tablet/desktop)
- Student section with bottom nav (Inicio, Entrenamiento, Retos, Curso, Perfil)
- Interactive chessboard with 4 levels of exercises and piece movement validation
- Course module MVP: 12 YouTube video lessons, mock payment, progress tracking
- Free preview for first course module
- Vercel deployment configuration
- **[Feb 2026] Bug fixes:** Chessboard squares now have uniform size (absolute-positioned pieces). Level changes auto-reset the board. Added visual level indicator.
- **[Feb 2026] Hamburger menu:** Reusable HamburgerMenu component (HamburgerMenu.jsx) used in StudentHomePage and TrainingHub. Dark/light variants for different backgrounds.
- **[Feb 2026] Search normalization:** TeacherPanel search now normalizes accents and case (NFD + regex). "Sofia" finds "Sofía", etc.

## Backlog
- Refactor ChessBoard.jsx (460+ lines) into smaller components/hooks
- User provides requirements incrementally - await next task

## Key Files
- `/app/frontend/src/components/chess/ChessBoard.jsx` - Interactive chessboard
- `/app/frontend/src/components/pages/TrainingPages.jsx` - Training section pages
- `/app/frontend/src/App.js` - Main router
- `/app/frontend/src/index.css` - Global styles + responsive system
- `/app/frontend/src/components/layout/MobileLayout.jsx` - Student layout
- `/app/frontend/src/data/courseData.js` - Course content data
