import sqlite3 from 'better-sqlite3';
import { join } from 'path';
import { existsSync, copyFileSync } from 'fs';

const originalDbPath = join(process.cwd(), 'partesdiarios.sqlite');
const dbPath = '/tmp/partesdiarios.sqlite';

// Si no existe en /tmp, cópiala desde la raíz del proyecto
if (!existsSync(dbPath)) {
    console.log(`📦 Copiando base de datos a ${dbPath}`);
    copyFileSync(originalDbPath, dbPath);
} else {
    console.log(`✅ Usando base de datos temporal en ${dbPath}`);
}

const db = new sqlite3(dbPath);

export default db;
