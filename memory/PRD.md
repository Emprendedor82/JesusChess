# Jugadas Estrategicas - Chess Learning Platform PRD

## Original Problem Statement
Gamified chess learning app for a Chilean chess academy. Multi-role frontend prototype with 5 roles: Alumno (Student), Profesor (Teacher), Apoderado (Parent), Colegio (School), Administrador (Admin).

## Tech Stack
- **Frontend:** React (CRA), Tailwind CSS, Shadcn/UI
- **State:** React Context API + Zustand (notifications, students)
- **Routing:** react-router-dom
- **Persistence:** localStorage (frontend prototype, no backend)

## Routes Structure
```
/ → WelcomeScreen | /roles → RoleSelector | /curso → CourseLanding
/perfil → ProfilePage (all roles, standalone)

Student (MobileLayout): /inicio, /entrenamiento/*, /retos, /curso/*, /notificaciones
Teacher (Layout): /teacher, /teacher/students, /teacher/tasks
Parent (Layout): /parent, /parent/progress, /parent/feedback, /parent/tasks
School (Layout): /school, /school/students, /school/analytics
Admin (Layout): /admin
```

## Implemented Features
- [x] 5 Role system with dedicated dashboards and sub-routes
- [x] Welcome screen with role selector
- [x] Student dashboard with course banner, progress tracking
- [x] Interactive chessboard with exercises (4 levels)
- [x] Training hub, Challenges (Retos), Notifications
- [x] 12-module paid course with video, progress, comments
- [x] Teacher panel with students, tasks sections
- [x] Parent dashboard with progress, feedback, tasks sections
- [x] School dashboard with students, analytics sections
- [x] Admin dashboard with tabs (Dashboard, Schools, Users)
- [x] Responsive design (sidebar desktop, drawer mobile)
- [x] Banner "Ataque y Remate" promotional
- [x] Brand logo updated across all views
- [x] Sidebar/menu navigation fix (all roles)
- [x] "Mi Perfil" button fix (all roles)
- [x] **"Agregar Alumno" feature** - Teacher, School, Admin can create students (2026-03-07)

## Latest Changes

### 2026-03-07 - "Agregar Alumno" Feature
- Created Zustand store (`useStudentStore.js`) with localStorage persistence for new students
- Created reusable `AddStudentModal.jsx` with role-aware form:
  - Teacher: Name, Apellido, Email, Nivel, Edad (auto-assigns school + teacher)
  - School: + Profesor field (auto-assigns school)
  - Admin: + Colegio selector + Profesor field (full control)
- Button "Agregar alumno" visible in:
  - TeacherPanel (header area, overview + students views)
  - SchoolDashboard (students section)
  - AdminDashboard (users tab)
- Validation: required fields (Nombre, Apellido, Email), email format
- Toast confirmation on success
- New student appears immediately in list with progress: 0%, lastActive: "Recién creado"
- Bug fix: Resolved infinite re-render loop in Zustand store (useMemo pattern)

### 2026-03-07 - "Mi Perfil" Fix
- Standalone /perfil route for all roles, role-aware content

### 2026-03-06 - Navigation Fix + Logo Update
- Sub-routes for all non-student roles
- Brand logo replaced across all views

## Backlog / Future Tasks
- **P2:** Split mockData.js into smaller focused files
- **P3:** Add exercises for locked challenges (Doble ataque, Mate en 2)
- **Future:** Backend integration, real authentication, database persistence
