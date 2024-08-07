import FullName from "../../../../src/domain/model/sharedPersonalInfoDetails/fullName";

describe('testing fullName class', () => {
      
    it('fullname should throw error if firstname is not provided', () => { 
        const firstName = ''
        const lastName = 'Thomas'
        
        expect(() => new FullName(firstName, lastName)).toThrow('first name is empty');
    });

    it('fullName should correct invalid white spaces in firstname', ()=>{
        const firstName = '  James   M'
        const lastName = 'Thomas'
        
        const fullName: FullName =  new FullName(firstName, lastName)
        
        expect(fullName.getFirstName()).toBe('James M');
    })

    it('fullname should throw error if lastname is not provided', () => {
        const firstName = 'James'
        const lastName = ''
        
        expect(() => new FullName(firstName, lastName)).toThrow('last name is empty');
    })

    it('fullName should correct invalid white spaces in lastName', ()=>{
        const firstName = 'James'
        const lastName = ' M  Thomas '
        const fullName: FullName =  new FullName(firstName, lastName)

        expect(fullName.getLastName()).toBe('M Thomas');
    })

})