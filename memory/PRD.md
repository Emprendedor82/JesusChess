# Jugadas Estrategicas - Chess Learning Platform PRD

## Original Problem Statement
Gamified chess learning app for a Chilean chess academy. Multi-role frontend prototype with 5 roles: Alumno (Student), Profesor (Teacher), Apoderado (Parent), Colegio (School), Administrador (Admin).

## Tech Stack
- **Frontend:** React (CRA), Tailwind CSS, Shadcn/UI
- **State:** React Context API + Zustand (notifications)
- **Routing:** react-router-dom
- **Persistence:** localStorage (frontend prototype, no backend)

## Routes Structure
```
/ → WelcomeScreen (role selector)
/roles → RoleSelector (alternative)
/curso → CourseLanding (public)
/perfil → ProfilePage (all roles, standalone - no layout wrapper)

Student (MobileLayout):
  /inicio, /entrenamiento, /entrenamiento/aprende, /entrenamiento/practica,
  /entrenamiento/tareas, /retos, /curso/contenido, /curso/modulo/:moduleId,
  /notificaciones

Teacher (Layout): /teacher, /teacher/students, /teacher/tasks
Parent (Layout): /parent, /parent/progress, /parent/feedback, /parent/tasks
School (Layout): /school, /school/students, /school/analytics
Admin (Layout): /admin
```

## Implemented Features
- [x] 5 Role system with dedicated dashboards and sub-routes
- [x] Welcome screen with role selector for demo
- [x] Student dashboard with course banner, progress tracking
- [x] Interactive chessboard with exercises (4 levels)
- [x] Training hub, Challenges (Retos), Notifications
- [x] 12-module paid course with video, progress, comments
- [x] Teacher panel with students, tasks sections
- [x] Parent dashboard with progress, feedback, tasks sections
- [x] School dashboard with students, analytics sections
- [x] Admin dashboard
- [x] Responsive design (sidebar desktop, drawer mobile)
- [x] Banner "Ataque y Remate" promotional
- [x] Brand logo updated across all views
- [x] Sidebar/menu navigation fix (all roles)
- [x] **"Mi Perfil" button fix** - works for all 5 roles (2026-03-07)

## Latest Changes

### 2026-03-07 - "Mi Perfil" Fix
- Added onClick navigate('/perfil') to Header.jsx DropdownMenuItem
- Moved /perfil route outside both layout wrappers as standalone route (all roles)
- Made ProfilePage role-aware: students see XP/streak/lessons, others see role info card

### 2026-03-06 - Navigation Fix + Logo Update
- Sub-routes for School, Teacher, Parent dashboards
- HamburgerMenu ROLE_MENUS matches Sidebar for all roles
- Brand logo replaced across 6 files

### 2026-03-02-03 - Retos Fix + Banner
- Challenge navigation mapped to correct exercises
- Promotional course banner on student home

## Backlog / Future Tasks
- **P2:** Split mockData.js into smaller focused files
- **P3:** Add exercises for locked challenges (Doble ataque, Mate en 2)
- **Future:** Backend integration, real authentication, database persistence
