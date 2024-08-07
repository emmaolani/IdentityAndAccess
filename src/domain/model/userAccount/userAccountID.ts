import UserAccountCreationForm from "./userAccountForm"
class UserAccountID {
    private userAccountID : string
    constructor(aUserAccountCreationForm: UserAccountCreationForm){
        this.setID(aUserAccountCreationForm.id)
    }

    private setID(aID: string){
        this.userAccountID = aID
    }
    id(){
        return this.userAccountID
    }
}

export default UserAccountID