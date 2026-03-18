# Jugadas Estrategicas - Chess Learning Platform PRD

## Original Problem Statement
Gamified chess learning app for a Chilean chess academy. Multi-role frontend prototype with 5 roles: Alumno, Profesor, Apoderado, Colegio, Administrador.

## Tech Stack
- **Frontend:** React (CRA), Tailwind CSS, Shadcn/UI, Zustand
- **State:** React Context API + Zustand (notifications, students)
- **Routing:** react-router-dom
- **Persistence:** localStorage (auth, course progress, students, notifications)

## Routes
```
/ → AuthScreen (Login/Register/Forgot Password)
/perfil → ProfilePage (all roles)
Student: /inicio, /entrenamiento/*, /retos, /curso/*, /notificaciones
Teacher: /teacher, /teacher/students, /teacher/tasks
Parent: /parent, /parent/progress, /parent/feedback, /parent/tasks
School: /school, /school/students, /school/analytics
Admin: /admin
```

## Auth System
- **Login:** email + password (with eye toggle), validates against localStorage users
- **Register:** nombre, apellido, email, password, confirm → creates student role
- **Forgot Password:** email → shows confirmation message (simulated)
- **Persistence:** je_auth_session in localStorage, auto-login on page reload
- **Logout:** clears session, redirects to /
- **Roles:** Register always creates "alumno". Other roles assigned by admin only.

## Implemented Features
- [x] **Auth system** - Login, Register, Forgot Password (2026-03-09)
- [x] 5 Role system with sub-routes
- [x] Student dashboard with Banner "Ataque y Remate"
- [x] "Conoce las piezas" complete (6 exercises: Rey, Torre, Caballo, Peón, Dama, Alfil)
- [x] Training hub, Challenges (Retos), Notifications
- [x] 12-module paid course
- [x] "Agregar Alumno" feature (Teacher, School, Admin)
- [x] "Mi Perfil" all roles
- [x] Sidebar/menu navigation (all roles)
- [x] Brand logo, Responsive design
- [x] "Reina" → "Dama" renaming

## Backlog
- **P1:** Split mockData.js into smaller files
- **P2:** Reactivate hidden modules ("Entrenar" and "Retos") - Phase 2
- **P2:** Locked challenge exercises ("Doble ataque", "Mate en 2")
- **P3:** Backend integration, real auth API

## Changelog
- **2026-03-18:** Correcciones completas en ProfilePage.jsx: nombre real desde localStorage, logros e historial vacíos, configuración (notificaciones toggle, cambiar contraseña, cerrar sesión), ayuda con mailto.
- **2026-03-18:** Fixed Vercel build failure — added missing useEffect dependencies in AuthScreen.jsx
