import State  from './state';

class Country{
    private id: string;
    private name: string;

    constructor(aId: string, aName: string){
        this.id = aId;
        this.name = aName;
    }
}

export default Country