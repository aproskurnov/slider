import {Options} from "./interfaces";
import {SliderModel} from "./SliderModel";
import {SliderView} from "./SliderView";

class SliderController{
    private readonly model:SliderModel;
    private readonly view: SliderView;
    constructor(node: HTMLElement, options: Options){
        this.view = new SliderView(options);
        this.model = new SliderModel(options);
    }
}

export { SliderController };