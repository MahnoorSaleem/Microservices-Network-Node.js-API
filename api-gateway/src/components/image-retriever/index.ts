import { Router } from "express";

const router = Router();

router.use('/retrieve', (req, res) => {
    res.json({status: 200})
})

export default router;
