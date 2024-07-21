import UserAccountCreationForm from "./userAccountCreationForm";

 class FullName {
    private firstName: string;
    private lastName: string;
    constructor(aUserAccountCreationForm: UserAccountCreationForm){
        this.setFirstName(aUserAccountCreationForm.firstName)
        this.setLastName(aUserAccountCreationForm.lastName)
    }

    getFirstName(): string{
      return this.firstName
    }

    getLastName(): string{
      return this.lastName
    }

    private setFirstName(aFirstName: string): void{
      if (this.IsAnEmpty(aFirstName)) {
        throw new Error('first name is empty')
      }

      this.firstName = this.getValid(aFirstName)
    }

    private setLastName(aLastName: string): void{
      if (this.IsAnEmpty(aLastName)) {
        throw new Error('last name is empty')
      }

      this.lastName = this.getValid(aLastName)
    }

    private IsAnEmpty(aName: string): boolean{
      const regex: RegExp = new RegExp("^\s*$", "ig")

      return regex.test(aName) // checking if the string is empty
    }

    private getValid(aName: string): string{
      let validName: string = aName

      validName = validName.replace(/\s{2,}/gi, ' ') // replacing multiple white space between words with single white space
      validName = validName.replace(/^\s+/gi, '') // if string starts with a space we will remove it
      validName = validName.replace(/\s+$/gi, '') // if string ends with a space we will remove it

      return validName
    }
  }

  export default FullName