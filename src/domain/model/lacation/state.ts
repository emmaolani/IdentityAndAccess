
class State{
    private stateID: string;
    private stateName: string

    constructor(Name: string, stateID: string){
        this.stateID = stateID;
        this.stateName = Name;
    }
}

export default State