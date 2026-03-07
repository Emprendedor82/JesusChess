import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Users,
  Building2,
  TrendingUp,
  BarChart3,
  Search,
  LogIn,
  GraduationCap,
  User,
  ShieldCheck,
  Star,
  UserPlus,
} from 'lucide-react';
import { SCHOOLS, SCHOOL_DASHBOARD } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';
import useStudentStore, { TEACHER_STUDENTS } from '../../store/useStudentStore';
import AddStudentModal from './AddStudentModal';

const normalizeText = (text) =>
  text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const ROLE_BADGE_COLORS = {
  student: 'bg-accent/10 text-accent border-accent/20',
  teacher: 'bg-success/10 text-success border-success/20',
  parent: 'bg-warning/10 text-warning border-warning/20',
  school: 'bg-primary/10 text-primary border-primary/20',
};

const AdminDashboard = () => {
  const { loginAs } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [schoolSearch, setSchoolSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const customStudents = useStudentStore((s) => s.customStudents);
  const allStudents = useMemo(() => [...TEACHER_STUDENTS, ...customStudents], [customStudents]);

  // Global stats
  const totalStudents = allStudents.length;
  const totalSchools = SCHOOLS.length;
  const activeWeek = SCHOOL_DASHBOARD.stats.activeThisWeek;
  const avgProgress = allStudents.length > 0
    ? Math.round(allStudents.reduce((a, s) => a + s.progress, 0) / allStudents.length)
    : 0;

  // Combine all known users for the admin view (recalculate with store)
  const allUsers = [
    ...allStudents.map(s => ({ ...s, role: 'student', roleLabel: 'Alumno' })),
    { id: 'teacher-1', name: 'Prof. Carlos García', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos', role: 'teacher', roleLabel: 'Profesor', school: 'Todos' },
    { id: 'parent-1', name: 'María López', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', role: 'parent', roleLabel: 'Apoderado', school: 'Colegio Verbo Divino' },
    ...SCHOOLS.map(s => ({ id: s.id, name: s.name, avatar: s.logo, role: 'school', roleLabel: 'Colegio', school: s.name })),
  ];

  // Filtered schools
  const filteredSchools = SCHOOLS.filter(s =>
    normalizeText(s.name).includes(normalizeText(schoolSearch))
  );

  // Filtered users
  const filteredUsers = allUsers.filter(u => {
    const matchesSearch = normalizeText(u.name).includes(normalizeText(userSearch));
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Impersonate
  const handleImpersonate = (role) => {
    loginAs(role);
    const routes = { student: '/inicio', teacher: '/teacher', parent: '/parent', school: '/school' };
    navigate(routes[role] || '/');
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'schools', label: 'Colegios', icon: Building2 },
    { id: 'users', label: 'Usuarios', icon: Users },
  ];

  return (
    <div className="space-y-6 animate-fade-in" data-testid="admin-dashboard">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-6 h-6 text-destructive" />
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Panel Administrador
            </h1>
          </div>
          <p className="text-muted-foreground">
            Vista global del sistema Jugadas Estrategicas
          </p>
        </div>
        <Badge variant="outline" className="w-fit border-destructive/30 text-destructive">
          Modo lectura
        </Badge>
      </div>

      {/* Tab Nav */}
      <div className="flex gap-1 p-1 bg-muted rounded-xl w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            data-testid={`admin-tab-${tab.id}`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Global Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-accent/10">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-heading font-bold text-foreground">{totalStudents + 2}</p>
                    <p className="text-xs text-muted-foreground">Total usuarios</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-heading font-bold text-foreground">{totalSchools}</p>
                    <p className="text-xs text-muted-foreground">Total colegios</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-success/10">
                    <TrendingUp className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-heading font-bold text-foreground">{activeWeek}</p>
                    <p className="text-xs text-muted-foreground">Activos semana</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-xp/10">
                    <Star className="w-5 h-5 text-xp" />
                  </div>
                  <div>
                    <p className="text-2xl font-heading font-bold text-foreground">{avgProgress}%</p>
                    <p className="text-xs text-muted-foreground">Progreso promedio</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Access - Impersonate */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-lg flex items-center gap-2">
                <LogIn className="w-5 h-5 text-accent" />
                Acceso rapido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Ingresa como cualquier perfil para ver su experiencia (solo demo)
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { role: 'student', label: 'Alumno', icon: GraduationCap, color: 'bg-accent hover:bg-accent/90 text-accent-foreground' },
                  { role: 'teacher', label: 'Profesor', icon: User, color: 'bg-success hover:bg-success/90 text-success-foreground' },
                  { role: 'parent', label: 'Apoderado', icon: Users, color: 'bg-warning hover:bg-warning/90 text-warning-foreground' },
                  { role: 'school', label: 'Colegio', icon: Building2, color: 'bg-primary hover:bg-primary/90 text-primary-foreground' },
                ].map(item => (
                  <Button
                    key={item.role}
                    onClick={() => handleImpersonate(item.role)}
                    className={`h-auto py-3 flex-col gap-1.5 ${item.color}`}
                    data-testid={`impersonate-${item.role}`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-xs font-semibold">Entrar como {item.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Schools Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Colegios registrados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {SCHOOLS.slice(0, 4).map(school => (
                <div key={school.id} className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50">
                  <img src={school.logo} alt={school.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{school.name}</p>
                    <p className="text-xs text-muted-foreground">{school.students} alumnos</p>
                  </div>
                  <div className="w-20">
                    <Progress value={school.avgProgress} className="h-1.5" />
                    <p className="text-[10px] text-muted-foreground text-right mt-0.5">{school.avgProgress}%</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Schools Tab */}
      {activeTab === 'schools' && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar colegio por nombre..."
                  value={schoolSearch}
                  onChange={(e) => setSchoolSearch(e.target.value)}
                  className="pl-10"
                  data-testid="admin-school-search"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSchools.map(school => (
              <Card key={school.id} className="card-hover" data-testid={`school-card-${school.id}`}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={school.logo} alt={school.name} className="w-14 h-14 rounded-xl object-cover border border-border" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-bold text-foreground truncate">{school.name}</h3>
                      <p className="text-xs text-muted-foreground">{school.students} alumnos registrados</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Progreso promedio</span>
                      <span className="font-medium">{school.avgProgress}%</span>
                    </div>
                    <Progress value={school.avgProgress} className="h-1.5" />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4"
                    onClick={() => handleImpersonate('school')}
                    data-testid={`view-school-${school.id}`}
                  >
                    Ver dashboard
                  </Button>
                </CardContent>
              </Card>
            ))}
            {filteredSchools.length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground" data-testid="no-schools-found">
                <Building2 className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No se encontraron colegios</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Card className="flex-1">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="pl-10"
                    data-testid="admin-user-search"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="w-full sm:w-48">
              <CardContent className="p-4">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger data-testid="admin-role-filter">
                    <SelectValue placeholder="Filtrar por rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los roles</SelectItem>
                    <SelectItem value="student">Alumnos</SelectItem>
                    <SelectItem value="teacher">Profesores</SelectItem>
                    <SelectItem value="parent">Apoderados</SelectItem>
                    <SelectItem value="school">Colegios</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            <Button onClick={() => setShowAddModal(true)} className="h-auto sm:self-start sm:mt-0" data-testid="add-student-btn-admin">
              <UserPlus className="w-4 h-4 mr-2" />
              Agregar alumno
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {filteredUsers.map(user => (
                  <div key={user.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/30 transition-colors" data-testid={`user-row-${user.id}`}>
                    <Avatar className="w-10 h-10 border border-border">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.school || '—'}</p>
                    </div>
                    <Badge variant="outline" className={`text-[10px] ${ROLE_BADGE_COLORS[user.role] || ''}`}>
                      {user.roleLabel}
                    </Badge>
                    {user.level && (
                      <Badge variant="secondary" className="text-[10px]">Nv. {user.level}</Badge>
                    )}
                    {user.progress !== undefined && (
                      <div className="hidden md:flex items-center gap-2 w-24">
                        <Progress value={user.progress} className="h-1.5" />
                        <span className="text-xs text-muted-foreground w-8">{user.progress}%</span>
                      </div>
                    )}
                  </div>
                ))}
                {filteredUsers.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground" data-testid="no-users-found">
                    <Users className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No se encontraron usuarios</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <AddStudentModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        role="admin"
      />
    </div>
  );
};

export default AdminDashboard;
