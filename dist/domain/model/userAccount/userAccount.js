"use strict";
class userAccount {
    constructor(a) {
        this.UserAccountID = a;
        this.securityInfo = "";
        this.personalInfo = "";
        this.status = "";
        this.oneTimeVerification = "";
    }
    getUserAccountID() {
        return this.UserAccountID;
    }
}
let userAccount1 = new userAccount('string');
console.log(userAccount1.getUserAccountID());
