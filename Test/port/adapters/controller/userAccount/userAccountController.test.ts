import UserAccountController from "../../../../../src/port/adapters/controller/userAccount/userAccountController";
import UserAccountApplicationService from "../../../../../src/application/userAccount/userAccountApplicationService";
import RepositoryFactoryMock from "../../../../application/mock/repositoryFactoryMock";
import { Request, Response } from "express";
import RequestMock from "../mock/requestMock";
import ResponseMock from "../mock/responseMock";
import UserAccount from "../../../../../src/domain/model/userAccount/userAccount";
import NewUserAccountCreated from "../../../../../src/domain/model/userAccount/newUserAccountCreated";
import DomainEvent from "../../../../../src/domain/domainEvent";
import { userAccountErrorMsg } from "../../../../../src/domain/model/userAccount/userAccountErrorMsg";
import EventName from "../../../../../src/domain/eventName";
import {
  TestPrerequisiteRepository,
  prerequisiteObjects,
} from "../../../../application/mock/testPrerequisiteRepository";
import UserAccountRepoErrorMsg from "../../../../../src/port/adapters/persistance/repositoryErrorMsg/userAccountRepoErrorMsg";
import UUIDGenerator from "../../../../../src/port/util/uUIDGenerator";

describe("UserAccountController", () => {
  const repositoryFactory = new RepositoryFactoryMock();
  const userAccountApplicationService = new UserAccountApplicationService(
    repositoryFactory
  );
  const userAccountController = new UserAccountController(
    userAccountApplicationService
  );

  beforeAll(() => {
    const testPrerequisiteRepository =
      repositoryFactory.getTestPrerequisiteRepository();

    testPrerequisiteRepository.savePrerequisiteObjects(
      "authenticationMethod",
      "restriction"
    );
  });

  describe("createUserAccount", () => {
    it("should create and store a new user account with event, and send response with status 201", async () => {
      const request: unknown = new RequestMock({
        userAccountId: new UUIDGenerator().generate(),
        username: "username1",
        password: "SecureP@ss1234",
      });

      const response: unknown = new ResponseMock();

      await userAccountController.createUserAccount(
        request as Required<Request>,
        response as Required<Response>
      );

      const { userAccount, events } = await retrieveUserAccountAndEventStored(
        request as Required<Request>
      );

      assertThatPropertiesIn_userAccount_match(
        userAccount,
        request as Required<Request>
      );
      assertThatPropertiesIn_newUserAccountCreated_match(
        events[0],
        request as Required<Request>
      );

      // asserting that the response was sent with status 201
      expect((response as ResponseMock).getStatus()).toBe(201);
      expect((response as ResponseMock).getResponse()).toEqual({
        userAccountId: (request as RequestMock).body.userAccountId,
        message: "User account created",
      });
    });

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
        userAccountId: TestPrerequisiteRepository.userAccountProperties.id,
        username: TestPrerequisiteRepository.userAccountProperties.username,
        password: TestPrerequisiteRepository.userAccountProperties.password,
      });

      const response: unknown = new ResponseMock();

      add("userAccount");

      await userAccountController.createUserAccount(
        request as Required<Request>,
        response as Required<Response>
      );

      expect((response as ResponseMock).getStatus()).toBe(409);
      expect((response as ResponseMock).getResponse()).toEqual({
        message: UserAccountRepoErrorMsg.conflict,
      });

      remove("userAccount");
    });

    it("should send a status code 500 if UUID for userAccount is invalid", async () => {
      const request: unknown = new RequestMock({
        userAccountId: "invalidUUID",
        username: "username", // this username does not meet requirements
        password: "SecureP@123",
      });

      const response: unknown = new ResponseMock();

      await userAccountController.createUserAccount(
        request as Required<Request>,
        response as Required<Response>
      );

      expect((response as ResponseMock).getStatus()).toBe(500);
      expect((response as ResponseMock).getResponse()).toEqual({
        message: "server error",
      });
    });

    it("should send a status code 400 if the user password does not meet security requirement", async () => {
      const request: unknown = new RequestMock({
        userAccountId: new UUIDGenerator().generate(),
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
        message: userAccountErrorMsg.passwordNotMeetingRequirements,
      });
    });

    it("should send a status code 400 if the user username does not meet requirements", async () => {
      const request: unknown = new RequestMock({
        userAccountId: new UUIDGenerator().generate(),
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
        message: userAccountErrorMsg.userNameNotMeetingRequirements,
      });
    });

    it("should respond with a 500 error if password authenticationMethod not found in db", async () => {
      const request: unknown = new RequestMock({
        userAccountId: new UUIDGenerator().generate(),
        username: "username",
        password: "SecureP@ss1234",
      });
      const response: unknown = new ResponseMock();

      remove("authenticationMethod");

      await userAccountController.createUserAccount(
        request as Required<Request>,
        response as Required<Response>
      );

      expect((response as ResponseMock).getStatus()).toBe(500);
      expect((response as ResponseMock).getResponse()).toEqual({
        message: "server error",
      });

      add("authenticationMethod");
    });

    it("should respond with a 500 error if password restriction not found in db", async () => {
      const request: unknown = new RequestMock({
        userAccountId: new UUIDGenerator().generate(),
        username: "username",
        password: "SecureP@ss1234",
      });
      const response: unknown = new ResponseMock();

      remove("restriction");

      await userAccountController.createUserAccount(
        request as Required<Request>,
        response as Required<Response>
      );

      expect((response as ResponseMock).getStatus()).toBe(500);
      expect((response as ResponseMock).getResponse()).toEqual({
        message: "server error",
      });

      add("restriction");
    });

    async function retrieveUserAccountAndEventStored(aRequest: Request) {
      const repositories = repositoryFactory.getRepositories(
        "UserAccountRepository",
        "EventStore"
      );

      const userAccount = await repositories.UserAccountRepository.getById(
        aRequest.body.userAccountId
      );
      const events = (await repositories.EventStore.getAllEventWithName(
        EventName.NewUserAccountCreated
      )) as NewUserAccountCreated[];

      return { userAccount, events };
    }

    function assertThatPropertiesIn_userAccount_match(
      userAccount: UserAccount,
      aRequest: Request
    ) {
      expect(userAccount).toBeInstanceOf(UserAccount);
      expect(userAccount["id"]["id"]).toBe(aRequest.body.userAccountId);
      expect(userAccount["username"]["value"]).toBe(aRequest.body.username);
      expect(userAccount["password"]["value"]).toBe(aRequest.body.password);
      expect(userAccount["authenticationMethodId"]["id"]).toBe(
        TestPrerequisiteRepository.authenticationMethodProperties.id
      );
      expect(userAccount["restrictionId"]["id"]).toBe(
        TestPrerequisiteRepository.restrictionProperties.id
      );
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

    function add(anObjectName: prerequisiteObjects) {
      const testPrerequisiteRepository =
        repositoryFactory.getTestPrerequisiteRepository();
      testPrerequisiteRepository.savePrerequisiteObjects(anObjectName);
    }

    function remove(anObjectName: prerequisiteObjects) {
      const testPrerequisiteRepository =
        repositoryFactory.getTestPrerequisiteRepository();

      testPrerequisiteRepository.removePrerequisiteObjects(anObjectName);
    }
  });
});
