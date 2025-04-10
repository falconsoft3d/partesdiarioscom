import { deleteUsuario, getUsuarioById, updateUsuario } from "@/lib/usuarios";
import { NextRequest, NextResponse } from "next/server";


// Obtener un usuario por ID
export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop(); // o usa regex si prefieres
  if (!id) return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });

  try {
    const usuario = getUsuarioById(Number(id));
    if (!usuario) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    return NextResponse.json(usuario, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Error al obtener usuario: ${error}` }, { status: 500 });
  }
}

// Actualizar usuario
export async function PUT(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop(); // o usa regex si prefieres
  if (!id) return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });

  try {
    const { usuario, password, url } = await req.json();
    updateUsuario(Number(id), usuario, password, url);
    return NextResponse.json({ message: "Usuario actualizado" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Error al actualizar usuario: ${error}` }, { status: 500 });
  }
}

// Eliminar usuario
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop(); // o usa regex si prefieres
  if (!id) return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });

  try {
    deleteUsuario(Number(id));
    return NextResponse.json({ message: "Usuario eliminado" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Error al eliminar usuario: ${error}` }, { status: 500 });
  }
}
