import UserAccountCreationFormImp from "../../src/port/forms/userAccountCreationFormImp";
import { option } from "../types/option";


class UserAccountCreationFormFactory {

    getNewFormWith(anOption: option): UserAccountCreationFormImp { 
        const userAccountCreationForm: UserAccountCreationFormImp = new UserAccountCreationFormImp();

        this.checkIfThisIsAValid(anOption);

        this.fillFormBasedOn(anOption, userAccountCreationForm);
       
        return userAccountCreationForm;   
    }

    private checkIfThisIsAValid(anOption: option){
        if(anOption.shouldFillForm === true && anOption.shouldEnterInvalidInputInField === true && 
            anOption.shouldEnterEmptyStringInField === true){
            throw new Error('cannot enter invalid input and empty string at the same time');
        }
    }

    private fillFormBasedOn(aConfiguration: option, userAccountCreationFormImp: UserAccountCreationFormImp){
        userAccountCreationFormImp.id = this.getSuitableIDBasedOn(aConfiguration);
        userAccountCreationFormImp.email = this.getSuitableEmailBasedOn(aConfiguration);
        userAccountCreationFormImp.password = this.getSuitablePasswordBasedOn(aConfiguration);
        userAccountCreationFormImp.firstName = this.getSuitableFirstNameBasedOn(aConfiguration);
        userAccountCreationFormImp.lastName = this.getSuitableLastNameBasedOn(aConfiguration);
        userAccountCreationFormImp.phoneNumber = this.getSuitablePhoneNumberBasedOn(aConfiguration);
        userAccountCreationFormImp.country = this.getSuitableCountryBasedOn(aConfiguration);
        userAccountCreationFormImp.state = this.getSuitableStateBasedOn(aConfiguration);
        userAccountCreationFormImp.town = this.getSuitableTownBasedOn(aConfiguration);
        userAccountCreationFormImp.postalCode = this.getSuitablePostalCodeBasedOn(aConfiguration);
        userAccountCreationFormImp.status = this.getSuitableStatusBasedOn(aConfiguration);
    }

    private getSuitableIDBasedOn(aConfiguration: option): string{
        if(aConfiguration.shouldFillForm == false){
            return '';
        }else if(aConfiguration.shouldEnterEmptyStringInField == true && aConfiguration.field.includes('id')){
            return '';
        }else if(aConfiguration.shouldEnterInvalidInputInField == true && aConfiguration.field.includes('id')){
            return 'invalid id';
        }
        return 'id';
    }

    private getSuitableEmailBasedOn(aConfiguration: option): string{
        if(aConfiguration.shouldFillForm == false){
            return '';
        }else if(aConfiguration.shouldEnterEmptyStringInField == true && aConfiguration.field.includes('email')){
            return '';
        }else if(aConfiguration.shouldEnterInvalidInputInField == true && aConfiguration.field.includes('email')){
            return 'invalid email';
        }
        return 'anEmail@coral.com';
    }

    private getSuitablePasswordBasedOn(aConfiguration: option): string{
        if(aConfiguration.shouldFillForm == false){
            return '';
        }else if(aConfiguration.shouldEnterEmptyStringInField == true && aConfiguration.field.includes('password')){
            return '';
        }else if(aConfiguration.shouldEnterInvalidInputInField == true && aConfiguration.field.includes('password')){
            return 'invalid password';
        }
        return 'password';
    }

    private getSuitableFirstNameBasedOn(aConfiguration: option): string{
        if(aConfiguration.shouldFillForm == false){
            return '';
        }else if(aConfiguration.shouldEnterEmptyStringInField == true && aConfiguration.field.includes('firstName')){
            return '';
        }else if(aConfiguration.shouldEnterInvalidInputInField == true && aConfiguration.field.includes('firstName')){
            return ' invalid  firstName ';
        }
        return 'firstName';
    }

    private getSuitableLastNameBasedOn(aConfiguration: option): string{
        if(aConfiguration.shouldFillForm == false){
            return '';
        }else if(aConfiguration.shouldEnterEmptyStringInField == true && aConfiguration.field.includes('lastName')){
            return '';
        }else if(aConfiguration.shouldEnterInvalidInputInField == true && aConfiguration.field.includes('lastName')){
            return ' invalid  lastName ';
        }
        return 'lastName';
    }

    private getSuitablePhoneNumberBasedOn(aConfiguration: option): string{
        if(aConfiguration.shouldFillForm == false){
            return '';
        }else if(aConfiguration.shouldEnterEmptyStringInField == true && aConfiguration.field.includes('phoneNumber')){
            return '';
        }else if(aConfiguration.shouldEnterInvalidInputInField == true && aConfiguration.field.includes('phoneNumber')){
            return 'invalid phoneNumber';
        }
        return '1234567890';
    }

    private getSuitableCountryBasedOn(aConfiguration: option): string{
        if(aConfiguration.shouldFillForm == false){
            return '';
        }else if(aConfiguration.shouldEnterEmptyStringInField == true && aConfiguration.field.includes('country')){
            return '';
        }else if(aConfiguration.shouldEnterInvalidInputInField == true && aConfiguration.field.includes('country')){
            return 'invalid country';
        }
        return 'country';
    }

    private getSuitableStateBasedOn(aConfiguration: option): string{
        if(aConfiguration.shouldFillForm == false){
            return '';
        }else if(aConfiguration.shouldEnterEmptyStringInField == true && aConfiguration.field.includes('state')){
            return '';
        }else if(aConfiguration.shouldEnterInvalidInputInField == true && aConfiguration.field.includes('state')){
            return 'invalid state';
        }
        return 'state';
    }

    private getSuitableTownBasedOn(aConfiguration: option): string{
        if(aConfiguration.shouldFillForm == false){
            return '';
        }else if(aConfiguration.shouldEnterEmptyStringInField == true && aConfiguration.field.includes('town')){
            return '';
        }else if(aConfiguration.shouldEnterInvalidInputInField == true && aConfiguration.field.includes('town')){
            return 'invalid town';
        }
        return 'town';
    }

    private getSuitablePostalCodeBasedOn(aConfiguration: option): string{
        if(aConfiguration.shouldFillForm == false){
            return '';
        }else if(aConfiguration.shouldEnterEmptyStringInField == true && aConfiguration.field.includes('postalCode')){
            return '';
        }else if(aConfiguration.shouldEnterInvalidInputInField == true && aConfiguration.field.includes('postalCode')){
            return 'invalid postalCode';
        }
        return 'postalCode';
    }

    private getSuitableStatusBasedOn(aConfiguration: option): string{
        if(aConfiguration.shouldFillForm == false){
            return '';
        }else if(aConfiguration.shouldEnterEmptyStringInField == true && aConfiguration.field.includes('status')){
            return '';
        }else if(aConfiguration.shouldEnterInvalidInputInField == true && aConfiguration.field.includes('status')){
            return 'invalid status';
        }
        return 'awaiting email verification';
    }

}



export default UserAccountCreationFormFactory;