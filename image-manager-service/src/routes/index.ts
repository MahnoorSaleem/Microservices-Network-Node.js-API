import { Router } from "express";
import upload from "../middlewares/multerConfig";
import { uploadImage } from "../components/upload/imageUpload";
import { validateRequest } from "../middlewares/validateRequest";
import { uploadValidations } from "../components/upload/uploadValidation";
import { validateDeleteImageRequest } from "../components/delete/deleteValidation";
import { deleteImage } from "../components/delete/imageDelete";
import UpdateRoute from '../components/modify/index';

const router = Router();

router.post('/upload', upload.single('image'), uploadValidations, validateRequest, uploadImage);
router.delete('/image/:id', validateDeleteImageRequest, validateRequest, deleteImage);
router.use('/image', UpdateRoute);

export default router;
