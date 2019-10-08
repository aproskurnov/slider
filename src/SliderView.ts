import * as interfaces from "./interfaces";
import {Orientation, SliderEvents, Type} from "./interfaces";

class SliderView{
    private _showValue:boolean;
    private _orientation:interfaces.Orientation;
    private _steps:number;
    private _positions:number[];
    private _parentEl:HTMLElement;
    private _handlers:HTMLElement[];
    private _type: Type;
    private _sliderEvents: SliderEvents;
    constructor({showValue = false, orientation = interfaces.Orientation.Horizontal, type = Type.Single},
                steps:number, positions:number[], parentEl:HTMLElement, sliderEvents: SliderEvents){
        this._showValue = showValue;
        this._orientation = orientation;
        this._steps = steps;
        this._positions = positions;
        this._parentEl = parentEl;
        this._type = type;
        this._sliderEvents = sliderEvents;
        this._handlers = [];

        this.create();
        this.bindEvents();
    }
    public move(positions:number[])
    {
        if (this._orientation === Orientation.Horizontal){
            this._handlers.map((v, i)=>{v.style.left = positions[i] + '%'});
        }else if (this._orientation === Orientation.Vertical){
            this._handlers.map((v, i)=>{v.style.top = positions[i] + '%'});
        }
    }
    public create(){
        this._parentEl.classList.add('slider');

        if (this._orientation === Orientation.Horizontal){
            this._parentEl.classList.add('slider_horizontal');
        }else if (this._orientation === Orientation.Vertical){
            this._parentEl.classList.add('slider_vertical');
        }

        this._positions.map((v, i)=>{

            let handler = document.createElement('div');
            handler.classList.add('slider__handler');
            handler.setAttribute('data-num-handle', String(i));

            if (this._orientation === Orientation.Horizontal){
                handler.classList.add('slider__handler_horizontal');
            }else if (this._orientation === Orientation.Vertical){
                handler.classList.add('slider__handler_vertical');
            }

            this._parentEl.appendChild(handler);
            this._handlers.push(handler);

        });
        this.move(this._positions);


    }
    public bindEvents()
    {
            this._handlers.map((v)=>{
                v.addEventListener('mousedown', this._sliderEvents.onMouseDown);
            });
            document.addEventListener('mouseup', this._sliderEvents.onMouseUp);
            document.addEventListener('mouseleave', this._sliderEvents.onMouseLeave);
            document.addEventListener('mousemove', this._sliderEvents.onMouseMove);
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