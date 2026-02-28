# Jugadas Estrategicas - Chess Learning App

## Original Problem Statement
Frontend prototype of a gamified chess learning app for five roles: Student (Alumno), Teacher (Profesor), Parent (Apoderado), School (Colegio), and Admin (Administrador). Mobile-first design with responsive desktop view.

## Architecture
- **Frontend-only** React prototype (Create React App + CRACO)
- **Styling:** Tailwind CSS
- **State:** React Context API + localStorage for course/notifications
- **Routing:** react-router-dom
- **Deployment:** Configured for Vercel (vercel.json)

## Completed Features
- 5-role system with unified demo login screen
- Left-side drawer menu (global, role-aware) on ALL student pages via MobileLayout
- Old Layout (Header + Sidebar) for teacher/parent/school/admin roles
- Student section with bottom nav + drawer navigation
- Interactive chessboard with 4 levels, instruction blocks, exercises
- Course module MVP: 12 YouTube video lessons, mock payment, progress tracking
- Task assignment system with in-app notifications and deep links
- Accent-insensitive search in Teacher Panel and School Dashboard
- Admin Dashboard with global stats, tabs (Dashboard/Colegios/Usuarios), impersonation
- Bell icon with notification badge in student header
- Responsive design (mobile-first, centered on desktop, wide for admin)

## Navigation Architecture
- **Student pages:** MobileLayout → DrawerMenu (floating button, top-left) + BottomNav
- **Teacher/Parent/School/Admin:** Layout → Header (with mobile hamburger) + Sidebar
- **Public pages:** CourseLanding at /curso (no auth required, no menu)

## Key Files
- `/app/frontend/src/components/layout/HamburgerMenu.jsx` - DrawerMenu (global left drawer)
- `/app/frontend/src/components/layout/MobileLayout.jsx` - Student layout + DrawerMenu
- `/app/frontend/src/components/layout/Layout.jsx` - Old layout (Header+Sidebar)
- `/app/frontend/src/components/layout/Header.jsx` - Header for non-student roles
- `/app/frontend/src/components/layout/Sidebar.jsx` - Sidebar for non-student roles
- `/app/frontend/src/components/pages/AdminDashboard.jsx` - Admin panel
- `/app/frontend/src/components/pages/WelcomeScreen.jsx` - Demo login
- `/app/frontend/src/components/chess/ChessBoard.jsx` - Interactive chessboard
- `/app/frontend/src/data/notificationStore.js` - Notification/assignment store
- `/app/frontend/src/context/AppContext.js` - Global state (5 roles)
- `/app/frontend/src/App.js` - Main router

## Backlog
- Push notifications (Fase 2 - Firebase/OneSignal)
- Refactor ChessBoard.jsx into smaller components
- Admin CRUD operations (currently read-only)
- Real authentication (email+password)
- Backend API integration

## Changelog
- [Feb 2026] Course module: Added 3-step instruction block with visual state indicators. "Marcar como completado" button disabled until video watched + comment submitted. Green success block on completion.
