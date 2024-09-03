import { Request, Response } from "express";
import UserAccountApplicationService from "../../../application/identity/userAccountApplicationService";
import NewUserAccountCommand from "../../../application/identity/newUserAccountCommand";
import ReqObjForCreatingUserAccount from "../../types/requestBody.types";
import {
  userNamesError,
  passwordError,
  userAccountIdError,
} from "../../../domain/enum/errors/errorMsg";

class UserAccountController {
  private userAccountApplicationService: UserAccountApplicationService;

  constructor(aUserAccountApplicationService: UserAccountApplicationService) {
    this.userAccountApplicationService = aUserAccountApplicationService;
  }

  createUserAccount(request: Request, response: Response) {
    try {
      if (!this.resObjIsOf_type_ReqObjForCreatingUserAccount(request.body)) {
        throw new Error("invalid request body");
      } // check if request body is of type ReqObjForCreatingUserAccount

      const data: ReqObjForCreatingUserAccount = request.body;

      const newUserAccountCommand = new NewUserAccountCommand(
        data.userAccountId,
        data.username,
        data.password
      );

      this.userAccountApplicationService.createUserAccount(
        newUserAccountCommand
      );

      response.status(201).send({
        userAccountId: data.userAccountId,
        message: "User account created",
      });
    } catch (error) {
      this.errorResponse(response, error as Error);
    }
  }

  private resObjIsOf_type_ReqObjForCreatingUserAccount(
    obj: any
  ): obj is ReqObjForCreatingUserAccount {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "userAccountId" in obj &&
      typeof obj.userAccountId === "string" &&
      "username" in obj &&
      typeof obj.username === "string" &&
      "password" in obj &&
      typeof obj.password === "string"
    );
  }

  private errorResponse(response: Response, error: Error) {
    if (error.message === "invalid request body") {
      response.status(400).send({ message: "invalid request body" });
    } else if (error.message === "User account already exists") {
      response.status(409).send({ message: "user account exists" });
      return;
    } else if (
      error.message === userNamesError.userNameNotMeetingRequirements
    ) {
      response
        .status(400)
        .send({ message: userNamesError.userNameNotMeetingRequirements });
      return;
    } else if (error.message === passwordError.passwordNotMeetingRequirements) {
      response
        .status(400)
        .send({ message: passwordError.passwordNotMeetingRequirements });
      return;
    }
  }
}

export default UserAccountController;
