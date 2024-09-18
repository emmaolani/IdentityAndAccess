import UserAccountProfileApplicationService from "../../../../../application/userAccount/userAccountProfile/userAccountProfileApplicationService";
import { Request, Response } from "express";
import NewUserAccountProfileReqObj from "./newUserAccountProfileReqObj.type";
import NewUserAccountProfileCommand from "../../../../../application/userAccount/userAccountProfile/newUserAccountProfileCommand";
import userAccountProfileRepoError from "../../../persistance/repositoryErrorMsg/userAccountProfileRepoErrorMsg";
import { ITUAndISOSpecRepoErrorMsg } from "../../../persistance/repositoryErrorMsg/iTuAndISOSpecRepoErrorMsg";
import { contactDetailErrorMsg } from "../../../../../domain/model/contactDetails/contactDetailErrorMsg";
import { userAccountErrorMsg } from "../../../../../domain/model/userAccount/userAccountErrorMsg";
import { UserAccountProfileErrorMsg } from "../../../../../domain/model/userAccount/userAccountProfile/userAccountProfileErrorMsg";
import UserAccountRepoErrorMsg from "../../../persistance/repositoryErrorMsg/userAccountRepoErrorMsg";

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

    try {
      if (!this.reqBodyIsOf_type_NewUserAccountProfileReqObj(body)) {
        throw new Error("Invalid request body");
      }

      const newUserAccountProfileCommand = new NewUserAccountProfileCommand(
        body.userAccountProfileId,
        body.userAccountId,
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
    if (error.message === "Invalid request body") {
      aResponse.status(400).send({ message: "Invalid request body" });
    } else if (
      error.message ===
      userAccountProfileRepoError.userAccountProfileAlreadyExist
    ) {
      aResponse.status(409).send({
        message: userAccountProfileRepoError.userAccountProfileAlreadyExist,
      });
    } else if (
      error.message === ITUAndISOSpecRepoErrorMsg.ITUAndISOSpecNotFound
    ) {
      aResponse.status(404).send({
        message: ITUAndISOSpecRepoErrorMsg.ITUAndISOSpecNotFound,
      });
    } else if (error.message === contactDetailErrorMsg.invalidPhoneNumber) {
      aResponse.status(400).send({
        message: contactDetailErrorMsg.invalidPhoneNumber,
      });
    } else if (error.message === contactDetailErrorMsg.invalidEmail) {
      aResponse.status(400).send({
        message: contactDetailErrorMsg.invalidEmail,
      });
    } else if (error.message === UserAccountRepoErrorMsg.UserAccountNotFound) {
      aResponse.status(500).send({ message: "server error" });
    } else if (error.message === userAccountErrorMsg.invalidUUID) {
      aResponse.status(500).send({
        message: "server error",
      });
    } else if (error.message === UserAccountProfileErrorMsg.invalidUUID) {
      aResponse.status(500).send({
        message: "server error",
      });
    }
  }
}

export default UserAccountProfileController;
