import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { 
  ChevronRight, 
  ChevronDown,
  LogOut, 
  Star, 
  Trophy,
  BookOpen,
  Target,
  Settings,
  Bell,
  HelpCircle,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { courseStorage } from '../../data/courseData';

const AUTH_SESSION_KEY = 'je_auth_session';
const AUTH_USERS_KEY = 'je_auth_users';
const NOTIF_PREF_KEY = 'je_notifications_enabled';

const getSession = () => {
  try { return JSON.parse(localStorage.getItem(AUTH_SESSION_KEY)); } catch { return null; }
};

const getUserDisplayName = () => {
  const session = getSession();
  if (session?.nombre && session?.apellido) return `${session.nombre} ${session.apellido}`;
  if (session?.nombre) return session.nombre;
  return null;
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser, userRole, logout } = useApp();

  const [openSection, setOpenSection] = useState(null);
  const [notificationsOn, setNotificationsOn] = useState(() => {
    const saved = localStorage.getItem(NOTIF_PREF_KEY);
    return saved === null ? true : saved === 'true';
  });
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [pwShowCurrent, setPwShowCurrent] = useState(false);
  const [pwShowNew, setPwShowNew] = useState(false);
  const [pwShowConfirm, setPwShowConfirm] = useState(false);
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState(false);

  if (!currentUser) return null;

  const displayName = getUserDisplayName() || 'Mi perfil';
  const initials = displayName !== 'Mi perfil' ? displayName.charAt(0) : '?';

  const isStudent = userRole === 'student';
  const coursePurchased = isStudent ? courseStorage.isPurchased() : false;
  const courseProgress = isStudent ? courseStorage.getCompletedCount() : 0;

  const getRoleLabel = () => {
    switch (userRole) {
      case 'student': return 'Alumno';
      case 'teacher': return 'Profesor';
      case 'parent': return 'Apoderado';
      case 'school': return 'Colegio';
      case 'admin': return 'Administrador';
      default: return '';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSection = (section) => {
    setOpenSection(prev => prev === section ? null : section);
    setPwError('');
    setPwSuccess(false);
  };

  const handleNotifToggle = () => {
    const next = !notificationsOn;
    setNotificationsOn(next);
    localStorage.setItem(NOTIF_PREF_KEY, String(next));
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPwError('');
    setPwSuccess(false);

    if (!pwForm.current.trim()) { setPwError('Ingresa tu contraseña actual'); return; }
    if (!pwForm.newPw.trim()) { setPwError('Ingresa la nueva contraseña'); return; }
    if (pwForm.newPw.length < 6) { setPwError('Mínimo 6 caracteres'); return; }
    if (pwForm.newPw !== pwForm.confirm) { setPwError('Las contraseñas no coinciden'); return; }

    const session = getSession();
    if (!session?.email) { setPwError('No se encontró la sesión'); return; }

    try {
      const users = JSON.parse(localStorage.getItem(AUTH_USERS_KEY)) || [];
      const idx = users.findIndex(u => u.email === session.email);
      if (idx === -1) { setPwError('Usuario no encontrado'); return; }
      if (users[idx].password !== pwForm.current) { setPwError('Contraseña actual incorrecta'); return; }

      users[idx].password = pwForm.newPw;
      localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
      setPwForm({ current: '', newPw: '', confirm: '' });
      setPwSuccess(true);
    } catch {
      setPwError('Error al cambiar la contraseña');
    }
  };

  const menuItems = [
    { id: 'logros', icon: Trophy, label: 'Mis logros' },
    { id: 'historial', icon: BookOpen, label: 'Historial de lecciones' },
    { id: 'config', icon: Settings, label: 'Configuración' },
    { id: 'ayuda', icon: HelpCircle, label: 'Ayuda' },
  ];

  return (
    <div className="min-h-screen bg-background safe-area-top">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 pt-4 pb-8">
        <div className="app-container mx-auto">
          <h1 className="text-base md:text-lg font-bold text-center mb-5" data-testid="profile-title">Mi Perfil</h1>
          
          <div className="flex flex-col items-center">
            <Avatar className="w-16 h-16 md:w-20 md:h-20 border-4 border-primary-foreground/20 mb-3">
              <AvatarImage src={currentUser.avatar} alt={displayName} />
              <AvatarFallback className="text-xl md:text-2xl bg-accent text-accent-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <h2 className="font-heading text-lg md:text-xl font-bold" data-testid="profile-user-name">{displayName}</h2>
            <Badge className="mt-2 bg-accent text-accent-foreground text-xs" data-testid="profile-role-badge">
              {isStudent ? `Nivel ${currentUser.level}` : getRoleLabel()}
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats - Student only */}
      {isStudent && (
      <div className="app-container mx-auto px-4 -mt-4">
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-3 md:gap-4 text-center">
              <div>
                <div className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 mx-auto rounded-full bg-xp/10 mb-2">
                  <Star className="w-4 h-4 md:w-5 md:h-5 text-xp" />
                </div>
                <p className="font-heading text-base md:text-lg font-bold text-foreground">{currentUser.xp}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">XP Total</p>
              </div>
              <div>
                <div className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 mx-auto rounded-full bg-streak/10 mb-2">
                  <Target className="w-4 h-4 md:w-5 md:h-5 text-streak" />
                </div>
                <p className="font-heading text-base md:text-lg font-bold text-foreground">{currentUser.streak}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">Días racha</p>
              </div>
              <div>
                <div className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 mx-auto rounded-full bg-success/10 mb-2">
                  <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-success" />
                </div>
                <p className="font-heading text-base md:text-lg font-bold text-foreground">{currentUser.completedLessons}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">Lecciones</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      )}

      {/* Role Info - Non-student */}
      {!isStudent && (
      <div className="app-container mx-auto px-4 -mt-4">
        <Card className="shadow-lg">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
              <Settings className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-medium text-foreground">Rol</p>
                <p className="text-xs text-muted-foreground">{getRoleLabel()}</p>
              </div>
            </div>
            {currentUser.school && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                <BookOpen className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm font-medium text-foreground">Institución</p>
                  <p className="text-xs text-muted-foreground">{currentUser.school}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      )}

      {/* Course Progress */}
      {coursePurchased && (
        <div className="app-container mx-auto px-4 mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-sm text-foreground">Progreso del Curso</span>
                <span className="text-xs text-muted-foreground">{courseProgress}/12</span>
              </div>
              <Progress value={(courseProgress / 12) * 100} className="h-2" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Menu Items */}
      <div className="app-container mx-auto px-4 mt-4 space-y-2">
        {menuItems.map((item) => (
          <div key={item.id}>
            <Card 
              className="cursor-pointer active:scale-[0.98] transition-transform"
              onClick={() => toggleSection(item.id)}
              data-testid={`profile-menu-${item.id}`}
            >
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl bg-secondary">
                    <item.icon className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
                  </div>
                  <span className="flex-1 font-medium text-sm text-foreground">{item.label}</span>
                  {openSection === item.id
                    ? <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                    : <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                  }
                </div>
              </CardContent>
            </Card>

            {/* Expanded section content */}
            {openSection === item.id && (
              <Card className="mt-1 border-t-0 rounded-t-none">
                <CardContent className="p-4">

                  {/* Mis logros — empty */}
                  {item.id === 'logros' && (
                    <div className="text-center py-4" data-testid="logros-empty">
                      <Trophy className="w-10 h-10 mx-auto text-muted-foreground/40 mb-3" />
                      <p className="text-sm text-muted-foreground">Aún no tienes logros.</p>
                      <p className="text-xs text-muted-foreground mt-1">Completa lecciones y retos para ganar medallas.</p>
                    </div>
                  )}

                  {/* Historial — empty */}
                  {item.id === 'historial' && (
                    <div className="text-center py-4" data-testid="historial-empty">
                      <BookOpen className="w-10 h-10 mx-auto text-muted-foreground/40 mb-3" />
                      <p className="text-sm text-muted-foreground">Aún no has completado ninguna lección.</p>
                    </div>
                  )}

                  {/* Configuración */}
                  {item.id === 'config' && (
                    <div className="space-y-5" data-testid="config-section">
                      {/* Notifications toggle */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Bell className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">Notificaciones</span>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={notificationsOn}
                          data-testid="notif-toggle"
                          onClick={handleNotifToggle}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notificationsOn ? 'bg-primary' : 'bg-muted'}`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationsOn ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>

                      <div className="border-t border-border" />

                      {/* Change password */}
                      <form onSubmit={handleChangePassword} className="space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Lock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">Cambiar contraseña</span>
                        </div>

                        <div className="relative">
                          <Label className="text-xs text-muted-foreground">Contraseña actual</Label>
                          <div className="relative mt-1">
                            <Input
                              type={pwShowCurrent ? 'text' : 'password'}
                              value={pwForm.current}
                              onChange={e => setPwForm(p => ({ ...p, current: e.target.value }))}
                              data-testid="pw-current"
                              className="pr-10 h-9 text-sm"
                            />
                            <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setPwShowCurrent(v => !v)}>
                              {pwShowCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="relative">
                          <Label className="text-xs text-muted-foreground">Nueva contraseña</Label>
                          <div className="relative mt-1">
                            <Input
                              type={pwShowNew ? 'text' : 'password'}
                              value={pwForm.newPw}
                              onChange={e => setPwForm(p => ({ ...p, newPw: e.target.value }))}
                              data-testid="pw-new"
                              className="pr-10 h-9 text-sm"
                            />
                            <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setPwShowNew(v => !v)}>
                              {pwShowNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="relative">
                          <Label className="text-xs text-muted-foreground">Confirmar contraseña</Label>
                          <div className="relative mt-1">
                            <Input
                              type={pwShowConfirm ? 'text' : 'password'}
                              value={pwForm.confirm}
                              onChange={e => setPwForm(p => ({ ...p, confirm: e.target.value }))}
                              data-testid="pw-confirm"
                              className="pr-10 h-9 text-sm"
                            />
                            <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setPwShowConfirm(v => !v)}>
                              {pwShowConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {pwError && (
                          <div className="flex items-center gap-1.5">
                            <AlertCircle className="w-3 h-3 text-destructive flex-shrink-0" />
                            <span className="text-xs text-destructive" data-testid="pw-error">{pwError}</span>
                          </div>
                        )}
                        {pwSuccess && (
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-green-600 flex-shrink-0" />
                            <span className="text-xs text-green-600" data-testid="pw-success">Contraseña actualizada correctamente</span>
                          </div>
                        )}

                        <Button type="submit" size="sm" className="w-full h-9 text-sm" data-testid="pw-save-btn">
                          Guardar
                        </Button>
                      </form>

                      <div className="border-t border-border" />

                      {/* Logout inside config */}
                      <Button 
                        variant="outline" 
                        className="w-full h-9 text-sm text-destructive border-destructive/30 hover:bg-destructive/10"
                        onClick={handleLogout}
                        data-testid="config-logout-btn"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Cerrar sesión
                      </Button>
                    </div>
                  )}

                  {/* Ayuda */}
                  {item.id === 'ayuda' && (
                    <div className="space-y-3" data-testid="ayuda-section">
                      <h3 className="text-sm font-semibold text-foreground">¿Necesitas ayuda?</h3>
                      <p className="text-sm text-muted-foreground">
                        Escríbenos a <span className="font-medium text-foreground">adm@jugadasestrategicas.com</span> y te responderemos en menos de 24 horas hábiles.
                      </p>
                      <Button
                        variant="outline"
                        className="w-full h-9 text-sm"
                        data-testid="ayuda-email-btn"
                        onClick={() => window.open('mailto:adm@jugadasestrategicas.com?subject=Consulta%20desde%20la%20app', '_blank')}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Enviar correo
                      </Button>
                    </div>
                  )}

                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>

      {/* Logout (bottom) */}
      <div className="app-container mx-auto px-4 mt-6 mb-8">
        <Button 
          variant="outline" 
          className="w-full h-11 md:h-12 text-sm text-destructive border-destructive/30 hover:bg-destructive/10"
          onClick={handleLogout}
          data-testid="profile-logout-btn"
        >
          <LogOut className="w-4 h-4 md:w-5 md:h-5 mr-2" />
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
