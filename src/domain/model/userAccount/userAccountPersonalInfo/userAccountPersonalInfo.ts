import FullName from "../../sharedPersonalInfoDetails/fullName";
import Address from "../../sharedPersonalInfoDetails/address";
import PhoneNumber from "../../sharedPersonalInfoDetails/phoneNumber";

class UserAccountPersonalInfo {
    private contactDetails: FullName;
    private homeAddress: Address;
    private phoneNumber: PhoneNumber;

    constructor(aContactDetails: FullName, aHomeAddress: Address){
        this.setContactDetails(aContactDetails)
        this.setHomeAddress(aHomeAddress)
    }
    setContactDetails(aContactDetails: FullName){
        this.contactDetails = aContactDetails;
    }
    setHomeAddress(aHomeAddress: Address){
        this.homeAddress = aHomeAddress
    }
}

export default UserAccountPersonalInfo