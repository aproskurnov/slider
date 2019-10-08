import {Options, Orientation} from "./interfaces";
import {SliderModel} from "./SliderModel";
import {SliderView} from "./SliderView";

class SliderController{
    private readonly _model:SliderModel;
    private readonly _view: SliderView;
    private _moving = false;
    constructor(node: HTMLElement, options: Options){
        this._model = new SliderModel(options);
        this._view = new SliderView(options, this._model.steps, this._model.position, node, {
            onMouseDown:this.startMoving.bind(this),
            onMouseUp:this.endMoving.bind(this),
            onMouseMove: this.move.bind(this),
            onMouseLeave: this.leave.bind(this)
        });
    }

    private startMoving(){
        this._moving = true;
    }
    private endMoving(){
        if (this._moving){
            this._moving = false;
        }
    }
    private move(e:MouseEvent){
        if (this._moving){
            if (e.target){
                let rect = this._view.getRect();

                if (this._view.orientation === Orientation.Horizontal){
                    this._model.move(rect.left, rect.width, e.clientX);
                }else if (this._view.orientation === Orientation.Vertical){
                    this._model.move(rect.top, rect.height, e.clientY);
                }

                this._view.move(this._model.position);
            }
        }
    }
    private leave(e:Event){
        if (e.target){
            if (this._moving){
                this._moving = false;
            }
        }
    }
}

export { SliderController };