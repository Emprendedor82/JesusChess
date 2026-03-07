# Jugadas Estrategicas - Chess Learning Platform PRD

## Original Problem Statement
Gamified chess learning app for a Chilean chess academy. Multi-role frontend prototype with 5 roles: Alumno, Profesor, Apoderado, Colegio, Administrador.

## Tech Stack
- **Frontend:** React (CRA), Tailwind CSS, Shadcn/UI, Zustand
- **State:** React Context API + Zustand (notifications, students)
- **Routing:** react-router-dom
- **Persistence:** localStorage (frontend prototype, no backend)

## Routes
```
/ → WelcomeScreen | /perfil → ProfilePage (all roles)
Student: /inicio, /entrenamiento/*, /retos, /curso/*, /notificaciones
Teacher: /teacher, /teacher/students, /teacher/tasks
Parent: /parent, /parent/progress, /parent/feedback, /parent/tasks
School: /school, /school/students, /school/analytics
Admin: /admin
```

## Implemented Features
- [x] 5 Role system with sub-routes and navigation
- [x] Welcome screen with role selector
- [x] Student dashboard with Banner "Ataque y Remate"
- [x] Interactive chessboard (6 pieces, all movements validated)
- [x] **"Conoce las piezas" module complete** - 4 lessons + 6 exercises (2026-03-07)
- [x] Training hub, Challenges (Retos), Notifications
- [x] 12-module paid course with video, progress, comments
- [x] "Agregar Alumno" feature (Teacher, School, Admin)
- [x] "Mi Perfil" working for all roles
- [x] Sidebar/menu navigation fix (all roles)
- [x] Brand logo updated across all views
- [x] Responsive design (sidebar desktop, drawer mobile)

## Latest Changes

### 2026-03-07 - "Conoce las piezas" Module Complete
- Added 2 new lessons: "El Caballo" (Knight) and "El Peón" (Pawn)
- Added 4 new exercises to PRACTICE_EXERCISES.level1:
  - Exercise 3: Salto del Caballo (Knight L-shaped movement)
  - Exercise 4: Mueve el Peón (Pawn forward movement from starting row)
  - Exercise 5: Movimiento de la Reina (Queen all-direction movement)
  - Exercise 6: Mueve el Alfil (Bishop diagonal movement)
- Module now covers all 6 chess pieces: Rey, Reina, Torre, Alfil, Caballo, Peón
- Each with instruction block + interactive board

### 2026-03-07 - "Agregar Alumno" + "Mi Perfil"
- Add Student modal (role-aware) for Teacher, School, Admin
- Zustand store + localStorage for student persistence
- Profile page working for all roles

### 2026-03-06 - Navigation Fix + Logo Update
- Sub-routes for all non-student roles
- Brand logo across all views

## Backlog / Future Tasks
- **P2:** Split mockData.js into smaller focused files
- **P3:** Add exercises for locked challenges (Doble ataque, Mate en 2)
- **Future:** Backend integration, real authentication, database persistence
