import "./slider.scss"

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

$('.test1').slider({});
$('.test2').slider({min:4, max:14, value:8});
$('.test3').slider({min:0, max:10});
$('.test4').slider({min:-10, max: 5, value: 0});

