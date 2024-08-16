import FullName from "../../../../src/domain/model/PersonalInfo/fullName";


describe('Unit Test fullName class', () => {  
    const validFirstName = 'James';
    const emptyFirstName = '';
    const whiteSpaceFirstName = '  James   M';

    const validLastName = 'Thomas';
    const emptyLastName = '';
    const whiteSpacedlastName = ' M  Thomas ';


    it('should throw error if firstname is not provided', () => { 
        expect(() => new FullName(emptyFirstName, validLastName)).toThrow('first name is empty');
    });

    it('should throw error if lastname is not provided', () => {  
        expect(() => new FullName(validFirstName, emptyLastName)).toThrow('last name is empty');
    });

    it('should correct invalid white spaces in firstname', ()=>{
        const fullName: FullName =  new FullName(whiteSpaceFirstName, validLastName);

        expect(fullName.getFirstName()).toBe('James M');
    });

    it('should correct invalid white spaces in lastName', ()=>{
        const fullName: FullName =  new FullName(validFirstName, whiteSpacedlastName);

        expect(fullName.getLastName()).toBe('M Thomas');
    });

});
