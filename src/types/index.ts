export interface Presupuesto{
    id: number;
    categoria: string;
    fecha_inicio?: Date;
    fecha_fin?: Date;
    limite: number;
}

export interface Gasto{
    id: number;
    presupuesto_id: number;
    tipo:string;
    usuario_id: number;
    monto: number;
    estado:number;
    fecha?: Date;
}
 

export interface Transaccion {
    id: string;
    monto: number;
    descripcion: string;
    categoria: string;
    fecha: string;
    tipo: 'ingreso' | 'gasto';
    usuarioId: string;
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

