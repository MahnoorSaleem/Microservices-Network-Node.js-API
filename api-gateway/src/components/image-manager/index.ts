import { Router } from "express";

const router = Router();

router.use('/upload', (req, res) => {
    res.json({status: 200})
})

router.use('/delete', (req, res) => {
    res.json({status: 200})
})

export default router;