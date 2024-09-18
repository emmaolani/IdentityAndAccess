import UserAccountProfileController from "../../../../../src/port/adapters/controller/userAccount/userAccountProfile/userAccountProfileController";
import UserAccountProfileApplicationService from "../../../../../src/application/userAccount/userAccountProfile/userAccountProfileApplicationService";
import RepositoryFactoryMock from "../../../../application/mock/repositoryFactoryMock";
import PhoneNumberValidatorImp from "../../../../../src/port/util/phoneNumberValidatorImp";
import UserAccountProfile from "../../../../../src/domain/model/userAccount/userAccountProfile/userAccountProfile";
import NewUserAccountProfileCreated from "../../../../../src/domain/model/userAccount/userAccountProfile/newUserAccountProfileCreated";
import RequestMock from "../mock/requestMock";
import ResponseMock from "../mock/responseMock";
import { Request, Response } from "express";
import UUIDGenerator from "../../../../../src/port/util/uUIDGenerator";
import EventName from "../../../../../src/domain/eventName";
import NewUserAccountProfileReqObj from "../../../../../src/port/adapters/controller/userAccount/userAccountProfile/newUserAccountProfileReqObj.type";
import userAccountProfileRepoError from "../../../../../src/port/adapters/persistance/repositoryErrorMsg/userAccountProfileRepoErrorMsg";
import { ITUAndISOSpecRepoErrorMsg } from "../../../../../src/port/adapters/persistance/repositoryErrorMsg/iTuAndISOSpecRepoErrorMsg";
import { contactDetailErrorMsg } from "../../../../../src/domain/model/contactDetails/contactDetailErrorMsg";
import TestPrerequisiteRepository from "../../../../application/mock/testPrerequisiteRepository";

