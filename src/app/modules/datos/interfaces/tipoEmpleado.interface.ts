export interface TipoEmpleado {
    id:              number;
    nombreTipo:      string;
    asignacionTipos: AsignacionTipo[];
}

export interface AsignacionTipo {
    empleado: Empleado;
}

export interface Empleado {
    nombres:   string;
    apellidos: string;
    cedula:    string;
}
