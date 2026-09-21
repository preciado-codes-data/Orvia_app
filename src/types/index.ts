export type RootStackParamList = {
  Login: undefined;
  DashboardGerente: undefined;
  DashboardSubgerente: undefined;
  DashboardCalidad: undefined;
  InventarioApertura: { tipo: 'APERTURA' };
  InventarioCierre: { tipo: 'CIERRE' };
  InventarioCaducidades: { tipo: 'CADUCIDADES' };
  GestionProductos: undefined;
};

export interface Producto {
  id: string;
  nombre: string;
  formatoRecepcion: string;      // Ej: Caja, Bote, Paquete
  formatoSecundario?: string;    // Ej: Bolsa, Rollo
  unidadesXFormato?: number;     // Ej: 6
  formatoRegistro: 'Pza' | 'kg'; // Unidad base
  cantidadXUnidad: number;       // Ej: 36
  manejaCaducidad: boolean;
  zonaId?: string;
}

export interface RegistroInventario {
  id: string;
  productoId: string;
  empaquesCompletos: number;
  unidadesSueltas: number;
  totalUnidadesBase: number;
  fechaCaducidad?: string;
  fechaRegistro: string;
  sincronizado: boolean;
}