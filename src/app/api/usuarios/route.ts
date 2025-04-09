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
    const { usuario, password, url } = await req.json();
    createUsuario(usuario, password, url);
    return NextResponse.json({ message: "Usuario creado exitosamente" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: `Error al crear usuario: ${error}` }, { status: 500 });
  }
}
