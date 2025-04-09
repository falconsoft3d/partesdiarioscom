import { NextResponse } from 'next/server';

//import db from '@/lib/db/db';
import { createEmpleadoConfig, getEmpleadoConfigs } from '@/lib/empleado-config';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("data1",data);
    // Validación básica
    if (!data.empleado_id || !data.configuracion_id || !data.valor) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    // // Verificar existencia de empleado
    // const empleado = db.prepare('SELECT id FROM tb_empleados WHERE id = ?')
    //   .get(data.empleado_id);
    //   console.log(empleado);
      
    // if (!empleado) {
    //   return NextResponse.json(
    //     { success: false, error: 'Empleado no encontrado' },
    //     { status: 404 }
    //   );
    // }

    // // Verificar existencia de configuración
    // const config = db.prepare('SELECT id FROM tb_configuracion WHERE id = ?')
    //   .get(data.configuracion_id);
    //   console.log(config);
      
    // if (!config) {
    //   return NextResponse.json(
    //     { success: false, error: 'Configuración no encontrada' },
    //     { status: 404 }
    //   );
    // }


    const result = createEmpleadoConfig(data);
    
    return NextResponse.json({
      success: true,
      data: {
        id: result.lastInsertRowid,
        ...data
      }
    }, { status: 201 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido al crear empleado-configuracion';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    return NextResponse.json({
      success: true,
      data: getEmpleadoConfigs(
        Number(searchParams.get('empleado_id')) || undefined,
        Number(searchParams.get('configuracion_id')) || undefined,
        Number(searchParams.get('page')) || 1,
        Number(searchParams.get('pageSize')) || 10
      )
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido al obtener empleado-configuracion';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}