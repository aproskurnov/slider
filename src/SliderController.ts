import {Options} from "./interfaces";
import {SliderModel} from "./SliderModel";
import {SliderView} from "./SliderView";

class SliderController{
    private readonly model:SliderModel;
    private readonly view: SliderView;
    constructor(node: HTMLElement, options: Options){
        this.model = new SliderModel(options);
        this.view = new SliderView(options, this.model.steps, this.model.position, node);

    }
}

export { SliderController };