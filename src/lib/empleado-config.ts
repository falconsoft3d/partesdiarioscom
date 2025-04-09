import db from '@/lib/db/db';
import { CreateEmpleadoConfig } from '@/util/types';

export const createEmpleadoConfig = (data: CreateEmpleadoConfig) => {
  console.log("data2",data);
  
  return db.prepare("INSERT INTO tb_empleado_config (empleado_id, configuracion_id, valor) VALUES (?, ?, ?)")
  .run(data.empleado_id, data.configuracion_id, data.valor);
};

export const getEmpleadoConfigs = (
  empleado_id?: number,
  configuracion_id?: number,
  page: number = 1,
  pageSize: number = 10
) => {
  let query = 'SELECT * FROM tb_empleado_config';
  const params = [];
  const conditions = [];

  if (empleado_id) {
    conditions.push('empleado_id = ?');
    params.push(empleado_id);
  }

  if (configuracion_id) {
    conditions.push('configuracion_id = ?');
    params.push(configuracion_id);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' LIMIT ? OFFSET ?';
  params.push(pageSize, (page - 1) * pageSize);

  return db.prepare(query).all(...params);
};