describe("userAccount", () => {
  const repositoryFactory = new RepositoryFactoryMock();
  const phoneNumberValidator = new PhoneNumberValidatorImp();
  const userAccountProfileApplicationService =
    new UserAccountProfileApplicationService(
      repositoryFactory,
      phoneNumberValidator
    );
  const userAccountProfileController = new UserAccountProfileController(
    userAccountProfileApplicationService
  );

  describe("createUserAccountProfile", () => {
    beforeAll(async () => {
      const testPrerequisiteRepository =
        repositoryFactory.getTestPrerequisiteRepository();

      testPrerequisiteRepository.savePrerequisiteObjects(
        "ITUAndISOSpec",
        "userAccount"
      );
    });

    it("should respond with a status of 400 if the request body is invalid", async () => {
      const request: unknown = new RequestMock({});
      const response: unknown = new ResponseMock();

      await userAccountProfileController.createUserAccountProfile(
        request as Request,
        response as Response
      );

      expect((response as ResponseMock).getStatus()).toBe(400);
      expect((response as ResponseMock).getResponse()).toEqual({
        message: "Invalid request body",
      });
    });

    it("should create userAccountProfile and an event, and send a 201 status code", async () => {
      const request: unknown = new RequestMock({
        userAccountProfileId: new UUIDGenerator().generate(),
        userAccountId: TestPrerequisiteRepository.userAccountProperties.id,
        email: "tester@test.com",
        phoneNumber: {
          countryCode: "NG",
          number: "08123456778",
        },
      });
      const response: unknown = new ResponseMock();

      await userAccountProfileController.createUserAccountProfile(
        request as Request,
        response as Response
      );

      const { userAccountProfile, events } =
        await retrieveUserAccountProfileAndEventStored(
          (request as Request).body as NewUserAccountProfileReqObj
        );

      // asserting that the userAccountProfile and event was created with the correct properties
      assertThatPropertiesIn_userAccountProfile_match(
        userAccountProfile,
        (request as Request).body as NewUserAccountProfileReqObj
      );
      assertThatEventIsPublishedWithCorrectProperties(
        events[0],
        userAccountProfile
      );

      // asserting that the response was sent with status 201
      expect((response as ResponseMock).getStatus()).toBe(201);
      expect((response as ResponseMock).getResponse()).toEqual({
        userAccountProfileId: (request as Request).body.userAccountProfileId,
        message: "User account profile created",
      });
    });

    async function retrieveUserAccountProfileAndEventStored(
      aRequestBody: NewUserAccountProfileReqObj
    ) {
      const repositories = repositoryFactory.getRepositories(
        "UserAccountProfileRepository",
        "EventStore"
      );

      const userAccountProfile =
        await repositories.UserAccountProfileRepository.getById(
          aRequestBody.userAccountProfileId
        );
      const events = (await repositories.EventStore.getAllEventWithName(
        EventName.NewUserAccountProfileCreated
      )) as NewUserAccountProfileCreated[];

      return { userAccountProfile, events };
    }

    function assertThatPropertiesIn_userAccountProfile_match(
      aUserAccountProfile: UserAccountProfile,
      aRequestBody: NewUserAccountProfileReqObj
    ) {
      expect(aUserAccountProfile).toBeInstanceOf(UserAccountProfile);
      expect(aUserAccountProfile.getId()).toBe(
        aRequestBody.userAccountProfileId
      );
      expect(aUserAccountProfile["userAccountId"]["id"]).toBe(
        aRequestBody.userAccountId
      );
      expect(aUserAccountProfile["emailAddress"].getValue()).toBe(
        aRequestBody.email
      );
      expect(aUserAccountProfile["phoneNumber"].getValue()).toBe(
        aRequestBody.phoneNumber.number.slice(1) // phoneNumber is stored without the calling code or national prefix
      );
    }

    function assertThatEventIsPublishedWithCorrectProperties(
      aEvent: NewUserAccountProfileCreated,
      aUserAccountProfile: UserAccountProfile
    ) {
      expect(aEvent).toBeInstanceOf(NewUserAccountProfileCreated);
      expect(aEvent["userAccountProfileId"]).toBe(aUserAccountProfile.getId());
      expect(aEvent["userAccountId"]).toBe(
        aUserAccountProfile["userAccountId"].getId()
      );
    }

    it("should respond with a status of 409 if a userAccount already have a userAccountProfile", async () => {
      const request: unknown = new RequestMock({
        userAccountProfileId: new UUIDGenerator().generate(),
        userAccountId: TestPrerequisiteRepository.userAccountProperties.id,
        email: "tester@test.com",
        phoneNumber: {
          countryCode: "NG",
          number: "08123456778",
        },
      });
      const response: unknown = new ResponseMock();

      storeUserAccountProfileInDb();

      await userAccountProfileController.createUserAccountProfile(
        request as Request,
        response as Response
      );

      expect((response as ResponseMock).getStatus()).toBe(409);
      expect((response as ResponseMock).getResponse()).toEqual({
        message: userAccountProfileRepoError.userAccountProfileAlreadyExist,
      });

      removeUserAccountProfileFromDb();
    });

    async function storeUserAccountProfileInDb() {
      const testPrerequisiteRepository =
        repositoryFactory.getTestPrerequisiteRepository();

      testPrerequisiteRepository.savePrerequisiteObjects("userAccountProfile");
    }

    async function removeUserAccountProfileFromDb() {
      const testPrerequisiteRepository =
        repositoryFactory.getTestPrerequisiteRepository();

      testPrerequisiteRepository.removePrerequisiteObjects(
        "userAccountProfile"
      );
    }

    /* This is a rare case; it occurs when phoneNumberValidator those not throw an error this may happen if the
      phoneNumberValidator data file includes a country code that lacks a corresponding ITUAndISOSpec in the database */
    it("it should return 404 status code if a valid country code does not have a ITUAndISOSpec in the DB", async () => {
      const request: unknown = new RequestMock({
        userAccountProfileId: new UUIDGenerator().generate(),
        userAccountId: TestPrerequisiteRepository.userAccountProperties.id,
        email: "tester@test.com",
        phoneNumber: {
          countryCode: "US",
          number: "2234567899", // US is a valid country code but does not have a corresponding ITUAndISOSpec in the test database
        },
      });
      const response: unknown = new ResponseMock();

      await userAccountProfileController.createUserAccountProfile(
        request as Request,
        response as Response
      );

      expect((response as ResponseMock).getStatus()).toBe(404);
      expect((response as ResponseMock).getResponse()).toEqual({
        message: ITUAndISOSpecRepoErrorMsg.ITUAndISOSpecNotFound,
      });
    });

    // phoneNumberValidator should always validate the phone number before the ITUAndISOSpec is retrieved
    it("should respond with a status of 400 if the phoneNumber is invalid", async () => {
      const request: unknown = new RequestMock({
        userAccountProfileId: new UUIDGenerator().generate(),
        userAccountId: TestPrerequisiteRepository.userAccountProperties.id,
        email: "tester@test.com",
        phoneNumber: {
          countryCode: "US",
          number: "223",
        },
      });
      const response: unknown = new ResponseMock();

      await userAccountProfileController.createUserAccountProfile(
        request as Request,
        response as Response
      );

      expect((response as ResponseMock).getStatus()).toBe(400);
      expect((response as ResponseMock).getResponse()).toEqual({
        message: contactDetailErrorMsg.invalidPhoneNumber,
      });
    });

    it("should respond with a 400 error if email address is not valid", async () => {
      const request: unknown = new RequestMock({
        userAccountProfileId: new UUIDGenerator().generate(),
        userAccountId: TestPrerequisiteRepository.userAccountProperties.id,
        email: "testerTestCom",
        phoneNumber: {
          countryCode: "NG",
          number: "08123456778",
        },
      });
      const response: unknown = new ResponseMock();

      await userAccountProfileController.createUserAccountProfile(
        request as Request,
        response as Response
      );

      expect((response as ResponseMock).getStatus()).toBe(400);
      expect((response as ResponseMock).getResponse()).toEqual({
        message: contactDetailErrorMsg.invalidEmail,
      });
    });

    it("should respond with a 500 error if the userAccount is not found in DB", async () => {
      const request: unknown = new RequestMock({
        userAccountProfileId: new UUIDGenerator().generate(),
        userAccountId: TestPrerequisiteRepository.userAccountProperties.id,
        email: "tester@test.com",
        phoneNumber: {
          countryCode: "NG",
          number: "08123456778",
        },
      });
      const response: unknown = new ResponseMock();

      removePrerequisiteUserAccountFromDB();

      await userAccountProfileController.createUserAccountProfile(
        request as Request,
        response as Response
      );

      expect((response as ResponseMock).getStatus()).toBe(500);
      expect((response as ResponseMock).getResponse()).toEqual({
        message: "server error",
      });

      addPrerequisiteUserAccountToDB();
    });

    function removePrerequisiteUserAccountFromDB() {
      const testPrerequisiteRepository =
        repositoryFactory.getTestPrerequisiteRepository();

      testPrerequisiteRepository.removePrerequisiteObjects("userAccount");
    }

    function addPrerequisiteUserAccountToDB() {
      const testPrerequisiteRepository =
        repositoryFactory.getTestPrerequisiteRepository();

      testPrerequisiteRepository.savePrerequisiteObjects("userAccount");
    }

    it("should respond with a 500 error if the userAccountProfileId is not a valid UUID", async () => {
      const request: unknown = new RequestMock({
        userAccountProfileId: "invalidUUID",
        userAccountId: TestPrerequisiteRepository.userAccountProperties.id,
        email: "tester@test.com",
        phoneNumber: {
          countryCode: "NG",
          number: "08123456778",
        },
      });
      const response: unknown = new ResponseMock();

      await userAccountProfileController.createUserAccountProfile(
        request as Request,
        response as Response
      );

      expect((response as ResponseMock).getStatus()).toBe(500);
      expect((response as ResponseMock).getResponse()).toEqual({
        message: "server error",
      });
    });
  });
});
