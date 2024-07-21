import FullName from "../../../../src/domain/model/userAccount/fullName";
import UserAccountCreationFormFactory from "../../../service/UserAccountCreationFormFactory";
import UserAccountCreationFormImp from "../../../../src/port/forms/userAccountCreationFormImp";
import { option } from "../../../types/option";

describe('testing fullName class', () => {
    let userAccountCreationFormFactory: UserAccountCreationFormFactory = new UserAccountCreationFormFactory();
    
    it('fullname should throw error if firstname is not provided', () => {
        const option: option = {
            shouldFillForm: true,
            shouldEnterInvalidInputInField: false,
            shouldEnterEmptyStringInField: true,
            field: ['firstName']
        }
    
        const emptyUserAccountCreationform: UserAccountCreationFormImp= userAccountCreationFormFactory.getNewFormWith(option);   
        
        expect(() => new FullName(emptyUserAccountCreationform)).toThrow('first name is empty');
    });

    it('fullName should correct invalid white spaces in firstname', ()=>{
        const option: option = {
            shouldFillForm: true,
            shouldEnterInvalidInputInField: true,
            shouldEnterEmptyStringInField: false,
            field: ['firstName']
        }
    
        const filledUserAccountCreationform: UserAccountCreationFormImp = userAccountCreationFormFactory.getNewFormWith(option);
        const fullName: FullName =  new FullName(filledUserAccountCreationform)

        expect(fullName.getFirstName()).toBe('invalid firstName');
    })

    it('fullname should throw error if lastname is not provided', () => {
        const option: option = {
            shouldFillForm: true,
            shouldEnterInvalidInputInField: false,
            shouldEnterEmptyStringInField: true,
            field: ['lastName']
        }

        const emptyUserAccountCreationform: UserAccountCreationFormImp = userAccountCreationFormFactory.getNewFormWith(option);   
        
        expect(() => new FullName(emptyUserAccountCreationform)).toThrow('last name is empty');
    })

    it('fullName should correct invalid white spaces in lastName', ()=>{
        const option: option = {
            shouldFillForm: true,
            shouldEnterInvalidInputInField: true,
            shouldEnterEmptyStringInField: false,
            field: ['lastName']
        }
    
        const filledUserAccountCreationform: UserAccountCreationFormImp = userAccountCreationFormFactory.getNewFormWith(option);
        const fullName: FullName =  new FullName(filledUserAccountCreationform)

        expect(fullName.getLastName()).toBe('invalid lastName');
    })

})