import "./slider.scss"
import "../examples/example1.scss"

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


interface sliderInterface{
    min:JQuery,
    max:JQuery,
    val1:JQuery,
    val2?:JQuery,
    val3?:JQuery,
    tooltip:JQuery,
    slider:JQuery
}

try {

    let min = $('#min1');
    let max = $('#max1');
    let val1 = $('#value1_1');
    let tooltip = $('#tooltip1');

    let slider = $('.slider1').slider({
        min: -10000, max: 30000, values:[20000], step:1000, tooltip:true,
        callbacks:{onMove(val: number[]): void {
                val1.val(val[0]);
            }}
    });

    fillInterface({
        slider:slider,
        min:min,
        max:max,
        val1:val1,
        tooltip:tooltip
    });

}
catch (e) {
    alert("slider1 error: " + e);
}

try {

    let min = $('#min2');
    let max = $('#max2');
    let val1 = $('#value2_1');
    let tooltip = $('#tooltip2');

    let slider = $('.slider2').slider({
        min:4, max:14, values:[8],
        callbacks:{onMove(val: number[]): void {
                val1.val(val[0]);
            }}
    });

    fillInterface({
        slider:slider,
        min:min,
        max:max,
        val1:val1,
        tooltip:tooltip
    });

}
catch (e) {
    alert("slider2 error: " + e);
}

try {

    let min = $('#min3');
    let max = $('#max3');
    let val1 = $('#value3_1');
    let val2 = $('#value3_2');
    let val3 = $('#value3_3');
    let tooltip = $('#tooltip3');

    let slider = $('.slider3').slider({
        min:0, max:10, values:[2, 5, 6], tooltip:true,
        callbacks:{onMove(val: number[]): void {
                val1.val(val[0]);
                val2.val(val[1]);
                val3.val(val[2]);
            }}
    });

    fillInterface({
        slider:slider,
        min:min,
        max:max,
        val1:val1,
        val2:val2,
        val3:val3,
        tooltip:tooltip
    });


}
catch (e) {
    alert("slider3 error: " + e);
}

try {

    let min = $('#min4');
    let max = $('#max4');
    let val1 = $('#value4_1');
    let val2 = $('#value4_2');
    let tooltip = $('#tooltip4');

    let slider = $('.slider4').slider({
        min:-10, max: 5, values: [0, 3], orientation:Orientation.Vertical, tooltip:true,
        callbacks:{onMove(val: number[]): void {
                val1.val(val[0]);
                val2.val(val[1]);
            }}
    });

    fillInterface({
        slider:slider,
        min:min,
        max:max,
        val1:val1,
        val2:val2,
        tooltip:tooltip
    });

}
catch (e) {
    alert("slider4 error: " + e);
}

function fillInterface(data:sliderInterface){
    data.min.val(data.slider.data('slider').min);
    data.max.val(data.slider.data('slider').max);
    data.val1.val(data.slider.data('slider').values[0]);
    data.tooltip.prop('checked', (data.slider.data('slider').tooltip));

    data.min.on('blur', null, function(){
        let el = <HTMLInputElement>this;
        try {
            data.slider.data('slider').min = Number(el.value);
        }
        catch (e) {
            alert("error: " + e);
            el.value = (data.slider.data('slider').min);
        }
    });

    data.max.on('blur', null, function(){
        let el = <HTMLInputElement>this;
        try {
            data.slider.data('slider').max = Number(el.value);
        }
        catch (e) {
            alert("error: " + e);
            el.value = (data.slider.data('slider').max);
        }
    });

    data.val1.on('blur', null, function(){
        let el = <HTMLInputElement>this;
        try {
            data.slider.data('slider').setValue(Number(el.value), 0);
        }
        catch (e) {
            alert("error: " + e);
        }
        el.value = (data.slider.data('slider').values[0]);
    });

    if (data.val2){
        data.val2.on('blur', null, function(){
            let el = <HTMLInputElement>this;
            try{
                data.slider.data('slider').setValue(Number(el.value), 1)
            }
            catch (e) {
                alert("error: " + e);
            }
            el.value = (data.slider.data('slider').values[1]);
        });
        data.val2.val(data.slider.data('slider').values[1]);
    }

    if (data.val3){
        data.val3.on('blur', null, function(){
            let el = <HTMLInputElement>this;
            try{
                data.slider.data('slider').setValue(Number(el.value), 2)
            }
            catch (e) {
                alert("error: " + e);
            }
            el.value = (data.slider.data('slider').values[2]);
        });
        data.val3.val(data.slider.data('slider').values[2]);
    }

    data.tooltip.on('change', null, function(){
        let el = <HTMLInputElement>this;
        data.slider.data('slider').tooltip = el.checked;
    });
}
