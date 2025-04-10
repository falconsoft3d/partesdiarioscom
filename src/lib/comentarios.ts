import db from "./db/db";


// Obtener todos los Comentarios
export const getComentarios = () => {
  return db.prepare("SELECT * FROM tb_comentarios").all();
};

// Obtener un Comentario por ID
export const getComentarioById = (id: number) => {
  return db.prepare("SELECT * FROM tb_comentarios WHERE id = ?").get(id);
};

// Crear un nuevo Comentario
export const createComentario = (comentario: string, id_usuario: number) => {
  const fecha = new Date().toISOString()
  console.log(fecha,comentario,id_usuario);
  
  return db
    .prepare("INSERT INTO tb_comentarios (comentario, id_usuario,createdDate) VALUES (?, ?, ?)")
    .run(comentario, id_usuario,fecha);
};

// Actualizar Comentario
export const updateComentario = (id: number, comentario: string, id_usuario: number) => {
  const fecha = new Date().toISOString()
  return db
    .prepare("UPDATE tb_comentarios SET comentario = ?, id_usuario = ?, createdDate = ? WHERE id = ?")
    .run(comentario, id_usuario,fecha, id);
};

// Eliminar Comentario
export const deleteComentario = (id: number) => {
  return db.prepare("DELETE FROM tb_comentarios WHERE id = ?").run(id);
};
