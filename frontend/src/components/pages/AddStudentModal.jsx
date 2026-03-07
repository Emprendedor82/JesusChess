import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { UserPlus } from 'lucide-react';
import { SCHOOLS } from '../../data/mockData';
import useStudentStore from '../../store/useStudentStore';
import { toast } from 'sonner';

const INITIAL_FORM = {
  nombre: '',
  apellido: '',
  email: '',
  nivel: '1',
  colegio: '',
  profesor: '',
  edad: '',
};

const AddStudentModal = ({ open, onOpenChange, role, defaults = {} }) => {
  const [form, setForm] = useState({ ...INITIAL_FORM, ...defaults });
  const [errors, setErrors] = useState({});
  const addStudent = useStudentStore((s) => s.addStudent);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = 'Nombre es obligatorio';
    if (!form.apellido.trim()) e.apellido = 'Apellido es obligatorio';
    if (!form.email.trim()) e.email = 'Email es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email no válido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addStudent(form);
    toast.success('Alumno creado correctamente', {
      description: `${form.nombre} ${form.apellido} ha sido agregado al sistema`,
    });
    setForm({ ...INITIAL_FORM, ...defaults });
    setErrors({});
    onOpenChange(false);
  };

  const handleClose = (val) => {
    if (!val) {
      setForm({ ...INITIAL_FORM, ...defaults });
      setErrors({});
    }
    onOpenChange(val);
  };

  const showColegio = role === 'admin';
  const showProfesor = role === 'admin' || role === 'school';

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md" data-testid="add-student-modal">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-heading">
            <UserPlus className="w-5 h-5 text-accent" />
            Agregar alumno
          </DialogTitle>
          <DialogDescription>
            Completa los datos para crear un nuevo alumno
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input
                id="nombre"
                placeholder="Ej: Sofía"
                value={form.nombre}
                onChange={(e) => update('nombre', e.target.value)}
                data-testid="input-nombre"
              />
              {errors.nombre && <p className="text-xs text-destructive">{errors.nombre}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="apellido">Apellido *</Label>
              <Input
                id="apellido"
                placeholder="Ej: Martínez"
                value={form.apellido}
                onChange={(e) => update('apellido', e.target.value)}
                data-testid="input-apellido"
              />
              {errors.apellido && <p className="text-xs text-destructive">{errors.apellido}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="alumno@colegio.cl"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              data-testid="input-email"
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="nivel">Nivel</Label>
              <Select value={form.nivel} onValueChange={(v) => update('nivel', v)}>
                <SelectTrigger data-testid="select-nivel">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      Nivel {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edad">Edad (opcional)</Label>
              <Input
                id="edad"
                type="number"
                min="4"
                max="18"
                placeholder="Ej: 12"
                value={form.edad}
                onChange={(e) => update('edad', e.target.value)}
                data-testid="input-edad"
              />
            </div>
          </div>

          {showColegio && (
            <div className="space-y-1.5">
              <Label>Colegio</Label>
              <Select value={form.colegio} onValueChange={(v) => update('colegio', v)}>
                <SelectTrigger data-testid="select-colegio">
                  <SelectValue placeholder="Seleccionar colegio" />
                </SelectTrigger>
                <SelectContent>
                  {SCHOOLS.map((s) => (
                    <SelectItem key={s.id} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {showProfesor && (
            <div className="space-y-1.5">
              <Label htmlFor="profesor">Profesor asignado</Label>
              <Input
                id="profesor"
                placeholder="Ej: Prof. Carlos García"
                value={form.profesor}
                onChange={(e) => update('profesor', e.target.value)}
                data-testid="input-profesor"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              data-testid="cancel-add-student"
            >
              Cancelar
            </Button>
            <Button type="submit" data-testid="submit-add-student">
              <UserPlus className="w-4 h-4 mr-2" />
              Guardar alumno
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentModal;
