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
- [x] Interactive chessboard with exercises (4 levels)
- [x] Training hub (Learn, Practice, Tasks)
- [x] Challenges (Retos) page with 6 challenges
- [x] 12-module paid course with video, progress, comments
- [x] Notification system (teacher assigns tasks to students)
- [x] Teacher panel with student management and task assignment
- [x] Parent dashboard
- [x] School dashboard with metrics
- [x] Admin dashboard with global oversight
- [x] Responsive design (sidebar on desktop, drawer on mobile)
- [x] Accent-insensitive search
- [x] Animated course banner

## Bug Fixes (Latest: 2026-03-02)
- [x] **Retos piece mismatch:** Fixed challenge navigation to point to correct exercises. Added 2 new exercises (Bishop captures Rook, Knight gives check) to PRACTICE_EXERCISES level3. Each challenge now navigates with ?level=X&exercise=Y params.
- [x] Chessboard sizing and level change bugs
- [x] UI inconsistencies (XP bar contrast, extra blue line)

## Backlog / Future Tasks
- **P2:** Split mockData.js into smaller focused files (challengeData.js, userData.js, courseData.js)
- **P3:** Add exercises for locked challenges (Doble ataque, Mate en 2)
- **Future:** Backend integration, real authentication, database persistence
