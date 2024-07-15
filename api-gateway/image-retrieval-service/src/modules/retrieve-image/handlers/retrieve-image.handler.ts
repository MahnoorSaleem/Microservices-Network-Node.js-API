import { Router } from "express";
import { validateImageRequest } from "../validators/retrieve-image.validators";
import { validateRequest } from "../validators/validate-request";
import { getImages, getMetadata } from "../service/retrieve-image.service";

const router = Router();

router.get('/meta/:id',  validateImageRequest, validateRequest, getMetadata);

router.get('/:id', validateImageRequest, validateRequest, getImages);

export default router;
