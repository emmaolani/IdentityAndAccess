import ValueObject from "../../valueObject";


class VerificationCode extends ValueObject{
    private value: string;
    private timeStamp: number;
    private validLengthOfCode: number = 7;
    private allowedDurationOfCode: number = 300000;

    constructor(aValue: string, aTimeStamp: number){
        super();
        this.setValue(aValue);
        this.setTimeStamp(aTimeStamp);
    }

    private setValue(aValue: string){
        this.checkIfValueIsInt(aValue);
        this.isCodeLengthValid(aValue); 
        this.value = aValue
    }

    private setTimeStamp(aTimeStamp: number){
        this.checkIfTimeStampIsInvalid(aTimeStamp)
        this.timeStamp = aTimeStamp
    }


    private checkIfValueIsInt(aValue: string){
        if (Number.isNaN(parseInt(aValue)) == true || aValue.includes('.') == true) {
            throw Error('invalid code');
        }
    }

    private isCodeLengthValid(aValue: string){
        if (aValue.length != this.validLengthOfCode){
            throw Error('invalid code length');
        }
    }

    private checkIfTimeStampIsInvalid(aTimeStamp: number){
        if (aTimeStamp > Date.now() || aTimeStamp < 0) {
            throw Error('TimeStamp is invalid');
        }else{
            return
        }
    }


    getValue(): string{
        if (this.isValid()) {
            return this.value;
        }else{
            throw new Error('This code is expired');
        }
    }

    
    private isValid(): boolean{
        if ((Date.now() - this.timeStamp) > this.allowedDurationOfCode) {
            return false
        }else{
            return true
        }
    }

    
}

export default VerificationCode;