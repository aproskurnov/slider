import * as interfaces from "./interfaces";
import {Orientation, SliderEvents, Type} from "./interfaces";

class SliderView{
    private _showValue:boolean;
    private _orientation:interfaces.Orientation;
    private _steps:number;
    private _position:number;
    private _parentEl:HTMLElement;
    private _handler:HTMLElement | null;
    private _type: Type;
    private _sliderEvents: SliderEvents;
    constructor({showValue = false, orientation = interfaces.Orientation.Horizontal, type = Type.Single},
                steps:number, position:number, parentEl:HTMLElement, sliderEvents: SliderEvents){
        this._showValue = showValue;
        this._orientation = orientation;
        this._steps = steps;
        this._position = position;
        this._parentEl = parentEl;
        this._type = type;
        this._sliderEvents = sliderEvents;
        this._handler = null;

        this.create();
        this.bindEvents();
    }
    public move(position:number)
    {
        if (this._handler){
            if (this._orientation === Orientation.Horizontal){
                this._handler.style.left = position + '%';
            }else if (this._orientation === Orientation.Vertical){
                this._handler.style.top = position + '%';
            }

        }

    }
    public create(){
        this._parentEl.classList.add('slider');

        if (this._orientation === Orientation.Horizontal){
            this._parentEl.classList.add('slider_horizontal');
        }else if (this._orientation === Orientation.Vertical){
            this._parentEl.classList.add('slider_vertical');
        }

        this._handler = document.createElement('div');
        this._handler.classList.add('slider__handler');

        if (this._orientation === Orientation.Horizontal){
            this._handler.classList.add('slider__handler_horizontal');
        }else if (this._orientation === Orientation.Vertical){
            this._handler.classList.add('slider__handler_vertical');
        }

        this._parentEl.appendChild(this._handler);

        this.move(this._position);
    }
    public bindEvents()
    {
        if (this._handler){
            this._handler.addEventListener('mousedown', this._sliderEvents.onMouseDown);
            document.addEventListener('mouseup', this._sliderEvents.onMouseUp);
            document.addEventListener('mouseleave', this._sliderEvents.onMouseLeave);
            document.addEventListener('mousemove', this._sliderEvents.onMouseMove);
        }

    }
    public getRect():ClientRect
    {
        return this._parentEl.getBoundingClientRect();
    }

    public get orientation(){
        return this._orientation;
    }



}

export { SliderView };