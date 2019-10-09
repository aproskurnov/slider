import "./slider.scss"

import {Options, Orientation} from "./interfaces";
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

$('.test1').slider({min: -10000, max: 30000, values:[20000], step:1000, tooltip:true});
$('.test2').slider({min:4, max:14, values:[8]});
$('.test3').slider({min:0, max:10, values:[2, 5], tooltip:true});
$('.test4').slider({min:-10, max: 5, values: [0, 3], orientation:Orientation.Vertical, tooltip:true});

