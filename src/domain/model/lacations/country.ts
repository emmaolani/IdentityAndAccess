import State  from './state';

class Country{
    private countryID: string;
    private countryName: string;
    private states: State[];

    constructor(countryID: string, countryName: string, states: State[]){
        this.countryID = countryID;
        this.countryName = countryName;
        this.states = states;
    }
}

export default Country