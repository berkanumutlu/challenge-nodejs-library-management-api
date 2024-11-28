import { Router } from "express";
import { createUserSchema } from "@/types/validations/user.validation";
import { validateRequest } from "@/middlewares/validateRequest";
import { UserController } from "@/controllers/user.controller";

const router = Router();
const userController = new UserController();

router.get('/', userController.listUsers);
router.get('/:id', userController.getUserById);
router.post('/', validateRequest(createUserSchema), userController.createUser);

export default router;