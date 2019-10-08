import {Options, Type} from "./interfaces";

class SliderModel{
    private _min:number;
    private _max:number;
    private _step:number;
    private _type:Type;
    private _value:number;
    private _position:number;
    private _steps:number;
    constructor({min=0, max=9, step=1, type=Type.Single, value}:Options) {

        this._min = min;
        this._max = max;
        this._step = step;
        this._type = type;
        this._value = this._min;
        this._position = 0;

        if (this._max <= this._min){
            throw "min must be less than max";
        }
        let fraction = (this._max - this._min) % this._step;
        if (fraction !== 0){
            this._max = this._max + fraction;
        }

        this._steps = (this._max - this._min)/this._step;

        if (value){
            this.value = value;
        }else{
            this.value = Math.round((this._max - this._min)/2) + this._min;
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
            let full = (v-this._min)/this._step + this._min>>0;
            let fraction = v - (full * this._step + this._min);
            let round = Math.round(fraction/this._step);
            this._value = this._min + full * this._step + round * this._step;
        }

        let stepsCur = (this._value - this._min)/this._step;
        this._position = 100/this._steps * stepsCur;
    }

    public get min(){
        return this._min;
    }
    public get max(){
        return this._max;
    }
    public get steps(){
        return this._steps;
    }
    public get position(){
        return this._position;
    }
    public set position(v){
        let steps = v/(100/this._steps);
        let valInStep = (this._max - this._min)/this._steps;
        this.value = this._min + steps * valInStep;
    }
    public move(offset:number, length:number, pos:number){
        let relativePos = pos - offset;
        this.position = 100 * relativePos / length;
    }

}

export { SliderModel };