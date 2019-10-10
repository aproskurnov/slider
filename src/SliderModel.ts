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
        this._steps = 0;

        this.prepareSlider();
        this.prepareValues(values);

    }
    private prepareSlider(){
        if (this._max <= this._min){
            throw "min must be less than max";
        }
        let fraction = (this._max - this._min) % this._step;
        if (fraction !== 0){
            this._max = this._max + fraction;
        }

        this._steps = (this._max - this._min)/this._step;
    }
    private prepareValues(val:number[]){
        if (val.length){
            this.values = val;
        }else{
            this.values = [Math.round((this._max - this._min)/2) + this._min];
        }
    }
    public get values():number[]{
        return this._values;
    }
    public set values(val:number[]){
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
        this._positions = this.calculatePositionsByValue(val);

    }
    public setValue(val:number, pos:number){
        let values = this.values.slice(0);
        values[pos] = val;
        this.values = values;
    }

    public get min():number{
        return this._min;
    }
    public set min(val:number){
        if (val > this._values[0]){
            throw "min value must be less than left handler";
        }
        this._min = val;
        this.prepareSlider();
        let values = this.values;
        this.clearValue();
        this.prepareValues(values);
    }
    public get max():number{
        return this._max;
    }
    public set max(val:number){
        if (val < this._values[this._values.length - 1]){
            throw "min value must be more than right handler";
        }
        this._max = val;
        this.prepareSlider();
        let values = this.values;
        this.clearValue();
        this.prepareValues(values);
    }
    public get steps():number{
        return this._steps;
    }
    public get positions():number[]{
        return this._positions;
    }
    public set positions(val:number[]){
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

    private calculatePositionsByValue(values:number[]):number[]
    {
        return values.map((v)=>{
            let stepsCur = (v - this._min)/this._step;
            return 100/this._steps * stepsCur;
        });
    }

    private clearValue()
    {
        this._values = [];
    }

}

export { SliderModel };