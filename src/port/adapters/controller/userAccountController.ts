import { Request, Response } from "express";
import UserAccountApplicationService from "../../../application/userAccount/userAccountService";
import NewUserAccountCommand from "../../../application/userAccount/newUserAccountCommand";
import NewPersonalInfoCommand from "../../../application/userAccount/newPersonalInfoCommand";

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
