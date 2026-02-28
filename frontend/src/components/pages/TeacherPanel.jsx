import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from '../ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { 
  Users, 
  Search, 
  Star, 
  Clock, 
  ChevronRight,
  Target,
  Brain,
  Focus,
  Timer,
  Heart,
  ClipboardList,
  Check,
  X,
  Send
} from 'lucide-react';
import { TEACHER_STUDENTS, TASK_TEMPLATES } from '../../data/mockData';
import { notificationStore } from '../../data/notificationStore';
import { toast } from 'sonner';

const CATEGORIES = ['Movimiento', 'Captura', 'Ataque', 'Mate', 'Defensa', 'Táctica', 'Aperturas', 'Finales'];

const TeacherPanel = () => {
  const { currentUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [evaluation, setEvaluation] = useState({});
  const [feedback, setFeedback] = useState('');

  // Assignment form state
  const [assignCategory, setAssignCategory] = useState('');
  const [assignLevel, setAssignLevel] = useState('');
  const [assignExercise, setAssignExercise] = useState('');
  const [assignDueDate, setAssignDueDate] = useState('');
  const [assignMessage, setAssignMessage] = useState('');

const TeacherPanel = () => {
  const { currentUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [evaluation, setEvaluation] = useState({});
  const [feedback, setFeedback] = useState('');

  // Normalize text: remove accents, lowercase
  const normalizeText = (text) =>
    text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const filteredStudents = TEACHER_STUDENTS.filter(student => {
    const search = normalizeText(searchTerm);
    return normalizeText(student.name).includes(search) ||
      normalizeText(student.school).includes(search);
  });

  const evaluationCriteria = [
    { key: 'tactica', label: 'Táctica', icon: Target, description: 'Capacidad de ver combinaciones' },
    { key: 'estrategia', label: 'Estrategia', icon: Brain, description: 'Planificación a largo plazo' },
    { key: 'atencion', label: 'Atención', icon: Focus, description: 'Concentración durante la partida' },
    { key: 'tiempoGestion', label: 'Gestión del tiempo', icon: Timer, description: 'Uso eficiente del reloj' },
    { key: 'actitud', label: 'Actitud', icon: Heart, description: 'Autorregulación emocional' },
  ];

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setEvaluation(student.evaluation || {});
    setFeedback(student.feedback || '');
  };

  const handleEvaluationChange = (key, value) => {
    setEvaluation(prev => ({ ...prev, [key]: parseInt(value) }));
  };

  const handleSaveEvaluation = () => {
    // Mock save - in real app would send to backend
    console.log('Saving evaluation:', { studentId: selectedStudent.id, evaluation, feedback });
    setSelectedStudent(null);
  };

  const handleAssignTask = () => {
    if (!assignCategory || !assignLevel || !assignExercise) return;

    notificationStore.createAssignment({
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      teacherId: currentUser?.id || 'teacher-1',
      category: assignCategory,
      level: parseInt(assignLevel),
      exercise: parseInt(assignExercise),
      message: assignMessage,
      dueDate: assignDueDate || null,
    });

    toast.success(`Tarea asignada a ${selectedStudent.name}`, {
      description: `${assignCategory} – Nivel ${assignLevel} – Ejercicio ${assignExercise}`,
    });

    // Reset form
    setShowTaskDialog(false);
    setAssignCategory('');
    setAssignLevel('');
    setAssignExercise('');
    setAssignDueDate('');
    setAssignMessage('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Panel del Profesor
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestiona y evalúa el progreso de tus alumnos
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-success/10 border border-success/20">
          <Users className="w-5 h-5 text-success" />
          <span className="font-heading font-bold text-success">{TEACHER_STUDENTS.length}</span>
          <span className="text-sm text-muted-foreground">alumnos activos</span>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar alumno por nombre o colegio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student) => (
          <Card 
            key={student.id}
            className="cursor-pointer card-hover"
            onClick={() => handleStudentClick(student)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="w-14 h-14 border-2 border-accent/20">
                  <AvatarImage src={student.avatar} alt={student.name} />
                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-foreground truncate">
                      {student.name}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      Nivel {student.level}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-1">
                    {student.school}
                  </p>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progreso</span>
                      <span className="font-medium">{student.progress}%</span>
                    </div>
                    <Progress value={student.progress} className="h-1.5" />
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{student.lastActive}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Student Detail Dialog */}
      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedStudent && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 border-2 border-accent/20">
                    <AvatarImage src={selectedStudent.avatar} alt={selectedStudent.name} />
                    <AvatarFallback>{selectedStudent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="font-heading text-xl">
                      {selectedStudent.name}
                    </DialogTitle>
                    <DialogDescription className="flex items-center gap-2">
                      <span>{selectedStudent.school}</span>
                      <span>•</span>
                      <Badge variant="outline">Nivel {selectedStudent.level}</Badge>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              {/* Evaluation Grid */}
              <div className="space-y-4 mt-4">
                <h3 className="font-heading font-bold text-foreground">Evaluación (1-5)</h3>
                <div className="grid gap-4">
                  {evaluationCriteria.map((criteria) => (
                    <div key={criteria.key} className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10">
                        <criteria.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{criteria.label}</p>
                        <p className="text-xs text-muted-foreground">{criteria.description}</p>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            onClick={() => handleEvaluationChange(criteria.key, value)}
                            className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                              evaluation[criteria.key] >= value
                                ? 'bg-accent text-accent-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-accent/20'
                            }`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              <div className="space-y-2 mt-4">
                <h3 className="font-heading font-bold text-foreground">Comentario</h3>
                <Textarea
                  placeholder="Escribe un comentario sobre el progreso del alumno..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={3}
                />
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowTaskDialog(true)}
                  className="w-full sm:w-auto"
                >
                  <ClipboardList className="w-4 h-4 mr-2" />
                  Asignar tarea
                </Button>
                <Button onClick={handleSaveEvaluation} className="w-full sm:w-auto btn-accent">
                  <Check className="w-4 h-4 mr-2" />
                  Guardar evaluación
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Assign Task Dialog */}
      <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Asignar tarea</DialogTitle>
            <DialogDescription>
              Asigna una actividad a {selectedStudent?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-2">
            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Categoria *</label>
              <Select value={assignCategory} onValueChange={setAssignCategory}>
                <SelectTrigger data-testid="assign-category-select">
                  <SelectValue placeholder="Seleccionar categoria" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Level & Exercise row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Nivel *</label>
                <Select value={assignLevel} onValueChange={setAssignLevel}>
                  <SelectTrigger data-testid="assign-level-select">
                    <SelectValue placeholder="Nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map(n => (
                      <SelectItem key={n} value={String(n)}>Nivel {n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Ejercicio *</label>
                <Select value={assignExercise} onValueChange={setAssignExercise}>
                  <SelectTrigger data-testid="assign-exercise-select">
                    <SelectValue placeholder="Ejercicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2].map(n => (
                      <SelectItem key={n} value={String(n)}>Ejercicio {n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Due Date */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Fecha limite <span className="text-muted-foreground font-normal">(opcional)</span></label>
              <Input
                type="date"
                value={assignDueDate}
                onChange={(e) => setAssignDueDate(e.target.value)}
                data-testid="assign-due-date"
              />
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Mensaje <span className="text-muted-foreground font-normal">(opcional)</span></label>
                <span className="text-xs text-muted-foreground">{assignMessage.length}/250</span>
              </div>
              <Textarea
                placeholder="Escribe un mensaje para el alumno..."
                value={assignMessage}
                onChange={(e) => setAssignMessage(e.target.value.slice(0, 250))}
                rows={2}
                data-testid="assign-message"
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="ghost" onClick={() => setShowTaskDialog(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleAssignTask} 
              disabled={!assignCategory || !assignLevel || !assignExercise}
              className="btn-accent"
              data-testid="send-task-btn"
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar tarea
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherPanel;
