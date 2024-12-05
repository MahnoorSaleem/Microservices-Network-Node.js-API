import { Router } from "express";
import { validateRequest } from "../validators/validateRequest";
import { uploadValidations, validateDeleteImageRequest, validatePatchImageRequest } from "../validators/image-validator";
import { deleteImage } from "../services/image-delete.service";
import upload from "../../../middlewares/multerConfig";
import { uploadImage } from "../services/image-upload.service";
import { UpdateImage } from "../services/modify-metadata.service";

const router = Router();

router.post('/upload', upload.single('image'), uploadValidations, validateRequest, uploadImage);

router.delete('/image/:id', validateDeleteImageRequest, validateRequest, deleteImage);

router.patch('/:id', validatePatchImageRequest, validateRequest, UpdateImage)

export default router;
