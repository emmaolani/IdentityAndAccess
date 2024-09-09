import UserAccountProfileApplicationService from "../../../application/identity/userAccountProfile/userAccountProfileApplicationService";
import { Request, Response } from "express";
import NewUserAccountProfileReqObj from "./requestBodyTypes/newUserAccountProfileReqObj.type";
import NewUserAccountProfileCommand from "../../../application/identity/userAccountProfile/newUserAccountProfileCommand";
import UserAccountProfileApplicationServiceError from "../../../application/errorMsg/userAccountProfileApplicationServiceerrorMsg";

class UserAccountProfileController {
  private userAccountProfileApplicationService: UserAccountProfileApplicationService;

  constructor(
    userAccountProfileApplicationService: UserAccountProfileApplicationService
  ) {
    this.userAccountProfileApplicationService =
      userAccountProfileApplicationService;
  }

  async createUserAccountProfile(aRequest: Request, aResponse: Response) {
    const body = aRequest.body as NewUserAccountProfileReqObj;

    if (!this.reqBodyIsOf_type_NewUserAccountProfileReqObj(body)) {
      throw new Error("invalid request body");
    }

    try {
      const newUserAccountProfileCommand = new NewUserAccountProfileCommand(
        body.userAccountId,
        body.userAccountProfileId,
        body.email,
        body.phoneNumber.number,
        body.phoneNumber.countryCode
      );

      await this.userAccountProfileApplicationService.createUserAccountProfile(
        newUserAccountProfileCommand
      );

      aResponse.status(201).send({
        userAccountProfileId: body.userAccountProfileId,
        message: "User account profile created",
      });
    } catch (error) {
      this.errorResponse(aResponse, error as Error);
    }
  }

  private reqBodyIsOf_type_NewUserAccountProfileReqObj(
    obj: NewUserAccountProfileReqObj
  ): obj is NewUserAccountProfileReqObj {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "userAccountProfileId" in obj &&
      typeof obj.userAccountProfileId === "string" &&
      "userAccountId" in obj &&
      typeof obj.userAccountId === "string" &&
      "email" in obj &&
      typeof obj.email === "string" &&
      "phoneNumber" in obj &&
      typeof obj.phoneNumber === "object" &&
      "countryCode" in obj.phoneNumber &&
      typeof obj.phoneNumber.countryCode === "string" &&
      "number" in obj.phoneNumber &&
      typeof obj.phoneNumber.number === "string"
    );
  }

  private errorResponse(aResponse: Response, error: Error) {
    if (
      error.message ===
      UserAccountProfileApplicationServiceError.userAccountAlreadyHasProfile
    ) {
      aResponse.status(409).send({
        message:
          UserAccountProfileApplicationServiceError.userAccountAlreadyHasProfile,
      });
    }
  }
}

export default UserAccountProfileController;
