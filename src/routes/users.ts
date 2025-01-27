import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../error-handler";
import { addAdress, deleteAdress, listAdress } from "../controllers/users";

const usersRouter:Router = Router();

usersRouter.post('/address', [authMiddleware, adminMiddleware], errorHandler(addAdress));
usersRouter.delete('/address/:id', [authMiddleware, adminMiddleware], errorHandler(deleteAdress));
usersRouter.get('/address', [authMiddleware, adminMiddleware], errorHandler(listAdress));

export default usersRouter;