import ValueObject from "../../valueObject";


class BirthDate extends ValueObject{
    private value: Date;


    constructor(aValue: string) {
        super();
        this.setBirthDate(aValue);
    };

    private setBirthDate(aValue: string) {
        const date = new Date(aValue); 

        this.checkIfDateIsValid(date.toString());

        this.value = date;
    };

    private checkIfDateIsValid(date: string) {
        if (date === "Invalid Date") {
            throw new Error("Invalid birth date");
        }

    } 

    getValue() {        
        return this.value.toISOString().split('T')[0];
    }

};


export default BirthDate;