type NewUserAccountProfileReqObj = {
  userAccountProfileId: string;
  userAccountId: string;
  email: string;
  phoneNumber: {
    countryCode: string;
    number: string;
  };
};

export default NewUserAccountProfileReqObj;
