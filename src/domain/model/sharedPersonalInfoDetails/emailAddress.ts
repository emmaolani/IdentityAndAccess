import VerificationCode from "./verificationCode";
import ValueObject from "../../valueObject";

 class EmailAddress extends ValueObject{
    private value: string;
    private isActive: boolean;
    private verificationCode: VerificationCode | null;

    constructor(aValue: string, aStatus: boolean, aVerificationCode: VerificationCode  |  null) {
      super()
      this.setValue(aValue)
      this.setActiveStatus(aStatus)
      this.setVerificationCode(aVerificationCode)
    }

    private setValue(aValue: string){
      const newValue = this.removeWhiteSpace(aValue)
      this.value = newValue
    }

    private setActiveStatus(aStatus: boolean){
      this.isActive = aStatus
    }

    private setVerificationCode(aVerificationCode: VerificationCode | null){
      this.verificationCode = aVerificationCode
    }

    private removeWhiteSpace(aValue: string): string{
      return aValue.replace(/\s+/g, '')
    }


    getValue(): string {
      if(!this.isActive){
        throw new Error('Email is not active')
      }
      return this.value
    }

    activateEmailAddress(code: string){
        if(this.verificationCode === null){
          throw new Error('No verification code found')
        }
        
        if(this.verificationCode.getValue() != code){
          throw new Error('Invalid code')
        }
  
        this.isActive = true
        this.verificationCode = null
        this.removeVerificationCode()
    }

    
    private removeVerificationCode(){
      this.verificationCode = null
    }
  }


export default EmailAddress