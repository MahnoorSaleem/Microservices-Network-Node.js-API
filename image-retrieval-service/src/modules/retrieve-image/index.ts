import { Router } from "express";

import retrieve from "./handlers/retrieve-image.handler";

const router = Router();

router.use('/image', retrieve);

export default Router;

