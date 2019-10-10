import {Orientation, SliderEvents, Handler} from "./interfaces";

class SliderView{
    private _label:boolean;
    private _orientation:Orientation;
    private _positions:number[];
    private _values: number[];
    private _parentEl:HTMLElement;
    private _handlers:Handler[];
    private _activeHandler:number|null;
    private _sliderEvents: SliderEvents;
    constructor({label = false, orientation = Orientation.Horizontal},
                values:number[], positions:number[], parentEl:HTMLElement, sliderEvents: SliderEvents){
        this._label = label;
        this._orientation = orientation;
        this._positions = positions;
        this._values = values;
        this._parentEl = parentEl;
        this._sliderEvents = sliderEvents;
        this._handlers = [];
        this._activeHandler = null;

        this.create();
        this.bindEvents();
    }
    public move(positions:number[], values:number[])
    {
        if (this._orientation === Orientation.Horizontal){
            this._handlers.map((v, i)=>{
                v.handler.style.left = positions[i] + '%';
                v.label.innerHTML = String(values[i]);
            });
        }else if (this._orientation === Orientation.Vertical){
            this._handlers.map((v, i)=>{
                v.handler.style.top = positions[i] + '%';
                v.label.innerHTML = String(values[i]);
            });
        }
    }
    private create(){
        this._parentEl.classList.add('slider');

        if (this._orientation === Orientation.Horizontal){
            this._parentEl.classList.add('slider_horizontal');
        }else if (this._orientation === Orientation.Vertical){
            this._parentEl.classList.add('slider_vertical');
        }

        this._positions.map((v, i)=>{

            let handler = document.createElement('div');
            handler.classList.add('slider__handler');

            if (this._orientation === Orientation.Horizontal){
                handler.classList.add('slider__handler_horizontal');
            }else if (this._orientation === Orientation.Vertical){
                handler.classList.add('slider__handler_vertical');
            }

            let label = document.createElement('div');
            label.classList.add('slider__label');
            label.innerHTML = String(this._values[i]);

            if (this._orientation === Orientation.Horizontal){
                label.classList.add('slider__label_horizontal');
            }else if (this._orientation === Orientation.Vertical){
                label.classList.add('slider__label_vertical');
            }

            handler.appendChild(label);

            if (this._label){
                label.classList.add('slider__label_showed');
            }

            this._parentEl.appendChild(handler);
            this._handlers.push({
                handler:handler,
                label:label
            });

        });
        this.move(this._positions, this._values);


    }
    private bindEvents()
    {
        this._handlers.map((v)=>{
            v.handler.addEventListener('mousedown', this._sliderEvents.onMouseDown);
        });
        document.addEventListener('mouseup', this._sliderEvents.onMouseUp);
        document.addEventListener('mouseleave', this._sliderEvents.onMouseLeave);
        document.addEventListener('mousemove', this._sliderEvents.onMouseMove);
    }
    public getRect():ClientRect
    {
        return this._parentEl.getBoundingClientRect();
    }

    public get orientation():Orientation{
        return this._orientation;
    }

    public get activeHandler():number|null{
        return this._activeHandler;
    }

    public set activeHandler(val:number|null){
        this._activeHandler = val;
    }

    public setActiveHandler(el:HTMLElement)
    {
        this._handlers.map((v, i)=>{
            if (v.handler === el){
                this.activeHandler = i;
            }
        });
    }

    public get label():boolean{
        return this._label;
    }

    public set label(val:boolean){
        if (this._label !== val){
            if (val){
                this._handlers.map((v)=>{
                    v.label.classList.add('slider__label_showed')
                });
            }else{
                this._handlers.map((v)=>{
                    v.label.classList.remove('slider__label_showed')
                });
            }
            this._label = val;
        }
    }

}

export { SliderView };