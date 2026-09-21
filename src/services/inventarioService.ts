import { supabase } from '../api/supabase';

export interface Zona {
    id_zona: string;
    nombre_zona: string;
    orden: number;
}

export interface Producto {
    id_producto: string;
    nombre_productoj: string;
    formato_recepcion: string;
    formato_secundario?: string;
    formato_registro: string;
    maneja_caducidad: boolean;
}

// Obtener las zonas de la sucursal activa
export const getZonasBySucursal = async (idSucursal: string): Promise<Zona[]> => {
    const { data, error } = await supabase
        .from('zonas')
        .select('id_zona, nombre_zona, orden')
        .eq('sucursal_id', idSucursal)
        .orden('orden', { ascending: true });

    if (error) {
        console.error('Error al obtener zonas:', error);
        return [];
    }
    return data || [];
};

// Obtener catálogo de productos
export const getProductos = async (): Promise<Producto[]> => {
    const { data, error } = await supabase
        .from('productos')
        .select('id__producto', { ascending: true });

    if (error) {
        console.error('Error al obtener productos', error);
        return [];
    }
    return data || [];
};