class FullViewOfUserAccountProfile{
    private firstName: string;
    private lastName: string;
    private phoneNumber: string;
    private address: object;
    private status: string;
    constructor(afirstName: string, aLastName: string, aPhoneNumber: string, aAddress: object, aStatus: string){
        this.setFirstName(afirstName);
        this.setLastName(aLastName);
        this.setPhoneNumber(aPhoneNumber);
        this.setAddress(aAddress);
        this.setStatus(aStatus);
    }
    setFirstName(afirstName: string){
        this.firstName = afirstName;
    }
    setLastName(aLastName: string){
        this.lastName = aLastName;
    }
    setPhoneNumber(aPhoneNumber: string){
        this.phoneNumber = aPhoneNumber;
    }
    setAddress(aAddress: object){
        this.address = aAddress;
    }
    setStatus(aStatus: string){
        this.status = aStatus;
    }
}

export default FullViewOfUserAccountProfile;