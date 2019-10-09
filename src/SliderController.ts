import {Options, Orientation} from "./interfaces";
import {SliderModel} from "./SliderModel";
import {SliderView} from "./SliderView";

class SliderController{
    private readonly _model:SliderModel;
    private readonly _view: SliderView;
    constructor(node: HTMLElement, options: Options){
        this._model = new SliderModel(options);
        this._view = new SliderView(options, this._model.values, this._model.positions, node, {
            onMouseMove: this.move.bind(this),
            onMouseDown: this.startMoving.bind(this),
            onMouseUp:this.endMoving.bind(this),
            onMouseLeave:this.endMoving.bind(this)
        });
    }

    private move(e:MouseEvent){
        e.preventDefault();
        if (this._view.activeHandler !== null){
            let rect = this._view.getRect();
            if (this._view.orientation === Orientation.Horizontal){
                this._model.move(rect.left, rect.width, this._view.activeHandler, e.clientX);
            }else if (this._view.orientation === Orientation.Vertical){
                this._model.move(rect.top, rect.height, this._view.activeHandler, e.clientY);
            }
            this._view.move(this._model.positions, this._model.values);
        }
    }

    private startMoving(e:MouseEvent){
        e.preventDefault();
        this._view.setActiveHandler(<HTMLElement>e.target);
    }
    private endMoving(e:MouseEvent){
        e.preventDefault();
        this._view.activeHandler = null;
    }
}

export { SliderController };