import { Router } from "express";
import { validatePatchImageRequest } from "./modifyImageValidate";
import { validateRequest } from "../../middlewares/validateRequest";
import { UpdateImage } from "./modifyMetadata";

const router = Router();

router.patch('/:id', validatePatchImageRequest, validateRequest, UpdateImage)

export default router;