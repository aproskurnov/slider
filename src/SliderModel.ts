import {Options, Type} from "./interfaces";

class SliderModel{
    private _min:number = 0;
    private _max:number = 10;
    private _step:number = 1;
    private _type:Type = Type.Single;
    private _value:number = 0;
    constructor({min, max, step, type}:Options) {
        if (min){
            this._min = min;
        }
        if (max){
            this._max = max;
        }
        if (step){
            this._step = step;
        }
        if (type){
            this._type = type;
        }

        this.value = Math.round((this._max - this._min)/2);

    }
    public get value(){
        return this._value;
    }
    public set value(v){
        this._value = v;
    }

}

export { SliderModel };