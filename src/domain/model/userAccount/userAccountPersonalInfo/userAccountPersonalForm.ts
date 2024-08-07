
interface UserAccountProfileForm {
    firstName: string;
    lastName: string;
    countryID: string;
    stateID: string;   
    email: {
        ID: string;
        value: string;
        status: string;
        verificationToken: {
            ID: string;
            value: string;
            duration: string;
        }
    };
    phoneNumber: {
        ID: string
        value: string;
        status: string;
        verificationToken: {
            ID: string;
            value: string;
            duration: string;
        }
    };    
}

export default UserAccountProfileForm;