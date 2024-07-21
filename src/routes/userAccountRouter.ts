import { Router } from "express";
import { getUsers } from "../port/adapters/restControllerAdapter/userAccountController";

const userAccountRouter : Router = Router();

userAccountRouter.get('./', getUsers)

export default userAccountRouter;