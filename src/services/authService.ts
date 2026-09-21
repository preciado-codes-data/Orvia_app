// src/services/authService.ts
import { supabase } from '../api/supabase';

export interface UsuarioAuth {
  id_usuario: string;
  nombre_completo: string;
  usuario: string;
  rol_nombre: string;
  id_sucursal: string;
  nombre_sucursal: string;
}

export const loginUsuario = async (username: string, pass: string): Promise<UsuarioAuth | null> => {
  const { data, error } = await supabase
    .from('usuarios')
    .select(`
      id_usuario,
      nombre_completo,
      usuario,
      password_hash,
      sucursal_id,
      sucursales ( nombre_sucursal ),
      roles ( nombre_rol )
    `)
    .eq('usuario', username.trim().toUpperCase())
    .single();

  if (error || !data) {
    console.error('Error al autenticar usuario:', error);
    return null;
  }

  if (data.password_hash !== pass) {
    return null;
  }

  const rolData = data.roles as any;
  const sucursalData = data.sucursales as any;

  return {
    id_usuario: data.id_usuario,
    nombre_completo: data.nombre_completo,
    usuario: data.usuario,
    rol_nombre: rolData?.nombre_rol || 'Lider de Calidad',
    id_sucursal: data.sucursal_id,
    nombre_sucursal: sucursalData?.nombre_sucursal || '',
  };
};