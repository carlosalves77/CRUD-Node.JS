import { Router } from "express";

import UserController from "./controllers/UserController";

const router = Router();

router.post("/user", UserController.CreateUser);
router.get("/users", UserController.findAllUser);
router.get("/user/:id", UserController.findUser);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

export { router };
