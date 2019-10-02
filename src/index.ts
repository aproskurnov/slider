interface JQuery{
    slider: (options: object)=>void
}

enum Orientation{
    Vertical,
    Horizontal
}

enum Type{
    Single,
    Range
}

interface Options {
    min?: number,
    max?: number,
    step?: number,
    showValue?: boolean,
    orientation?: Orientation,
    type?:Type
}

class SliderModel{
    private min:number;
    private max:number;
    private step:number;
    constructor({min = 0, max = 10, step = 1}) {
        this.min = min;
        this.max = max;
        this.step = step;
    }

}

class SliderView{
    private showValue:boolean;
    private orientation:Orientation;
    constructor({showValue = false, orientation = Orientation.Horizontal}){
        this.showValue = showValue;
        this.orientation = orientation;
    }
}

class SliderController{
    private readonly model:SliderModel;
    private readonly view: SliderView;
    constructor(node: HTMLElement, options: Options){
        this.view = new SliderView(options);
        this.model = new SliderModel(options);
    }
}

(function($) {
    $.fn.slider = function(options:Options){
        return this.each(function(){
            if (!$.data(this, "slider")){
                $.data(this, "slider", new SliderController(this, options));
            }
        })
    }
}(jQuery));

$('.test').slider({});