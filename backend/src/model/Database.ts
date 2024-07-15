import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';

export class Database {
  private DB_FILE: string;

  private open() {
    return open({
      filename: this.DB_FILE,
      driver: sqlite3.Database
    });
  }

  private async setupTables() {
    const db = await this.open();
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      )
    `);
  }

  public constructor(dbFile: string) {
    this.DB_FILE = dbFile;
    if (!fs.existsSync(this.DB_FILE)) { this.setupTables(); }
  }

  public async run(query: string, params: any[] = []) {
    const db = await this.open();
    return db.run(query, params);
  }

  public async get(query: string, params: any[] = []) {
    const db = await this.open();
    return db.get(query, params);
  }
}