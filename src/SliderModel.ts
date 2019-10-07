import {Options, Type} from "./interfaces";

class SliderModel{
    private _min:number;
    private _max:number;
    private _step:number;
    private _type:Type;
    private _value:number;
    constructor({min=0, max=9, step=1, type=Type.Single, value}:Options) {

        this._min = min;
        this._max = max;
        this._step = step;
        this._type = type;
        this._value = this._min;

        if (this._max <= this._min){
            throw "min must be less than max";
        }
        let fraction = (this._max - this._min) % this._step;
        if (fraction !== 0){
            this._max = this._max + fraction;
        }

        if (value){
            this.value = value;
        }else{
            this.value = Math.round((this._max - this._min)/2);
        }

    }
    public get value(){
        return this._value;
    }
    public set value(v){
        if (v > this._max){
            this._value = this._max;
        }else if( v < this._min){
            this._value = this._min;
        }else{
            let full = (v-this._min)/this._step>>0;
            let fraction = v - (full * this._step + this._min);
            let round = Math.round(fraction/this._step);
            this._value = this._min + full * this._step + round * this._step;
        }
    }

    public get min(){
        return this._min;
    }
    public get max(){
        return this._max;
    }

}

export { SliderModel };