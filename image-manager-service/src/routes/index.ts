import { Router } from "express";
import upload from "../middlewares/multerConfig";
import { uploadImage } from "../components/upload/imageUpload";
import { validateRequest } from "../middlewares/validateRequest";
import { uploadValidations } from "../components/upload/uploadValidation";

const router = Router();

router.post('/upload', upload.single('image'), uploadValidations, validateRequest, uploadImage);

export default router;
