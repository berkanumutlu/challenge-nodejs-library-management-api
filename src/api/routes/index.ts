import { Router } from "express";
import userRoutes from "./user.routes";

const router = Router();

router.use('/users', userRoutes);
// ... Route definitions for other endpoints

export default router;