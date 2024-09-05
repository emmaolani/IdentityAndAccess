import UserAccountController from "../../../../src/port/adapters/controller/userAccountController";
import UserAccountApplicationService from "../../../../src/application/identity/userAccountApplicationService";
import RepositoryFactoryMock from "../../../applicationServiceTest/mock/repositoryFactoryMock";
import UserAccountRepositoryMock from "../../../applicationServiceTest/mock/userAccountRepositoryMock";
import EventStoreMock from "../../../applicationServiceTest/mock/eventStoreMock";
import { Request, Response } from "express";
import RequestMock from "./mock/requestMock";
import ResponseMock from "./mock/responseMock";
import UserAccount from "../../../../src/domain/model/identity/userAccount/userAccount";
import NewUserAccountCreated from "../../../../src/domain/model/identity/userAccount/newUserAccountCreated";
import DomainEvent from "../../../../src/domain/domainEvent";
import {
  passwordError,
  userNamesError,
} from "../../../../src/domain/enum/errorMsg/userAccountErrorMsg";

// TODO: write test for catching error when UUID is not valid
describe("UserAccountController", () => {
  const repositoryFactory = new RepositoryFactoryMock();
  const userAccountApplicationService = new UserAccountApplicationService(
    repositoryFactory
  );
  const userAccountController = new UserAccountController(
    userAccountApplicationService
  );

  let userAccount: UserAccount;
  let event: DomainEvent;

  beforeEach(() => {
    repositoryFactory.reset();
  });

  describe("createUserAccount", () => {
    it("should create a new user account and send response with status 201", async () => {
      const username: string = "tester20";
      const password: string = "SecureP@ss1234";

      const request: unknown = new RequestMock({
        userAccountId: "54b8a43c-a882-42ac-b60b-087f079a8710",
        username: username,
        password: password,
      });
      const response: unknown = new ResponseMock();

      await userAccountController.createUserAccount(
        request as Required<Request>,
        response as Required<Response>
      );

      // retrieving all repos used after calling userAccountController.createUserAccount()
      const repositories = repositoryFactory.getRepositoriesUsed();

      const userAccountRepository =
        repositories?.UserAccountRepository as UserAccountRepositoryMock;
      const eventStore = repositories?.EventStore as EventStoreMock;

      userAccount = userAccountRepository.getNewlyCreatedUserAccount();
      event = eventStore.getAllStoredEvents();

      // asserting that the user account was created and the event was stored
      assertThatPropertiesIn_userAccount_match(username, password);
      assertThatPropertiesIn_newUserAccountCreated_match(username);

      // asserting that the response was sent with status 201
      expect((response as ResponseMock).getStatus()).toBe(201);
      expect((response as ResponseMock).getResponse()).toEqual({
        userAccountId: "54b8a43c-a882-42ac-b60b-087f079a8710",
        message: "User account created",
      });
    });

    function assertThatPropertiesIn_userAccount_match(
      username: string,
      password: string
    ) {
      expect(userAccount).toBeInstanceOf(UserAccount);
      expect(userAccount["username"]["value"]).toBe(username);
      expect(userAccount["password"]["value"]).toBe(password);
    }

    function assertThatPropertiesIn_newUserAccountCreated_match(
      username: string
    ) {
      expect(event).toBeInstanceOf(NewUserAccountCreated);
      if (event instanceof NewUserAccountCreated) {
        expect(event["userName"]).toBe(username);
      }
    }

    it("should send response with status 400 if request body is invalid", async () => {
      const request: unknown = new RequestMock({}); // invalid request body
      const response: unknown = new ResponseMock();

      await userAccountController.createUserAccount(
        request as Required<Request>,
        response as Required<Response>
      );

      expect((response as ResponseMock).getStatus()).toBe(400);
      expect((response as ResponseMock).getResponse()).toEqual({
        message: "invalid request body",
      });
    });

    it("should send 409 if there is conflict with username", async () => {
      repositoryFactory.setPresetOptionForUserAccountRepo(true); // username already exists

      const request: unknown = new RequestMock({
        userAccountId: "54b8a43c-a882-42ac-b60b-087f079a8710",
        username: "username",
        password: "SecureP@ss123",
      });

      const response: unknown = new ResponseMock();

      await userAccountController.createUserAccount(
        request as Required<Request>,
        response as Required<Response>
      );

      expect((response as ResponseMock).getStatus()).toBe(409);
      expect((response as ResponseMock).getResponse()).toEqual({
        message: "user account exists",
      });
    });

    it("should send a status code 400 if the user password does not meet security requirement", async () => {
      const request: unknown = new RequestMock({
        userAccountId: "54b8a43c-a882-42ac-b60b-087f079a8710",
        username: "username",
        password: "password", // this password does not meet requirements
      });

      const response: unknown = new ResponseMock();

      await userAccountController.createUserAccount(
        request as Required<Request>,
        response as Required<Response>
      );

      expect((response as ResponseMock).getStatus()).toBe(400);
      expect((response as ResponseMock).getResponse()).toEqual({
        message: passwordError.passwordNotMeetingRequirements,
      });
    });

    it("should send a status code 400 if the user username does not meet requirements", async () => {
      const request: unknown = new RequestMock({
        userAccountId: "54b8a43c-a882-42ac-b60b-087f079a8710",
        username: "user+n-ame", // this username does not meet requirements
        password: "SecureP@123",
      });
      const response: unknown = new ResponseMock();

      await userAccountController.createUserAccount(
        request as Required<Request>,
        response as Required<Response>
      );

      expect((response as ResponseMock).getStatus()).toBe(400);
      expect((response as ResponseMock).getResponse()).toEqual({
        message: userNamesError.userNameNotMeetingRequirements,
      });
    });
  });
});
