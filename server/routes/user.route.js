import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserData,
} from "../controllers/user.controller.js";
import userAuth from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/permission.middleware.js";

const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);
userRouter.get(
  "/all-users",
  userAuth,
  authorizeRoles("ADMIN", "MANAGER"),
  getAllUsers
);
userRouter.delete("/:id", userAuth, authorizeRoles("ADMIN"), deleteUser);

export default userRouter;
