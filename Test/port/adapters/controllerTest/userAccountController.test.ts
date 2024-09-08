import UserAccountController from "../../../../src/port/adapters/controller/userAccountController";
import UserAccountApplicationService from "../../../../src/application/identity/userAccountApplicationService";
import RepositoryFactoryMock from "../../../applicationServiceTest/mock/repositoryFactoryMock";
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
import EventName from "../../../../src/domain/enum/event/eventName";
import UserAccountId from "../../../../src/domain/model/identity/userAccount/userAccountId";
import UserName from "../../../../src/domain/model/identity/userAccount/userName";
import Password from "../../../../src/domain/model/identity/userAccount/password";

// TODO: write test for catching error when UUID is not valid
describe("UserAccountController", () => {
  const repositoryFactory = new RepositoryFactoryMock();
  const userAccountApplicationService = new UserAccountApplicationService(
    repositoryFactory
  );
  const userAccountController = new UserAccountController(
    userAccountApplicationService
  );

  describe("createUserAccount", () => {
    it("should create a new user account and send response with status 201", async () => {
      const request: unknown = new RequestMock({
        userAccountId: "54b8a43c-a882-42ac-b60b-087f079a8710",
        username: "username",
        password: "SecureP@ss1234",
      });
      const response: unknown = new ResponseMock();

      await userAccountController.createUserAccount(
        request as Required<Request>,
        response as Required<Response>
      );

      const { userAccount, event } = await retrieveUserAccountAndEventStored(
        request as Required<Request>
      );

      assertThatPropertiesIn_userAccount_match(
        userAccount,
        request as Required<Request>
      );
      assertThatPropertiesIn_newUserAccountCreated_match(
        event[0],
        request as Required<Request>
      );

      // asserting that the response was sent with status 201
      expect((response as ResponseMock).getStatus()).toBe(201);
      expect((response as ResponseMock).getResponse()).toEqual({
        userAccountId: "54b8a43c-a882-42ac-b60b-087f079a8710",
        message: "User account created",
      });
    });

    async function retrieveUserAccountAndEventStored(aRequest: Request) {
      const repositories = repositoryFactory.getRepositories(
        "UserAccountRepository",
        "EventStore"
      );

      const userAccount = await repositories.UserAccountRepository.getById(
        aRequest.body.userAccountId
      );
      const event = (await repositories.EventStore.getAllEventWithName(
        EventName.NewUserAccountCreated
      )) as NewUserAccountCreated[];

      return { userAccount, event };
    }

    function assertThatPropertiesIn_userAccount_match(
      userAccount: UserAccount,
      aRequest: Request
    ) {
      expect(userAccount).toBeInstanceOf(UserAccount);
      expect(userAccount["id"]["id"]).toBe(aRequest.body.userAccountId);
      expect(userAccount["username"]["value"]).toBe(aRequest.body.username);
      expect(userAccount["password"]["value"]).toBe(aRequest.body.password);
    }

    function assertThatPropertiesIn_newUserAccountCreated_match(
      event: DomainEvent,
      aRequest: Request
    ) {
      expect(event).toBeInstanceOf(NewUserAccountCreated);

      if (event instanceof NewUserAccountCreated) {
        expect(event["userAccountId"]).toBe(aRequest.body.userAccountId);
        expect(event["userName"]).toBe(aRequest.body.username);
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
      const request: unknown = new RequestMock({
        userAccountId: "54b8a43c-a882-42ac-b60b-087f079a8710",
        username: "username",
        password: "SecureP@ss123",
      });

      const response: unknown = new ResponseMock();

      await storeUserAccountInDB(request as Required<Request>);

      await userAccountController.createUserAccount(
        request as Required<Request>,
        response as Required<Response>
      );

      expect((response as ResponseMock).getStatus()).toBe(409);
      expect((response as ResponseMock).getResponse()).toEqual({
        message: "user account exists",
      });

      await removeUserAccountInDB(request as Required<Request>);
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

    async function storeUserAccountInDB(aRequest: Request) {
      const repositories = repositoryFactory.getRepositories(
        "UserAccountRepository"
      );

      await repositories.UserAccountRepository.save(
        new UserAccount(
          new UserAccountId(aRequest.body.userAccountId as string),
          new UserName(aRequest.body.username as string),
          new Password(aRequest.body.password as string)
        )
      );
    }

    async function removeUserAccountInDB(aRequest: Request) {
      const repositories = repositoryFactory.getRepositories(
        "UserAccountRepository"
      );

      await repositories.UserAccountRepository.remove(aRequest.body.username);
    }
  });
});
