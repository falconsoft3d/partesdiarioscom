import { createUsuario, getUsuarios } from "@/lib/usuarios";
import { NextResponse } from "next/server";



// Obtener todos los usuarios
export async function GET() {
  try {
    const usuarios = getUsuarios();
    return NextResponse.json(usuarios, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Error al obtener usuarios: ${error}` }, { status: 500 });
  }
}

// Crear un nuevo usuario
export async function POST(req: Request) {
  try {
    const { usuario, password, url,parte_json } = await req.json();
    const user = createUsuario(usuario, password, url,parte_json);
    return NextResponse.json({ message: "Usuario creado exitosamente",user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: `Error al crear usuario: ${error}` }, { status: 500 });
  }
}
