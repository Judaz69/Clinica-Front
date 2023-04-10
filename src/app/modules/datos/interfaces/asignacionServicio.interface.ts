export interface AsignacionServicio {
    id:           number;
    empleadoId:   number;
    servicioId:   number;
    empleado:     Empleado;
    tipoServicio: TipoServicio;
}

export interface Empleado {
    nombres:   string;
    apellidos: string;
    cedula:    string;
}

export interface TipoServicio {
    nombreServicio: string;
}
