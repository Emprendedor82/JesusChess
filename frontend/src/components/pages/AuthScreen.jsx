import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  ChevronRight,
  Sparkles,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';

const AUTH_USERS_KEY = 'je_auth_users';
const AUTH_SESSION_KEY = 'je_auth_session';

const getUsers = () => {
  try { return JSON.parse(localStorage.getItem(AUTH_USERS_KEY)) || []; } catch { return []; }
};
const saveUsers = (users) => localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
const saveSession = (user) => localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
const getSession = () => {
  try { return JSON.parse(localStorage.getItem(AUTH_SESSION_KEY)); } catch { return null; }
};
const clearSession = () => localStorage.removeItem(AUTH_SESSION_KEY);

const AuthScreen = () => {
  const navigate = useNavigate();
  const { loginAs, userRole } = useApp();
  const [view, setView] = useState('login'); // login | register | forgot
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    nombre: '', apellido: '', email: '', password: '', confirmPassword: '',
  });

  // Auto-login from saved session
  useEffect(() => {
    if (userRole) return;
    const session = getSession();
    if (session?.loggedIn) {
      loginAs(session.role || 'student');
      navigate(session.role === 'student' ? '/inicio' : `/${session.role}`);
    }
  }, []);

  const update = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }));
  };

  const switchView = (v) => {
    setView(v);
    setErrors({});
    setForgotSent(false);
    setShowPassword(false);
    setShowConfirm(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.email.trim()) err.email = 'Ingresa tu correo electrónico';
    else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = 'Correo no válido';
    if (!form.password.trim()) err.password = 'Ingresa tu contraseña';
    if (Object.keys(err).length) { setErrors(err); return; }

    const users = getUsers();
    const user = users.find((u) => u.email === form.email.trim().toLowerCase());
    if (!user || user.password !== form.password) {
      setErrors({ general: 'Correo o contraseña incorrectos' });
      return;
    }

    saveSession({ ...user, loggedIn: true });
    loginAs(user.role || 'student');
    navigate(user.role === 'student' ? '/inicio' : `/${user.role}`);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.nombre.trim()) err.nombre = 'Ingresa tu nombre';
    if (!form.apellido.trim()) err.apellido = 'Ingresa tu apellido';
    if (!form.email.trim()) err.email = 'Ingresa tu correo electrónico';
    else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = 'Correo no válido';
    if (!form.password.trim()) err.password = 'Ingresa una contraseña';
    else if (form.password.length < 6) err.password = 'Mínimo 6 caracteres';
    if (form.password !== form.confirmPassword) err.confirmPassword = 'Las contraseñas no coinciden';
    if (Object.keys(err).length) { setErrors(err); return; }

    const users = getUsers();
    if (users.some((u) => u.email === form.email.trim().toLowerCase())) {
      setErrors({ email: 'Este correo ya está registrado' });
      return;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      role: 'student',
    };
    saveUsers([...users, newUser]);
    saveSession({ ...newUser, loggedIn: true });
    loginAs('student');
    navigate('/inicio');
  };

  const handleForgot = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.email.trim()) err.email = 'Ingresa tu correo electrónico';
    else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = 'Correo no válido';
    if (Object.keys(err).length) { setErrors(err); return; }
    setForgotSent(true);
  };

  const FieldError = ({ msg }) =>
    msg ? (
      <div className="flex items-center gap-1.5 mt-1">
        <AlertCircle className="w-3 h-3 text-destructive flex-shrink-0" />
        <span className="text-xs text-destructive">{msg}</span>
      </div>
    ) : null;

  return (
    <div className="min-h-screen bg-primary flex flex-col relative overflow-hidden">
      {/* Background chess pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl text-primary-foreground">♜</div>
        <div className="absolute top-32 right-8 text-5xl text-primary-foreground">♞</div>
        <div className="absolute bottom-40 left-8 text-4xl text-primary-foreground">♝</div>
        <div className="absolute bottom-20 right-16 text-6xl text-primary-foreground">♛</div>
        <div className="absolute top-1/2 left-1/4 text-3xl text-primary-foreground">♟</div>
        <div className="absolute top-1/3 right-1/3 text-4xl text-primary-foreground">♚</div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 relative z-10">
        {/* Logo */}
        <img
          src="https://customer-assets.emergentagent.com/job_7ca1bb71-1f8d-46a0-b6a5-6e8d935e0094/artifacts/p8gcxj6r_image.png"
          alt="Jugadas Estratégicas - Academia de Ajedrez"
          className="w-48 md:w-56 h-auto mb-4 rounded-2xl"
          draggable="false"
          data-testid="app-logo-welcome"
        />
        <div className="flex items-center gap-2 text-accent mb-6">
          <Sparkles className="w-3 h-3" />
          <span className="text-xs font-medium">Plataforma de desarrollo a traves del ajedrez</span>
          <Sparkles className="w-3 h-3" />
        </div>

        {/* Auth Card */}
        <div className="w-full max-w-sm bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-5 border border-primary-foreground/10">

          {/* ===== LOGIN ===== */}
          {view === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4" data-testid="login-form">
              <h2 className="text-primary-foreground text-lg font-bold text-center font-heading">
                Iniciar sesión
              </h2>

              {errors.general && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/20 text-destructive text-xs" data-testid="login-error">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {errors.general}
                </div>
              )}

              <div className="space-y-1.5">
                <Label className="text-primary-foreground/70 text-xs">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
                  <Input
                    type="email"
                    placeholder="tu@correo.cl"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className="pl-10 bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 h-11"
                    data-testid="login-email"
                  />
                </div>
                <FieldError msg={errors.email} />
              </div>

              <div className="space-y-1.5">
                <Label className="text-primary-foreground/70 text-xs">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
                    className="pl-10 pr-10 bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 h-11"
                    data-testid="login-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors"
                    data-testid="toggle-password"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <FieldError msg={errors.password} />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base font-bold rounded-xl shadow-lg"
                data-testid="login-submit"
              >
                Ingresar
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>

              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => switchView('forgot')}
                  className="block w-full text-center text-xs text-primary-foreground/50 hover:text-accent transition-colors"
                  data-testid="link-forgot"
                >
                  ¿Olvidaste tu contraseña?
                </button>
                <button
                  type="button"
                  onClick={() => switchView('register')}
                  className="block w-full text-center text-xs text-primary-foreground/60 hover:text-accent transition-colors"
                  data-testid="link-register"
                >
                  ¿No tienes cuenta? <span className="font-semibold text-accent">Regístrate</span>
                </button>
              </div>
            </form>
          )}

          {/* ===== REGISTER ===== */}
          {view === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5" data-testid="register-form">
              <h2 className="text-primary-foreground text-lg font-bold text-center font-heading">
                Crear cuenta
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-primary-foreground/70 text-xs">Nombre</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
                    <Input
                      placeholder="Sofía"
                      value={form.nombre}
                      onChange={(e) => update('nombre', e.target.value)}
                      className="pl-10 bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 h-10 text-sm"
                      data-testid="register-nombre"
                    />
                  </div>
                  <FieldError msg={errors.nombre} />
                </div>
                <div className="space-y-1">
                  <Label className="text-primary-foreground/70 text-xs">Apellido</Label>
                  <Input
                    placeholder="Martínez"
                    value={form.apellido}
                    onChange={(e) => update('apellido', e.target.value)}
                    className="bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 h-10 text-sm"
                    data-testid="register-apellido"
                  />
                  <FieldError msg={errors.apellido} />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-primary-foreground/70 text-xs">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
                  <Input
                    type="email"
                    placeholder="tu@correo.cl"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className="pl-10 bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 h-10 text-sm"
                    data-testid="register-email"
                  />
                </div>
                <FieldError msg={errors.email} />
              </div>

              <div className="space-y-1">
                <Label className="text-primary-foreground/70 text-xs">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mínimo 6 caracteres"
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
                    className="pl-10 pr-10 bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 h-10 text-sm"
                    data-testid="register-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <FieldError msg={errors.password} />
              </div>

              <div className="space-y-1">
                <Label className="text-primary-foreground/70 text-xs">Confirmar contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
                  <Input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Repite tu contraseña"
                    value={form.confirmPassword}
                    onChange={(e) => update('confirmPassword', e.target.value)}
                    className="pl-10 pr-10 bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 h-10 text-sm"
                    data-testid="register-confirm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <FieldError msg={errors.confirmPassword} />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base font-bold rounded-xl shadow-lg"
                data-testid="register-submit"
              >
                Crear cuenta gratis
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>

              <button
                type="button"
                onClick={() => switchView('login')}
                className="block w-full text-center text-xs text-primary-foreground/60 hover:text-accent transition-colors pt-1"
                data-testid="link-login"
              >
                ¿Ya tienes cuenta? <span className="font-semibold text-accent">Inicia sesión</span>
              </button>
            </form>
          )}

          {/* ===== FORGOT PASSWORD ===== */}
          {view === 'forgot' && (
            <form onSubmit={handleForgot} className="space-y-4" data-testid="forgot-form">
              <button
                type="button"
                onClick={() => switchView('login')}
                className="flex items-center gap-1 text-xs text-primary-foreground/50 hover:text-accent transition-colors"
                data-testid="link-back-login"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Volver al inicio de sesión
              </button>

              <h2 className="text-primary-foreground text-lg font-bold text-center font-heading">
                Recuperar contraseña
              </h2>

              {forgotSent ? (
                <div className="flex flex-col items-center gap-3 py-4" data-testid="forgot-success">
                  <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  </div>
                  <p className="text-sm text-primary-foreground/80 text-center leading-relaxed">
                    Si ese correo está registrado, recibirás las instrucciones en breve.
                  </p>
                  <button
                    type="button"
                    onClick={() => switchView('login')}
                    className="text-xs text-accent hover:text-accent/80 font-semibold transition-colors mt-2"
                  >
                    Volver al inicio de sesión
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-xs text-primary-foreground/50 text-center">
                    Ingresa tu correo y te enviaremos instrucciones para restablecer tu contraseña.
                  </p>

                  <div className="space-y-1.5">
                    <Label className="text-primary-foreground/70 text-xs">Correo electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
                      <Input
                        type="email"
                        placeholder="tu@correo.cl"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        className="pl-10 bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 h-11"
                        data-testid="forgot-email"
                      />
                    </div>
                    <FieldError msg={errors.email} />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base font-bold rounded-xl shadow-lg"
                    data-testid="forgot-submit"
                  >
                    Enviar instrucciones
                  </Button>
                </>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="py-3 text-center relative z-10">
        <p className="text-[10px] text-primary-foreground/40">
          © 2026 Jugadas Estrategicas
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
