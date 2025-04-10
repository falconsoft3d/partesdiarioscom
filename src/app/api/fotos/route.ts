
import { createFoto, getFotos } from "@/lib/fotos";
import { NextResponse } from "next/server";



// Obtener todos los usuarios
export async function GET() {
  try {
    const Foto = getFotos();
    return NextResponse.json(Foto, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Error al obtener Foto: ${error}` }, { status: 500 });
  }
}

// Crear un nuevo usuario
export async function POST(req: Request) {
  try {
    const { foto, id_usuario,observacion } = await req.json();
    createFoto(foto, id_usuario,observacion);
    return NextResponse.json({ message: "Foto creada exitosamente",status: 200 }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: `Error al crear la foto: ${error}`,status: 500 }, { status: 500 });
  }
}
