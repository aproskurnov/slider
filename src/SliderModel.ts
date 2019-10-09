import {Options} from "./interfaces";

class SliderModel{
    private _min:number;
    private _max:number;
    private _step:number;
    private _values:number[];
    private _positions:number[];
    private _steps:number;
    constructor({min=0, max=9, step=1, values=[]}:Options) {

        this._min = min;
        this._max = max;
        this._step = step;
        this._positions = [];
        this._values = [];

        if (this._max <= this._min){
            throw "min must be less than max";
        }
        let fraction = (this._max - this._min) % this._step;
        if (fraction !== 0){
            this._max = this._max + fraction;
        }

        this._steps = (this._max - this._min)/this._step;

        if (values.length){
            this.values = values;
        }else{
            this.values = [Math.round((this._max - this._min)/2) + this._min];
        }

    }
    public get values(){
        return this._values;
    }
    public set values(val){
        let oldValues = this.values;
        let changedPos:number | null = null;

        let changeMoreThanOne = false;
        if (oldValues.length !== val.length){
            changeMoreThanOne = true;
        }else{
            val.map(function(v, i){
                if (v !== oldValues[i]){
                    if (changedPos === null){
                        changedPos = i;
                    }else{
                        changeMoreThanOne = true;
                    }

                }
            })
        }

        if (changeMoreThanOne){
            if (val.length > 2){
                throw "count values must be less or equal 2";
            }

            val.reduce((left, current)=>{
                if (left >= current){
                    throw "left must be less than right";
                }
                return current;
            });

            if (val[0] < this._min){
                throw "values must be in range min <=> max ";
            }

            if (val[val.length - 1] > this._max){
                throw "values must be in range min <=> max ";
            }
            val.map((v, i, arr)=>{
                let value = this.convertToStepValueByValue(v);
                if ((arr[i-1] === value) || (arr[i+1] === value)){
                    throw "too close values";
                }
                arr[i] = value;
            });

        }else{
            if (changedPos === null){
                return;
            }

            val.map((v, i, arr)=>{
                if (i === changedPos){
                    let value = this.convertToStepValueByValue(v);
                    if (arr[i-1] >= value){
                        value = arr[i-1] + this._step;
                    }else if(arr[i+1] <= value){
                        value = arr[i+1] - this._step;
                    }else if (value < this._min){
                        value = this._min;
                    }else if (value > this._max){
                        value = this._max;
                    }
                    arr[i] = value;
                }
            });
        }

        this._values = val;

        this._positions = val.map((v)=>{
            let stepsCur = (v - this._min)/this._step;
            return 100/this._steps * stepsCur;
        });


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
    public get positions(){
        return this._positions;
    }
    public set positions(val){
        this.values = val.map((v)=>{
            let steps = v/(100/this._steps);
            let valInStep = (this._max - this._min)/this._steps;
            return this._min + steps * valInStep;
        });

    }
    public move(offset:number, length:number, numHandle:number, pos:number){
        let positions = this.positions;
        let relativePos = pos - offset;
        positions[numHandle] = 100 * relativePos / length;
        this.positions = positions;
    }

    private convertToStepValueByValue(val:number){
        let full = (val-this._min)/this._step + this._min>>0;
        let fraction = val - (full * this._step + this._min);
        let round = Math.round(fraction/this._step);
        return this._min + full * this._step + round * this._step;
    }

}

export { SliderModel };