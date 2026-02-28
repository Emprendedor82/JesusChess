# Jugadas Estrategicas - Chess Learning App

## Original Problem Statement
Frontend prototype of a gamified chess learning app for five roles: Student (Alumno), Teacher (Profesor), Parent (Apoderado), School (Colegio), and Admin (Administrador). Mobile-first design with responsive desktop view.

## Architecture
- **Frontend-only** React prototype (Create React App + CRACO)
- **Styling:** Tailwind CSS
- **State:** React Context API + localStorage for course/notifications persistence
- **Routing:** react-router-dom
- **Deployment:** Configured for Vercel (vercel.json)

## Completed Features
- 5-role system (Alumno, Profesor, Apoderado, Colegio, Administrador)
- Unified demo login screen with radio-style role selector + "Ingresar" button
- Branded welcome screen with company branding
- Mobile-first responsive design (centered on tablet/desktop, wide for admin)
- Student section with bottom nav (Inicio, Entrenamiento, Retos, Curso, Perfil)
- Interactive chessboard with 4 levels, instruction blocks, piece movement validation
- Course module MVP: 12 YouTube video lessons, mock payment, progress tracking
- Free preview for first course module
- Hamburger menu (reusable component) in Student Home and Training Hub
- Bell icon with notifications badge in student header
- Task assignment system: Teacher assigns tasks → student gets in-app notifications with deep links
- Teacher panel with accent-insensitive student search
- School dashboard with prominent search bar (accent/case insensitive, debounced)
- **Admin Dashboard** with: global stats, 3 tabs (Dashboard/Colegios/Usuarios), school search, user list with role filters, impersonation ("Entrar como")
- Vercel deployment configuration

## Key Files
- `/app/frontend/src/components/pages/WelcomeScreen.jsx` - Demo login with 5-role selector
- `/app/frontend/src/components/pages/AdminDashboard.jsx` - Admin panel
- `/app/frontend/src/components/chess/ChessBoard.jsx` - Interactive chessboard
- `/app/frontend/src/components/pages/TrainingPages.jsx` - Training section
- `/app/frontend/src/components/pages/TeacherPanel.jsx` - Teacher panel
- `/app/frontend/src/components/pages/SchoolDashboard.jsx` - School dashboard
- `/app/frontend/src/components/pages/NotificationsPage.jsx` - Student notifications
- `/app/frontend/src/components/layout/HamburgerMenu.jsx` - Reusable menu component
- `/app/frontend/src/data/notificationStore.js` - localStorage notification/assignment store
- `/app/frontend/src/context/AppContext.js` - Global state (5 roles)
- `/app/frontend/src/App.js` - Main router

## Backlog
- Push notifications (Fase 2 - requires Firebase/OneSignal infrastructure)
- Refactor ChessBoard.jsx (500+ lines) into smaller components/hooks
- Admin CRUD operations (currently read-only)
- Real authentication system (email+password)
- Backend API integration
