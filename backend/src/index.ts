import express from 'express';
import bodyParser from 'body-parser';
import { Database } from './model/Database';
import AuthenticationService from './services/AuthenticationService';
import CsaService from './services/CsaService';
import cors from 'cors';

const database: Database = new Database("data/database.db");
const authenticationService: AuthenticationService = new AuthenticationService(database);
const csaService: CsaService = new CsaService();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/auth', authenticationService.getRouter());
app.use('/csa', csaService.getRouter());

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT} : http://localhost:${PORT}`);
});