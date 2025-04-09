import db from "./db/db";


// Obtener todos los usuarios
export const getUsuarios = () => {
  return db.prepare("SELECT * FROM tb_usuarios").all();
};

// Obtener un usuario por ID
export const getUsuarioById = (id: number) => {
  return db.prepare("SELECT * FROM tb_usuarios WHERE id = ?").get(id);
};

// Crear un nuevo usuario
export const createUsuario = (usuario: string, password: string, url: string) => {
  return db
    .prepare("INSERT INTO tb_usuarios (usuario, password, url) VALUES (?, ?, ?)")
    .run(usuario, password, url);
};

// Actualizar usuario
export const updateUsuario = (id: number, usuario: string, password: string, url: string) => {
  return db
    .prepare("UPDATE tb_usuarios SET usuario = ?, password = ?, url = ? WHERE id = ?")
    .run(usuario, password, url, id);
};

// Eliminar usuario
export const deleteUsuario = (id: number) => {
  return db.prepare("DELETE FROM tb_usuarios WHERE id = ?").run(id);
};
