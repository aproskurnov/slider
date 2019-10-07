import * as interfaces from "./interfaces";
import {Type} from "./interfaces";

class SliderView{
    private _showValue:boolean;
    private _orientation:interfaces.Orientation;
    private _steps:number;
    private _position:number;
    private _parentEl:HTMLElement;
    private _type: Type;
    constructor({showValue = false, orientation = interfaces.Orientation.Horizontal, type = Type.Single},
                steps:number, position:number, parentEl:HTMLElement){
        this._showValue = showValue;
        this._orientation = orientation;
        this._steps = steps;
        this._position = position;
        this._parentEl = parentEl;
        this._type = type;

        this.create();
    }
    public create(){
        this._parentEl.classList.add('slider', 'slider_horizontal');
        let handler = document.createElement('div');
        handler.classList.add('slider__handler');
        this._parentEl.appendChild(handler);
        this.moveHandler(this._position);
    }
    private moveHandler(position:number)
    {
        let el = <HTMLElement>this._parentEl.querySelector('.slider__handler');
        el.style.left = position + '%';
    }

}

export { SliderView };