export interface Presupuesto {
  id: number;
  categoria: string;
  fecha_inicio?: Date;
  fecha_fin?: Date;
  limite: number;
  usuario_id: number;
}

export interface Gasto {
  id: number;
  presupuesto_id: number;
  tipo: string;
  usuario_id: number;
  monto: number;
  estado: number;
  fecha?: Date;
  //deuda es decimal
  deuda?: number;
}

export interface Ingreso {
  id: number;
  fecha?: Date;
  monto: number;
  usuario_id:number;
  origen: string;
}



export interface Transaccion {
  id: string;
  monto: number;
  descripcion: string;
  categoria: string;
  fecha: string;
  tipo: "ingreso" | "gasto";
  usuarioId: string;
}

export interface Categoria {
  id: string;
  nombre: string;
  icono: string;
  color: string;
}

export interface PlanFinanciero {
  id: number;
  titulo: string;
  descripcion: string;
  meta: number;
  actual: number;
  fecha: string;
  icono: string;
  color: string;
  usuarioId: string;
}
