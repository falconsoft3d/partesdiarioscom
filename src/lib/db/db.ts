import sqlite3 from 'better-sqlite3';
import { join } from 'path';
import { existsSync } from 'fs';

const dbPath = join(process.cwd(), 'partesdiarios.sqlite');

// Verifica si el archivo de la BD ya existe antes de abrir la conexión
if (!existsSync(dbPath)) {
    console.log(`⚠️ La base de datos no existe en ${dbPath}. Creando una nueva...`);
} else {
    console.log(`✅ Usando base de datos existente en ${dbPath}`);
}

const db = new sqlite3(dbPath);

export default db;
