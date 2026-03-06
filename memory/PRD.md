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
    admin/AdminDashboard.jsx (actually at pages/)
    chess/ChessBoard.jsx
    layout/BottomNav.jsx, HamburgerMenu.jsx, Header.jsx, Layout.jsx, MobileLayout.jsx, Sidebar.jsx
    pages/ChallengesPage.jsx, CourseModule.jsx, NotificationsPage.jsx, SchoolDashboard.jsx,
          StudentHomePage.jsx, TeacherPanel.jsx, TrainingPages.jsx, WelcomeScreen.jsx,
          RoleSelector.jsx, AdminDashboard.jsx, ParentDashboard.jsx
    ui/ (Shadcn components)
  context/AppContext.js
  data/mockData.js
  store/useNotificationStore.js
```

## Routes Structure
```
/ → WelcomeScreen (role selector)
/roles → RoleSelector (alternative entry)
/curso → CourseLanding (public)

Student (MobileLayout):
  /inicio, /entrenamiento, /entrenamiento/aprende, /entrenamiento/practica,
  /entrenamiento/tareas, /retos, /curso/contenido, /curso/modulo/:moduleId,
  /perfil, /notificaciones

Teacher (Layout):
  /teacher → Panel overview
  /teacher/students → Student grid
  /teacher/tasks → Assigned tasks

Parent (Layout):
  /parent → Full summary
  /parent/progress → Weekly progress stats
  /parent/feedback → Teacher feedback
  /parent/tasks → Assigned tasks

School (Layout):
  /school → Full dashboard
  /school/students → Student list
  /school/analytics → Stats & charts

Admin (Layout):
  /admin → Admin dashboard
```

## Implemented Features
- [x] 5 Role system with dedicated dashboards
- [x] Welcome screen with role selector for demo
- [x] Student dashboard with course banner, progress tracking, quick actions
- [x] Interactive chessboard with exercises (4 levels, expanded)
- [x] Training hub (Learn, Practice, Tasks)
- [x] Challenges (Retos) page with 6 challenges (correctly mapped)
- [x] 12-module paid course with video, progress, comments
- [x] Notification system (teacher assigns tasks to students)
- [x] Teacher panel with student management and task assignment
- [x] Parent dashboard with progress, feedback, tasks sections
- [x] School dashboard with students, analytics sections
- [x] Admin dashboard with global oversight
- [x] Responsive design (sidebar on desktop, drawer on mobile)
- [x] Accent-insensitive search
- [x] Banner "Ataque y Remate" promotional
- [x] Brand logo updated across all views
- [x] **Sidebar/menu navigation fix** - All roles navigate correctly (2026-03-06)

## Latest Changes

### 2026-03-06 - Navigation Fix (All Roles)
- Added sub-routes in App.js for School (/students, /analytics), Teacher (/students, /tasks), Parent (/progress, /feedback, /tasks)
- Modified SchoolDashboard, TeacherPanel, ParentDashboard to accept `section` prop for content filtering
- Updated HamburgerMenu ROLE_MENUS to match Sidebar nav items for all non-student roles
- Created Teacher Tasks view with task templates list

### 2026-03-06 - Logo Update
- Replaced ♜ emoji with brand image across 6 files

### 2026-03-03 - Banner "Ataque y Remate"
- Promotional course banner on StudentHomePage

### 2026-03-02 - Retos Bug Fix
- Fixed challenge navigation to correct exercises

## Backlog / Future Tasks
- **P2:** Split mockData.js into smaller focused files
- **P3:** Add exercises for locked challenges (Doble ataque, Mate en 2)
- **Future:** Backend integration, real authentication, database persistence
