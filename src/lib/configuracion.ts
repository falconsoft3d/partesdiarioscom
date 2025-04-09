import { CreateConfig, UpdateConfig } from "@/util/types";
import db from "./db/db";

export const createConfiguracion = (configData: CreateConfig) => {
  return db.prepare(`
    INSERT INTO tb_configuracion (
      id_odt, id_psp, id_presupuesto,
      cod_odt, cod_psp, cod_presupuesto,
      denominacion, usuario_id
    ) VALUES (
      @id_odt, @id_psp, @id_presupuesto,
      @cod_odt, @cod_psp, @cod_presupuesto,
      @denominacion, @usuario_id
  )`).run(configData);
};

export const getConfiguraciones = (usuario_id?: number) => {
  let query = 'SELECT * FROM tb_configuracion';
  const params = [];
  
  if (usuario_id) {
    query += ' WHERE usuario_id = ?';
    params.push(usuario_id);
  }
  
  return db.prepare(query).all(...params);
};

export const getConfiguracionById = (id: number) => {
  return db.prepare('SELECT * FROM tb_configuracion WHERE id = ?').get(id);
};

export const updateConfiguracion = (id: number, configData: UpdateConfig) => {
  return db.prepare(`
    UPDATE tb_configuracion SET
      id_odt = @id_odt,
      id_psp = @id_psp,
      id_presupuesto = @id_presupuesto,
      cod_odt = @cod_odt,
      cod_psp = @cod_psp,
      cod_presupuesto = @cod_presupuesto,
      denominacion = @denominacion,
      usuario_id = @usuario_id
    WHERE id = ?
  `).run({ ...configData, id });
};

export const deleteConfiguracion = (id: number) => {
  return db.prepare('DELETE FROM tb_configuracion WHERE id = ?').run(id);
};