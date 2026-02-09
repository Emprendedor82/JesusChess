import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Users, 
  ClipboardList, 
  TrendingUp, 
  ChevronRight,
  Star,
  Clock
} from 'lucide-react';

const CoachHome = () => {
  const { currentUser } = useApp();
  const navigate = useNavigate();

  // Mock data
  const coachData = {
    name: currentUser?.name || 'Coach',
    studentsActive: 12,
    studentsTotal: 15,
    tasksToReview: 5,
    recentActivity: [
      { student: 'Sofía M.', action: 'Completó Nivel 2', time: 'Hace 2h', xp: 150 },
      { student: 'Matías G.', action: 'Resolvió 3 retos', time: 'Hace 4h', xp: 90 },
      { student: 'Valentina R.', action: 'Comenzó Nivel 3', time: 'Hace 1 día', xp: 50 },
    ],
    topStudents: [
      { name: 'Valentina R.', level: 4, xp: 1200 },
      { name: 'Sofía M.', level: 3, xp: 850 },
      { name: 'Lucas P.', level: 3, xp: 720 },
    ]
  };

  return (
    <div className="p-4 space-y-5 animate-fade-in">
      {/* Welcome Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          ¡Hola, {coachData.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Resumen de tu academia
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-accent/5 border-accent/20">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-accent mx-auto mb-2" />
            <p className="font-heading text-2xl font-bold text-foreground">
              {coachData.studentsActive}
            </p>
            <p className="text-xs text-muted-foreground">Alumnos activos</p>
            <p className="text-xs text-accent mt-1">
              de {coachData.studentsTotal} total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-warning/5 border-warning/20">
          <CardContent className="p-4 text-center">
            <ClipboardList className="w-8 h-8 text-warning mx-auto mb-2" />
            <p className="font-heading text-2xl font-bold text-foreground">
              {coachData.tasksToReview}
            </p>
            <p className="text-xs text-muted-foreground">Tareas por revisar</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              <h3 className="font-heading font-bold text-foreground">Actividad reciente</h3>
            </div>
          </div>
          <div className="space-y-3">
            {coachData.recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.student}</p>
                  <p className="text-xs text-muted-foreground">{activity.action}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-xp border-xp/30 text-xs">
                    +{activity.xp} XP
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Students */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-xp" />
              <h3 className="font-heading font-bold text-foreground">Top alumnos</h3>
            </div>
          </div>
          <div className="space-y-3">
            {coachData.topStudents.map((student, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm
                  ${idx === 0 ? 'bg-xp text-xp-foreground' : idx === 1 ? 'bg-level-silver' : 'bg-level-bronze'}
                `}>
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{student.name}</p>
                  <p className="text-xs text-muted-foreground">Nivel {student.level}</p>
                </div>
                <p className="text-sm font-bold text-xp">{student.xp} XP</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Note about board access */}
      <div className="p-4 rounded-xl bg-muted/50 border border-border">
        <p className="text-sm text-muted-foreground text-center">
          💡 El tablero interactivo está disponible solo para alumnos.
          <br />
          Como coach, puedes ver el progreso y asignar tareas.
        </p>
      </div>
    </div>
  );
};

export default CoachHome;
