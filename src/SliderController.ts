import {Options, Orientation, Callbacks} from "./interfaces";
import {SliderModel} from "./SliderModel";
import {SliderView} from "./SliderView";

class SliderController{
    private readonly _model:SliderModel;
    private readonly _view: SliderView;
    private _callbacks: Callbacks;
    constructor(node: HTMLElement, options: Options){
        this._model = new SliderModel(options);
        this._view = new SliderView(options, this._model.values, this._model.positions, node, {
            onMouseMove: this.move.bind(this),
            onMouseDown: this.startMoving.bind(this),
            onMouseUp:this.endMoving.bind(this),
            onMouseLeave:this.endMoving.bind(this)
        });
        if(options.callbacks){
            this._callbacks = options.callbacks;
        }else{
            this._callbacks = {};
        }

    }

    private move(e:MouseEvent|TouchEvent){

        if (this._view.activeHandler !== null){

            let x:number;
            let y:number;

            if (e instanceof MouseEvent){
                e.preventDefault();
                x = e.clientX;
                y = e.clientY;
            }else if(e instanceof TouchEvent){
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
            }else{
                throw "never use";
            }

            let rect = this._view.getRect();
            if (this._view.orientation === Orientation.Horizontal){
                this._model.move(rect.left, rect.width, this._view.activeHandler, x);
            }else if (this._view.orientation === Orientation.Vertical){
                this._model.move(rect.top, rect.height, this._view.activeHandler, y);
            }
            this._view.move(this._model.positions, this._model.values);
            if (this._callbacks.onMove){
                this._callbacks.onMove(this._model.values);
            }

        }
    }

    private startMoving(e:MouseEvent|TouchEvent){
        if(e instanceof MouseEvent){
            e.preventDefault();
        }

        this._view.setActiveHandler(<HTMLElement>e.target);
    }
    private endMoving(e:MouseEvent|TouchEvent){
        if(e instanceof MouseEvent){
            e.preventDefault();
        }
        this._view.activeHandler = null;
    }

    public get min():number{
        return this._model.min;
    }

    public set min(val:number){
        this._model.min = val;
        this._view.move(this._model.positions,this._model.values);
    }

    public get max():number{
        return this._model.max;
    }

    public set max(val:number){
        this._model.max = val;
        this._view.move(this._model.positions,this._model.values);
    }

    public get label():boolean{
        return this._view.label;
    }

    public set label(val:boolean){
        this._view.label = val;
    }

    public get values():number[]{
        return this._model.values;
    }

    public setValue(val:number, pos:number){
        this._model.setValue(val, pos);
        this._view.move(this._model.positions,this._model.values);
    }

}

export { SliderController };