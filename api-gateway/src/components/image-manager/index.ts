import { Router } from "express";
import { deleteImage, modifyImage, uploadImage } from "./imageManager";
import upload from "../../middlewares/multer";
import { validateRequest } from "../../middlewares/validateRequest";
import { imageUploadValidation } from "./validation/validate-upload-request";
import { validateDeleteImageRequest } from "./validation/validate-delete-request";
import { validatePatchImageRequest } from "./validation/validate-update-request";

const router = Router();

router.post('/image/upload', upload.single('image'), imageUploadValidation, validateRequest, uploadImage);

router.patch('/image/delete/:id', validateRequest, modifyImage)

router.delete('/image/modify/:id', validatePatchImageRequest, validateDeleteImageRequest, validateRequest, deleteImage)


export default router;