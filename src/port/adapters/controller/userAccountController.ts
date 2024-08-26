import { Request, Response } from "express";
import UserAccountApplicationService from "../../../application/identity/userAccount/userAccountApplicationService";
import NewUserAccountCommand from "../../../application/identity/userAccount/newUserAccountCommand";
import ReqObjForCreatingUserAccount from "../../types/requestBody.types";

// TODO: implement ID generation
class UserAccountController {
  private userAccountApplicationService: UserAccountApplicationService;

  constructor(aUserAccountApplicationService: UserAccountApplicationService) {
    this.userAccountApplicationService = aUserAccountApplicationService;
  }

  createUserAccount(request: Request, response: Response) {
    try {
      if (!this.ObjIsOf_type_ReqObjForCreatingUserAccount(request.body)) {
        throw new Error("invalid request body");
      } // check if request body is of type ReqObjForCreatingUserAccount

      const data: ReqObjForCreatingUserAccount = request.body;

      const newUserAccountCommand = new NewUserAccountCommand(
        "id",
        data.username,
        data.password
      );

      this.userAccountApplicationService.createUserAccount(
        newUserAccountCommand
      );

      response.status(201).send({ message: "User account created" });
    } catch (error) {
      if ((error as Error).message === "invalid request body") {
        response.status(400).send({ message: "invalid request body" });
      } else if ((error as Error).message === "User account already exists") {
        response.status(409).send({ message: "user account exists" });
        return;
      } else if (
        (error as Error).message ===
        "password does not meet security requirements"
      ) {
        response
          .status(400)
          .send({ message: "password does not meet security requirements" });
        return;
      }
    }
  }

  private ObjIsOf_type_ReqObjForCreatingUserAccount(
    obj: any
  ): obj is ReqObjForCreatingUserAccount {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "username" in obj &&
      typeof obj.username === "string" &&
      "password" in obj &&
      typeof obj.password === "string"
    );
  }
}

export default UserAccountController;
