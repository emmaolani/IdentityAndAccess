import UserAccountProfileController from "../../../../src/port/adapters/controller/userAccountProfileController";
import UserAccountProfileApplicationService from "../../../../src/application/identity/userAccountProfile/userAccountProfileApplicationService";
import RepositoryFactoryMock from "../../../applicationServiceTest/mock/repositoryFactoryMock";
import PhoneNumberValidatorImp from "../../../../src/port/util/phoneNumberValidatorImp";
import UserAccountProfile from "../../../../src/domain/model/identity/userAccount/userAccountProfile/userAccountProfile";
import NewUserAccountProfileCreated from "../../../../src/domain/model/identity/userAccount/userAccountProfile/newUserAccountProfileCreated";
import RequestMock from "./mock/requestMock";
import ResponseMock from "./mock/responseMock";
import { Request, Response } from "express";
import UUIDGenerator from "../../../../src/port/adapters/controller/uUIDGenerator";
import ITUAndISOSpec from "../../../../src/domain/model/geographicEntities/ITUAndISOSpec";
import ITUAndISOSpecId from "../../../../src/domain/model/geographicEntities/ITUAndISOSpecId";
import EventName from "../../../../src/domain/enum/event/eventName";
import NewUserAccountProfileReqObj from "../../../../src/port/adapters/controller/requestBodyTypes/newUserAccountProfileReqObj.type";
import UserAccountId from "../../../../src/domain/model/identity/userAccount/userAccountId";
import UserAccountProfileId from "../../../../src/domain/model/identity/userAccount/userAccountProfile/userAccountProfileId";
import EmailAddress from "../../../../src/domain/model/contactDetails/emailAddress";
import PhoneNumber from "../../../../src/domain/model/contactDetails/phoneNumber";
import userAccountProfileRepoError from "../../../../src/port/_enums/errorMsg/repositories/repositoryErrorMsg/userAccountProfileRepoErrorMsg";
import { ITUAndISOSpecRepoErrorMsg } from "../../../../src/port/_enums/errorMsg/repositories/repositoryErrorMsg/iTuAndISOSpecRepoErrorMsg";
import {
  emailAddressError,
  phoneNumberError,
} from "../../../../src/domain/enum/errorMsg/contactDetailErrorMsg";
import { userAccountIdError } from "../../../../src/domain/enum/errorMsg/userAccountErrorMsg";
import { UserAccountProfileIdError } from "../../../../src/domain/enum/errorMsg/userAccountProfileErrorMsg";

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
      await addDefaultITUAndISOSpecToDb();
    });

    async function addDefaultITUAndISOSpecToDb() {
      const repositories = repositoryFactory.getRepositories(
        "ITUAndISOSpecRepository"
      );

      await repositories.ITUAndISOSpecRepository.save(
        new ITUAndISOSpec(
          new ITUAndISOSpecId(new UUIDGenerator().generate()),
          "countryId",
          "NG",
          "234"
        )
      );
    }

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
        userAccountId: new UUIDGenerator().generate(),
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
        userAccountId: new UUIDGenerator().generate(),
        email: "tester@test.com",
        phoneNumber: {
          countryCode: "NG",
          number: "08123456778",
        },
      });
      const response: unknown = new ResponseMock();

      storeUserAccountProfileInDb(
        (request as Request).body as NewUserAccountProfileReqObj
      );

      await userAccountProfileController.createUserAccountProfile(
        request as Request,
        response as Response
      );

      expect((response as ResponseMock).getStatus()).toBe(409);
      expect((response as ResponseMock).getResponse()).toEqual({
        message: userAccountProfileRepoError.userAccountProfileNotFound,
      });

      removeUserAccountProfileFromDb(
        (request as Request).body as NewUserAccountProfileReqObj
      );
    });

    async function storeUserAccountProfileInDb(
      aRequestBody: NewUserAccountProfileReqObj
    ) {
      const repositories = repositoryFactory.getRepositories(
        "UserAccountProfileRepository"
      );

      await repositories.UserAccountProfileRepository.save(
        new UserAccountProfile(
          new UserAccountProfileId(aRequestBody.userAccountProfileId),
          new UserAccountId(aRequestBody.userAccountId),
          new EmailAddress(aRequestBody.email, false, null),
          new PhoneNumber(
            aRequestBody.phoneNumber.number,
            new ITUAndISOSpecId(new UUIDGenerator().generate()),
            false,
            null
          )
        )
      );
    }

    async function removeUserAccountProfileFromDb(
      aRequestBody: NewUserAccountProfileReqObj
    ) {
      const repositories = repositoryFactory.getRepositories(
        "UserAccountProfileRepository"
      );

      await repositories.UserAccountProfileRepository.remove(
        aRequestBody.userAccountProfileId
      );
    }

    /* This is a rare case; it occurs when phoneNumberValidator those not throw an error this may happen if the
      phoneNumberValidator data file includes a country code that lacks a corresponding ITUAndISOSpec in the database */
    it("it should return 404 status code if a valid country code does not have a ITUAndISOSpec in the DB", async () => {
      const request: unknown = new RequestMock({
        userAccountProfileId: new UUIDGenerator().generate(),
        userAccountId: new UUIDGenerator().generate(),
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
        userAccountId: new UUIDGenerator().generate(),
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
        message: phoneNumberError.invalidPhoneNumber,
      });
    });

    it("should respond with a 400 error if email address is not valid", async () => {
      const request: unknown = new RequestMock({
        userAccountProfileId: new UUIDGenerator().generate(),
        userAccountId: new UUIDGenerator().generate(),
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
        message: emailAddressError.invalidEmail,
      });
    });

    it("should respond with a 500 error if the userAccountId is not a valid UUID", async () => {
      const request: unknown = new RequestMock({
        userAccountProfileId: new UUIDGenerator().generate(),
        userAccountId: "invalidUUID",
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
        message: userAccountIdError.invalidUUID,
      });
    });

    it("should respond with a 500 error if the userAccountProfileId is not a valid UUID", async () => {
      const request: unknown = new RequestMock({
        userAccountProfileId: "invalidUUID",
        userAccountId: new UUIDGenerator().generate(),
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
        message: UserAccountProfileIdError.invalidUUID,
      });
    });
  });
});
