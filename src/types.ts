

export interface Transaccion {
  id: string;
  monto: number;
  descripcion: string;
  categoria: string;
  fecha: string;
  tipo: 'ingreso' | 'gasto';
  usuarioId: string;
}

export interface Presupuesto {
  id: string;
  categoria: string;
  limite: number;
  gastado: number;
  periodo: 'mensual' | 'anual';
}

export interface Categoria {
  id: string;
  nombre: string;
  icono: string;
  color: string;
}

export interface PlanFinanciero {
  id: string;
  titulo: string;
  descripcion: string;
  meta: number;
  actual: number;
  fecha: string;
  icono: string;
  color: string;
  usuarioId: string;
}