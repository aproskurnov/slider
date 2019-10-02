import {Options} from "./interfaces";
import {SliderController} from "./SliderController";

declare global{
    interface JQuery{
        slider: (this:JQuery, options: Options)=>JQuery;
    }
}

(function($) {
    $.fn.slider = function(this: JQuery, options:Options){
            return this.each(function(){
                if (!$.data(this, "slider")){
                    $.data(this, "slider", new SliderController(this, options));
                }
            })
    };
}(jQuery));

$('.test').slider({});

