// import * as SQLite from "expo-sqlite";
// import * as FileSystem from "expo-file-system/legacy";

// let db: SQLite.SQLiteDatabase | undefined;

// export async function getDB(): Promise<SQLite.SQLiteDatabase> {
//   try {
//     if (!db) {
//       db = SQLite.openDatabaseSync("app.db");
//       await db.execAsync(`PRAGMA foreign_keys = ON`);
//     }
//     return db;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Erro getDb: ");
//   }
// }

// export async function resetDatabase() {
//   try {
//     await SQLite.deleteDatabaseAsync("app.db");
//     console.log("🗑️ Banco deletado");
//   } catch (error) {
//     console.error(error);
//   }
// }

// export async function initDB(): Promise<void> {
//   try {
//     await getDB();
//     if (db)
//       db.execSync(`CREATE TABLE IF NOT EXISTS categorias (
//        Id INTEGER PRIMARY KEY AUTOINCREMENT, 
//        Nome TEXT NOT NULL
//        );
       
//        CREATE TABLE IF NOT EXISTS produtos (
//        Id INTEGER PRIMARY KEY AUTOINCREMENT,
//        CategoriaId INTEGER,
//        Nome TEXT NOT NULL,
//        Valor REAL,
//        DataCad TEXT DEFAULT CURRENT_TIMESTAMP,
//        FOREIGN KEY (CategoriaId) REFERENCES categorias(Id) ON DELETE RESTRICT);
//        `);
//        console.log('✅ Banco de dados inicializado')
//   } catch (error) {
//     console.error("  Erro ao criar tabela");
    
//   }
// }
