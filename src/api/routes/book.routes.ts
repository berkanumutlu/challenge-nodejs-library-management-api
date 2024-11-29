import { Router } from "express";
import { createBookSchema, getBookSchema } from "@/types/validations/book.validation";
import { validateRequest } from "@/middlewares/routeHandler";
import { BookController } from "@/controllers/book.controller";

const router = Router();
const bookController = new BookController();

router.get('/', bookController.listBooks);
router.get('/:id', validateRequest(getBookSchema), bookController.getBookById);
router.post('/', validateRequest(createBookSchema), bookController.createBook);

export default router;