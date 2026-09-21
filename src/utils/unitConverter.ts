export interface ProductoConversionConfig {
  formatoRecepcion: string;    // 'Caja', 'Bote', 'Paquete'
  formatoSecundario?: string;  // 'Bolsa', 'Rollo'
  unidadesXFormato?: number;   // Ej: 6 bolsas por caja
  formatoRegistro: 'Pza' | 'kg';
  cantidadXUnidad: number;     // Ej: 36 piezas o 3 kg por bolsa
}

export interface ResultadoConversion {
  totalBase: number;
  unidadMedida: string;
  resumenTexto: string;
}

export const calcularConversion = (
  empaquesCompletos: number,
  unidadesSueltas: number,
  config: ProductoConversionConfig
): ResultadoConversion => {
  let unidadesPorEmpaquetado = config.cantidadXUnidad;

  // Si tiene un formato secundario (ej. Caja -> 6 bolsas -> 3kg por bolsa = 18kg por caja)
  if (config.unidadesXFormato && config.unidadesXFormato > 0) {
    unidadesPorEmpaquetado = config.unidadesXFormato * config.cantidadXUnidad;
  }

  const totalEmpaquesEnBase = empaquesCompletos * unidadesPorEmpaquetado;
  const totalBase = parseFloat((totalEmpaquesEnBase + unidadesSueltas).toFixed(2));

  const resumenTexto = `${empaquesCompletos} ${config.formatoRecepcion}(s) + ${unidadesSueltas} ${config.formatoRegistro} = ${totalBase} ${config.formatoRegistro}`;

  return {
    totalBase,
    unidadMedida: config.formatoRegistro,
    resumenTexto,
  };
};