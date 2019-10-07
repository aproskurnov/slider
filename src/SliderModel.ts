import {Options, Type} from "./interfaces";

class SliderModel{
    private _min:number = 0;
    private _max:number = 10;
    private _step:number = 1;
    private _type:Type = Type.Single;
    private _value:number = 0;
    constructor({min, max, step, type, value}:Options) {

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

        if (value){
            this.value = value;
        }

        if (this._max <= this._min){
            throw "min must be less than max";
        }
        if ((this._max - this._min) < 0){
            throw "diff between max and min must be at least one step"
        }
        if (value && value < this._min){
            throw "init value must be more or equal min";
        }
        if (value && value > this._max){
            throw "init value must be less or equal max";
        }

        if (!value){
            this.value = Math.round((this._max - this._min)/2);
        }

    }
    public get value(){
        return this._value;
    }
    public set value(v){
        this._value = v;
    }

}

export { SliderModel };