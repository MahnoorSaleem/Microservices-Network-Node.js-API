import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { getImageById, getImageMetadata } from "./imageRetriever";
import { validateRetriveImageDataRequest } from "./validation/validate-image-request";

const router = Router();

router.get('/retrieve/image/meta/:id', validateRetriveImageDataRequest, validateRequest, getImageMetadata);

router.get('/retrieve/image/:id', validateRetriveImageDataRequest, validateRequest, getImageById)

export default router;
