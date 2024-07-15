import express from "express";

import { Authentication } from "../model/Authentication";
import { Database } from "../model/Database";

import Routerable from "../interfaces/Routerable";

export default class AuthenticationService implements Routerable {
    private authentication: Authentication;

    public constructor(database: Database) {
        this.authentication = new Authentication(database, process.env.JWT_SECRET ?? "secret");
    }

    public register(req: express.Request, res: express.Response): void {
        const { username, password } = req.body;
        this.authentication.register(username, password)
            .then(token => res.json({ token }))
            .catch(err => res.status(400).json({ error: err.message }));
    }

    public login(req: express.Request, res: express.Response): void {
        const { username, password } = req.body;
        this.authentication.login(username, password)
            .then(token => res.json({ token }))
            .catch(err => res.status(400).json({ error: err.message }));
    }

    public verify(req: express.Request, res: express.Response): void {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) { res.status(400).json({ error: "Token not provided" }); return; }
        this.authentication.verify(token)
            .then(user => res.json({ user }))
            .catch(err => res.status(400).json({ error: err.message }));
    }

    public getRouter(): express.Router {
        const router = express.Router();
        router.post("/register", (req, res) => this.register(req, res));
        router.post("/login", (req, res) => this.login(req, res));
        router.get("/verify", (req, res) => this.verify(req, res));
        return router;
    }
}