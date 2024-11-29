import { Router } from "express";
import userRoutes from "./user.routes";
import bookRoutes from "./book.routes";

const router = Router();

router.use('/users', userRoutes);
router.use('/books', bookRoutes);
// ... Route definitions for other endpoints

// Route not found definition
router.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `The route ${req.method} ${req.originalUrl} does not exist.`,
        error: 'Page Not Found'
    });
});

export default router;