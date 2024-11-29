import { Router } from "express";
import { createUserSchema } from "@/types/validations/user.validation";
import { borrowBookSchema, returnBookSchema } from "@/types/validations/borrowBook.validation";
import { validateRequest } from "@/middlewares/routeHandler";
import { UserController } from "@/controllers/user.controller";
import { BorrowedBookController } from "@/controllers/borrowedBook.controller";

const router = Router();
const userController = new UserController();
const borrowedBookController = new BorrowedBookController();

router.get('/', userController.listUsers);
router.get('/:id', userController.getUserById);
router.post('/', validateRequest(createUserSchema), userController.createUser);
router.post('/:userId/borrow/:bookId', validateRequest(borrowBookSchema), borrowedBookController.borrowBook);
router.post('/:userId/return/:bookId', validateRequest(returnBookSchema), borrowedBookController.returnBook);

export default router;