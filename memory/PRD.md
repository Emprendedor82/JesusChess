# Jugadas Estrategicas - Chess Learning Platform PRD

## Original Problem Statement
Gamified chess learning app for a Chilean chess academy. Multi-role frontend prototype with 5 roles: Alumno (Student), Profesor (Teacher), Apoderado (Parent), Colegio (School), Administrador (Admin).

## Tech Stack
- **Frontend:** React (CRA), Tailwind CSS, Shadcn/UI
- **State:** React Context API + Zustand (notifications)
- **Routing:** react-router-dom
- **Persistence:** localStorage (frontend prototype, no backend)

## Architecture
```
/app/frontend/src/
  components/
    admin/AdminDashboard.jsx
    chess/ChessBoard.jsx
    layout/BottomNav.jsx, DrawerMenu.jsx, Header.jsx, Layout.jsx, MobileLayout.jsx
    pages/ChallengesPage.jsx, CourseModule.jsx, NotificationsPage.jsx, SchoolDashboard.jsx,
          StudentHomePage.jsx, TeacherPanel.jsx, TrainingPages.jsx, WelcomeScreen.jsx
    ui/ (Shadcn components)
  context/AppContext.js
  data/mockData.js
  store/useNotificationStore.js
```

## Implemented Features
- [x] 5 Role system (Alumno, Profesor, Apoderado, Colegio, Admin)
- [x] Welcome screen with role selector for demo
- [x] Student dashboard with course banner, progress tracking, quick actions
- [x] Interactive chessboard with exercises (4 levels, expanded)
- [x] Training hub (Learn, Practice, Tasks)
- [x] Challenges (Retos) page with 6 challenges (correctly mapped to exercises)
- [x] 12-module paid course with video, progress, comments
- [x] Notification system (teacher assigns tasks to students)
- [x] Teacher panel with student management and task assignment
- [x] Parent dashboard
- [x] School dashboard with metrics
- [x] Admin dashboard with global oversight
- [x] Responsive design (sidebar on desktop, drawer on mobile)
- [x] Accent-insensitive search
- [x] **Banner "Ataque y Remate"** - Premium promotional image banner on student home (2026-03-03)

## Bug Fixes
- [x] **Retos piece mismatch (2026-03-02):** Fixed challenge navigation to correct exercises. Added 2 new exercises to PRACTICE_EXERCISES level3.
- [x] Chessboard sizing and level change bugs
- [x] UI inconsistencies (XP bar contrast, extra blue line)

## Latest Changes (2026-03-03)
- **Banner "Ataque y Remate"**: Added promotional course banner on StudentHomePage
  - Image: 1080x600px, lazy loaded, object-fit:cover, object-position center-right
  - Responsive: 200px mobile / 220px tablet / 260px desktop
  - Dark overlay (rgba(0,0,0,0.35)) + floating "Ver programa" button
  - Navigates to /curso or /curso/contenido based on purchase status
  - Always visible in demo mode
  - Layout order: Header > Progress > Banner > Course card > Train/Retos > Goals

## Backlog / Future Tasks
- **P2:** Split mockData.js into smaller focused files
- **P3:** Add exercises for locked challenges (Doble ataque, Mate en 2)
- **Future:** Backend integration, real authentication, database persistence
