import { Router } from "express";
import itemsControllers from "../../controllers/items/items.controller";

const itemsRoutes = Router();

itemsRoutes.post("/", itemsControllers.createItem);
itemsRoutes.get("/", itemsControllers.getAllItems);
itemsRoutes.get("/:id", itemsControllers.getItem);
itemsRoutes.put("/:id", itemsControllers.updateItem);
itemsRoutes.delete("/:id", itemsControllers.deleteItem);

export default itemsRoutes;
