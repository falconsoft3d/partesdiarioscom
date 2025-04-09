import { NextResponse } from "next/server";
import {
  createConfiguracion,
  getConfiguraciones,
} from "@/lib/configuracion";
import db from "@/lib/db/db";


export async function getConfiguracionesHandler(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const usuario_id = searchParams.get('usuario_id');
    
    const configuraciones = getConfiguraciones(
      usuario_id ? parseInt(usuario_id) : undefined
    );
    
    return NextResponse.json({ success: true, data: configuraciones });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido al obtener configuraciones';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function postConfiguracionHandler(request: Request): Promise<NextResponse> {
  try {
    const data = await request.json();

    if (!data.denominacion || !data.usuario_id) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    // Verificar existencia del usuario
    const usuario = db.prepare('SELECT id FROM tb_usuarios WHERE id = ?')
      .get(data.usuario_id);
      
    if (!usuario) {
      return NextResponse.json(
        { success: false, error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    const result = createConfiguracion(data);
    
    return NextResponse.json({
      success: true,
      data: {
        id: result.lastInsertRowid,
        ...data
      }
    }, { status: 201 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido al crear configuración';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}