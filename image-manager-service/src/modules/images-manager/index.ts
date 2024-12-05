import { Router } from "express";

import imageshandler from '../images-manager'

const router = Router();

router.use('/image', imageshandler);

// router.use('/image', UpdateRoute);

export default router;
