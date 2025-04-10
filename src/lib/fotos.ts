import db from "./db/db";


// Obtener todos los Fotos
export const getFotos = () => {
  return db.prepare("SELECT * FROM tb_multimedia").all();
};

// Obtener un Foto por ID
export const getFotoById = (id: number) => {
  return db.prepare("SELECT * FROM tb_multimedia WHERE id = ?").get(id);
};

// Crear un nuevo Foto
export const createFoto = (Foto: string, id_usuario: number,observacion:string) => {
  const fecha = new Date().toISOString()
 return db
    .prepare("INSERT INTO tb_multimedia (foto, id_usuario,observacion,createdDate) VALUES (?, ?, ?,?)")
    .run(Foto, id_usuario,observacion,fecha);
};

// Actualizar Foto
export const updateFoto = (id: number, Foto: string, id_usuario: number,observacion:string) => {
  const fecha = new Date().toISOString()
  return db
    .prepare("UPDATE tb_multimedia SET foto = ?, id_usuario = ?,observacion = ?, createdDate = ? WHERE id = ?")
    .run(Foto, id_usuario,observacion,fecha, id);
};

// Eliminar Foto
export const deleteFoto = (id: number) => {
  return db.prepare("DELETE FROM tb_multimedia WHERE id = ?").run(id);
};
