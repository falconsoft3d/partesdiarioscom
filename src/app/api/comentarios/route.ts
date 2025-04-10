import { createComentario } from './../../../lib/comentarios';
import { getComentarios } from "@/lib/comentarios";
import { NextResponse } from "next/server";



// Obtener todos los usuarios
export async function GET() {
  try {
    const comentarios = getComentarios();
    return NextResponse.json(comentarios, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Error al obtener comentarios: ${error}` }, { status: 500 });
  }
}

// Crear un nuevo usuario
export async function POST(req: Request) {
  try {
    const { comentario, id_usuario } = await req.json();
    createComentario(comentario, id_usuario,);
    return NextResponse.json({ message: "Comentario creado exitosamente",status: 200 }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: `Error al crear comentario: ${error}`,status: 500 }, { status: 500 });
  }
}
