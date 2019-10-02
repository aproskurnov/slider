import * as interfaces from "./interfaces";

class SliderView{
    private showValue:boolean;
    private orientation:interfaces.Orientation;
    constructor({showValue = false, orientation = interfaces.Orientation.Horizontal}){
        this.showValue = showValue;
        this.orientation = orientation;
    }
}

export { SliderView };