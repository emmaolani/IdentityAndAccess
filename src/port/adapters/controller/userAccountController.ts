import { Request, Response } from "express";
import UserAccountApplicationService from "../../../application/identity/userAccount/userAccountApplicationService";
import NewUserAccountCommand from "../../../application/identity/userAccount/newUserAccountCommand";
import NewPersonalInfoCommand from "../../../application/personalInfo/newPersonalInfoCommand";

class UserAccountController {
  private userAccountApplicationService: UserAccountApplicationService;

  constructor(aUserAccountApplicationService: UserAccountApplicationService) {
    this.userAccountApplicationService = aUserAccountApplicationService;
  }

  createUserAccount(request: Request, response: Response) {
    response.send([]);
  }
}

export default UserAccountController;
