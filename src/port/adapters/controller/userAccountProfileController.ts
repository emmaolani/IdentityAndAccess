import UserAccountProfileApplicationService from "../../../application/identity/userAccountProfile/userAccountProfileApplicationService";
import { Request, Response } from "express";
import NewUserAccountProfileReqObj from "./requestBodyTypes/newUserAccountProfileReqObj.type";
import NewUserAccountProfileCommand from "../../../application/identity/userAccountProfile/newUserAccountProfileCommand";
import userAccountProfileRepoError from "../../_enums/errorMsg/repositoryErrorMsg/userAccountProfileRepoErrorMsg";
import { ITUAndISOSpecRepoErrorMsg } from "../../_enums/errorMsg/repositoryErrorMsg/iTuAndISOSpecRepoErrorMsg";
import {
  emailAddressError,
  phoneNumberError,
} from "../../../domain/enum/errorMsg/contactDetailErrorMsg";
import { userAccountIdError } from "../../../domain/enum/errorMsg/userAccountErrorMsg";
import { UserAccountProfileIdError } from "../../../domain/enum/errorMsg/userAccountProfileErrorMsg";

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
    } else if (error.message === phoneNumberError.invalidPhoneNumber) {
      aResponse.status(400).send({
        message: phoneNumberError.invalidPhoneNumber,
      });
    } else if (error.message === emailAddressError.invalidEmail) {
      aResponse.status(400).send({
        message: emailAddressError.invalidEmail,
      });
    } else if (error.message === userAccountIdError.invalidUUID) {
      aResponse.status(500).send({
        message: userAccountIdError.invalidUUID,
      });
    } else if (error.message === UserAccountProfileIdError.invalidUUID) {
      aResponse.status(500).send({
        message: UserAccountProfileIdError.invalidUUID,
      });
    }
  }
}

export default UserAccountProfileController;
