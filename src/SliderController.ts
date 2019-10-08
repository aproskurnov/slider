import {Options, Orientation} from "./interfaces";
import {SliderModel} from "./SliderModel";
import {SliderView} from "./SliderView";

class SliderController{
    private readonly _model:SliderModel;
    private readonly _view: SliderView;
    private _activeHandler:number | null = null;
    constructor(node: HTMLElement, options: Options){
        this._model = new SliderModel(options);
        this._view = new SliderView(options, this._model.steps, this._model.positions, node, {
            onMouseDown:this.startMoving.bind(this),
            onMouseUp:this.endMoving.bind(this),
            onMouseMove: this.move.bind(this),
            onMouseLeave: this.leave.bind(this)
        });
    }

    private startMoving(e:MouseEvent){
        this._activeHandler = Number((<HTMLElement>e.target).getAttribute('data-num-handle') || '0');
    }
    private endMoving(){
        this._activeHandler = null;
    }
    private move(e:MouseEvent){
        if (this._activeHandler !== null){
            let rect = this._view.getRect();
            if (this._view.orientation === Orientation.Horizontal){
                this._model.move(rect.left, rect.width, this._activeHandler, e.clientX);
            }else if (this._view.orientation === Orientation.Vertical){
                this._model.move(rect.top, rect.height, this._activeHandler, e.clientY);
            }

            this._view.move(this._model.positions);
        }
    }
    private leave(){
        this._activeHandler = null;
    }
}

export { SliderController };