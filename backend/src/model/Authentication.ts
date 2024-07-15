import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Database } from "./Database";

export class Authentication {
    private JWT_SECRET: string;
    private database: Database;

    public constructor(database: Database, jwtSecret: string) {
        this.database = database;
        this.JWT_SECRET = jwtSecret;
    }

    public async register(username: string, password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.database.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        return this.login(username, password);
    }

    public async login(username: string, password: string): Promise<string> {
        const user = await this.database.get('SELECT * FROM users WHERE username = ?', [username]);
        if (!user) { throw new Error('User not found'); }
        if (!await bcrypt.compare(password, user.password)) { throw new Error('Invalid password'); }
        return jwt.sign({ id: user.id, username: user.username }, this.JWT_SECRET);
    }

    public async verify(token: string): Promise<{ id: number, username: string }> {
        return jwt.verify(token, this.JWT_SECRET) as { id: number, username: string };
    }
}
