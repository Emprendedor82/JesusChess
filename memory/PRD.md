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
    layout/BottomNav.jsx, HamburgerMenu.jsx, Header.jsx, Layout.jsx, MobileLayout.jsx, Sidebar.jsx
    pages/ChallengesPage.jsx, CourseModule.jsx, NotificationsPage.jsx, SchoolDashboard.jsx,
          StudentHomePage.jsx, TeacherPanel.jsx, TrainingPages.jsx, WelcomeScreen.jsx, RoleSelector.jsx
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
- [x] Banner "Ataque y Remate" - Premium promotional image banner on student home
- [x] **Brand logo updated** across all views (2026-03-06)

## Latest Changes

### 2026-03-06 - Logo Update
- Replaced all ♜ emoji logos with the official brand image across:
  - WelcomeScreen (full logo, w-48/w-56)
  - HamburgerMenu/Drawer (small icon, w-9)
  - Sidebar mobile header (w-7)
  - Header for non-student roles (w-10)
  - RoleSelector hero section (w-40) + footer
  - SchoolDashboard institutional summary card (w-10)
- Logo URL: customer-assets.emergentagent.com/.../p8gcxj6r_image.png

### 2026-03-03 - Banner "Ataque y Remate"
- Promotional course banner on StudentHomePage
- Responsive: 200px mobile / 220px tablet / 260px desktop
- Dark overlay + "Ver programa" floating button

### 2026-03-02 - Retos Bug Fix
- Fixed challenge navigation to correct exercises
- Added 2 new exercises to PRACTICE_EXERCISES level3

## Backlog / Future Tasks
- **P2:** Split mockData.js into smaller focused files
- **P3:** Add exercises for locked challenges (Doble ataque, Mate en 2)
- **Future:** Backend integration, real authentication, database persistence
