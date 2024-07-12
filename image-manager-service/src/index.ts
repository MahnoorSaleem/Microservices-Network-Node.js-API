import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser'
import routes from "./routes";
import { logger } from "./logger/logger";
import connectDB from "./config/database";


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 7002;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use((req: Request, res: Response, next: NextFunction) => {
	logger.info(`${req.method} ${req.url}`);
	next();
});

app.use('/v1', routes);

let server: any;

connectDB().then(() => {
	server = app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
	});
});
process.on("uncaughtException", (err) => {
	console.error('Uncaught Exception:', err);
	process.exit(1); // Exit the process with a failure code
});

// Handle SIGTERM
process.on("SIGTERM", () => {
	console.log('SIGTERM signal received: closing HTTP server');
	server.close(() => {
			console.log('HTTP server closed');
			process.exit(0); // Exit the process cleanly
	});
});