import { Request, Response, Router } from "express";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello world!' });
});
// ... Route definitions for other endpoints

export default router;