import { Router } from "express";
import { errorHandler } from "../error-handler";
import { createProduct } from "../controllers/products";

const productsRouter:Router = Router();

productsRouter.post('/', errorHandler(createProduct));

export default productsRouter;