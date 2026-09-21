import * as SQLite from 'expo-sqlite';
import { Producto, RegistroInventario } from '../types';

const db = SQLite.openDatabaseSync('orvia_local.db');

export const initLocalDatabase = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS productos_local (
      id TEXT PRIMARY KEY,
      nombre TEXT NOT NULL,
      formatoRecepcion TEXT NOT NULL,
      formatoSecundario TEXT,
      unidadesXFormato REAL,
      formatoRegistro TEXT NOT NULL,
      cantidadXUnidad REAL NOT NULL,
      manejaCaducidad INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS inventario_cola (
      id TEXT PRIMARY KEY,
      productoId TEXT NOT NULL,
      empaquesCompletos INTEGER DEFAULT 0,
      unidadesSueltas REAL DEFAULT 0,
      totalUnidadesBase REAL NOT NULL,
      fechaCaducidad TEXT,
      fechaRegistro TEXT NOT NULL,
      sincronizado INTEGER DEFAULT 0
    );
  `);
};

export const guardarRegistroLocal = (registro: Omit<RegistroInventario, 'sincronizado'>) => {
  db.runSync(
    `INSERT INTO inventario_cola (id, productoId, empaquesCompletos, unidadesSueltas, totalUnidadesBase, fechaCaducidad, fechaRegistro, sincronizado)
     VALUES (?, ?, ?, ?, ?, ?, ?, 0);`,
    [
      registro.id,
      registro.productoId,
      registro.empaquesCompletos,
      registro.unidadesSueltas,
      registro.totalUnidadesBase,
      registro.fechaCaducidad || null,
      registro.fechaRegistro
    ]
  );
};

export const obtenerPendientesSincronizacion = () => {
  return db.getAllSync<RegistroInventario>(
    `SELECT * FROM inventario_cola WHERE sincronizado = 0;`
  );
};