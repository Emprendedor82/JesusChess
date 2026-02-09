# Jugadas Estratégicas - Chess Academy Gamified App

## Project Overview
A Duolingo-style gamified chess learning application for **Jugadas Estratégicas** chess academy, designed for children and teenagers. The app is used both in schools and for private classes.

**Note:** This is a **FRONTEND PROTOTYPE** with **MOCK DATA**. No real backend, authentication, or database integration.

## Latest Update (December 2025)
- **Restored 4-role system:** Alumno, Profesor, Apoderado, Colegio
- Each role has its own dedicated dashboard with mock data

## Brand Identity
- **Company:** Jugadas Estratégicas - Academia de Ajedrez
- **Website Reference:** https://jugadasestrategicas.com/
- **Tagline:** "Entrena tu mente, domina tu vida"
- **Color Palette:** Navy blue (#1a365d) + Cyan accent (#00bfff)
- **Target Audience:** Children and teenagers in Chile

## User Roles (Simplified - No Real Auth)

### 1. Alumno (Student)
- Gamified learning experience with XP, levels, streaks
- Daily challenges and puzzles
- Lesson progress tracking
- Achievement/medal collection
- Task management (assigned by teacher)

### 2. Profesor (Teacher)
- Student list with progress overview
- Student evaluation system (5 criteria, 1-5 scale):
  - Táctica (Tactics)
  - Estrategia (Strategy)
  - Atención (Attention)
  - Gestión del tiempo (Time Management)
  - Actitud (Attitude/Self-regulation)
- Feedback/comment system
- Task assignment from predefined list

### 3. Apoderado (Parent)
- Read-only access
- Child's progress overview
- Weekly stats (lessons, puzzles, time, XP)
- Latest teacher feedback
- Assigned tasks visibility

### 4. Colegio (School/Institution)
- Institutional dashboard
- Aggregate statistics
- Weekly usage analytics
- Top students leaderboard
- Progress distribution by level

## Onboarding Flow
1. **Step 1:** Choose student type
   - "Soy alumno de un colegio" (School student)
   - "Soy alumno particular" (Private student)
   
2. **Step 2 (if school):** Select school from list
   - Colegio Verbo Divino
   - Colegio San Ignacio El Bosque
   - The Grange School
   - Santiago College
   - Colegio Los Andes

## Mock Data Features
- Student profile with XP, level, streak
- Daily challenges (Mate en 1, Táctica de clavada, Mate en 2)
- Weekly challenges with progress
- Lesson modules (Fundamentos, Piezas menores, Estrategia)
- Task templates for teachers
- Achievement/medal system
- School statistics and charts

## Technical Stack
- **Frontend:** React.js
- **Styling:** Tailwind CSS + Shadcn/UI components
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **State Management:** React Context API

## Design Highlights
- Clean, modern, premium educational feel
- Gamification elements (XP, streaks, medals, progress bars)
- Mobile-responsive design
- Spanish language interface
- Brand colors matching jugadasestrategicas.com

## Screens Implemented
1. Role Selector (Home)
2. Onboarding Flow (2 steps)
3. Student Dashboard
4. Training/Lessons Page
5. Challenges Page
6. Tasks Page
7. Achievements Page
8. Teacher Panel with Evaluation Dialog
9. Parent Dashboard
10. School/Institution Dashboard

## NOT Implemented (Out of Scope)
- Real authentication/login
- Backend API integration
- Real chess engine/gameplay
- Chat functionality
- Notifications
- Rankings/tournaments
- Payment/subscription handling
