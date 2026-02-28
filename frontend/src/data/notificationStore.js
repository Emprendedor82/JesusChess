// Notification & Assignment Store (localStorage-based)

const ASSIGNMENTS_KEY = 'chess_assignments';
const NOTIFICATIONS_KEY = 'chess_notifications';

// --- Assignments ---

const getAssignments = () => {
  try {
    return JSON.parse(localStorage.getItem(ASSIGNMENTS_KEY)) || [];
  } catch { return []; }
};

const createAssignment = ({ studentId, studentName, teacherId, category, level, exercise, message, dueDate }) => {
  const assignments = getAssignments();
  const id = `asgn-${Date.now()}`;
  const assignment = {
    id,
    studentId,
    studentName,
    teacherId,
    category,
    level,
    exercise,
    message: message || '',
    dueDate: dueDate || null,
    status: 'pending',
    pushStatus: 'not_sent',
    createdAt: new Date().toISOString(),
  };
  assignments.unshift(assignment);
  localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(assignments));

  // Auto-create notification for the student
  createNotification({
    studentId,
    type: 'assignment',
    title: 'Nueva tarea asignada',
    body: `Tu profesor te asigno: ${category} – Nivel ${level} – Ejercicio ${exercise}`,
    assignmentId: id,
    deepLink: `/entrenamiento/practica?level=${level}&exercise=${exercise}`,
  });

  return assignment;
};

const getAssignmentsForStudent = (studentId) => {
  return getAssignments().filter(a => a.studentId === studentId);
};

// --- Notifications ---

const getNotifications = () => {
  try {
    return JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY)) || [];
  } catch { return []; }
};

const createNotification = ({ studentId, type, title, body, assignmentId, deepLink }) => {
  const notifications = getNotifications();
  notifications.unshift({
    id: `notif-${Date.now()}`,
    studentId,
    type,
    title,
    body,
    assignmentId: assignmentId || null,
    deepLink: deepLink || null,
    read: false,
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
};

const getNotificationsForStudent = (studentId = 'student-1') => {
  return getNotifications().filter(n => n.studentId === studentId);
};

const getUnreadCount = (studentId = 'student-1') => {
  return getNotificationsForStudent(studentId).filter(n => !n.read).length;
};

const markAsRead = (notificationId) => {
  const notifications = getNotifications();
  const idx = notifications.findIndex(n => n.id === notificationId);
  if (idx !== -1) {
    notifications[idx].read = true;
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  }
};

const markAllAsRead = (studentId = 'student-1') => {
  const notifications = getNotifications();
  notifications.forEach(n => {
    if (n.studentId === studentId) n.read = true;
  });
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
};

export const notificationStore = {
  createAssignment,
  getAssignments,
  getAssignmentsForStudent,
  getNotifications,
  getNotificationsForStudent,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
};
