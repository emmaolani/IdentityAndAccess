import UserAccountController from "../../../../src/port/adapters/controller/userAccountController";
import UserAccountApplicationService from "../../../../src/application/identity/userAccount/userAccountApplicationService";
import RepositoryFactoryMock from "../../../applicationServiceTest/mock/repositoryFactoryMock";
import UserAccountRepositoryMock from "../../../applicationServiceTest/mock/userAccountRepositoryMock";
import EventStoreMock from "../../../applicationServiceTest/mock/eventStoreMock";
import { Request, Response } from "express";
import RequestMock from "./mock/requestMock";
import ResponseMock from "./mock/responseMock";
import UserAccount from "../../../../src/domain/model/identity/userAccount/userAccount";
import NewUserAccountCreated from "../../../../src/domain/model/identity/userAccount/newUserAccountCreated";

describe("UserAccountController", () => {
  const userAccountRepository = new UserAccountRepositoryMock();
  const eventStore = new EventStoreMock();
  const repositoryFactory = new RepositoryFactoryMock(
    userAccountRepository,
    eventStore
  );
  const userAccountApplicationService = new UserAccountApplicationService(
    repositoryFactory
  );
  const userAccountController = new UserAccountController(
    userAccountApplicationService
  );

  beforeEach(() => {
    userAccountRepository.clear();
    eventStore.clear();
  });

  it("should create a new user account and send response with status 201", () => {
    userAccountRepository.setDoesUserAccountExist(false); // user account does not exist

    const request: unknown = new RequestMock({
      username: "username",
      password: "SecureP@ss123",
    });
    const response: unknown = new ResponseMock();

    userAccountController.createUserAccount(
      request as Required<Request>,
      response as Required<Response>
    );

    // asserting that the user account was created and the event was stored
    expect(userAccountRepository.getUserAccount("username")).toBeInstanceOf(
      UserAccount
    );
    expect(eventStore.getAllStoredEvents()).toBeInstanceOf(
      NewUserAccountCreated
    );

    // asserting that the response was sent with status 201
    expect((response as ResponseMock).getStatus()).toBe(201);
    expect((response as ResponseMock).getResponse()).toEqual({
      message: "User account created",
    });
  });

  it("should send response with status 400 if request body is invalid", () => {
    const request: unknown = new RequestMock({}); // invalid request body
    const response: unknown = new ResponseMock();

    userAccountController.createUserAccount(
      request as Required<Request>,
      response as Required<Response>
    );

    expect((response as ResponseMock).getStatus()).toBe(400);
    expect((response as ResponseMock).getResponse()).toEqual({
      message: "invalid request body",
    });
  });

  it("should send 409 if there is conflict with username", () => {
    userAccountRepository.setDoesUserAccountExist(true); // user account exists

    const request: unknown = new RequestMock({
      username: "username",
      password: "SecureP@ss123",
    });

    const response: unknown = new ResponseMock();

    userAccountController.createUserAccount(
      request as Required<Request>,
      response as Required<Response>
    );

    expect((response as ResponseMock).getStatus()).toBe(409);
    expect((response as ResponseMock).getResponse()).toEqual({
      message: "user account exists",
    });
  });

  it("should send a status code 400 if the user password is invalid", () => {
    userAccountRepository.setDoesUserAccountExist(false);

    const request: unknown = new RequestMock({
      username: "username",
      password: "password",
    });

    const response: unknown = new ResponseMock();

    userAccountController.createUserAccount(
      request as Required<Request>,
      response as Required<Response>
    );

    expect((response as ResponseMock).getStatus()).toBe(400);
    expect((response as ResponseMock).getResponse()).toEqual({
      message: "password does not meet security requirements",
    });
  });
});
