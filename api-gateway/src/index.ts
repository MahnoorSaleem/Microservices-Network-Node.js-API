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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})