import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import imageManager from './components/image-manager';
import imageRetriever from './components/image-retriever';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use('/api', imageManager, imageRetriever);
// app.use('/api/retrieve', imageRetriever);

app.get("/", (req: Request, res: Response)=> {
	res.send('Server running');
})

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
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