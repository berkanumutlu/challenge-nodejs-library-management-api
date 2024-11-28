import { Router } from "express";
import { CustomRequest, CustomResponse } from "@/types/request";

const router = Router();

// router.use('/users', userRoutes);
router.get('/', (req, res) => {
    res.json({ message: 'Hello world!' });
});
router.get('/hello', (req: CustomRequest, res: CustomResponse) => {
    res.success({ user: "John Doe" }, "User fetched successfully");
});
// ... Route definitions for other endpoints

export default router;