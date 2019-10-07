var chai = require('chai');
import {SliderModel} from "../src/SliderModel";



describe('Test test config', () => {
    it('should just run', () => {
        chai.assert.equal(3, 3);
    });
});

describe('Slider Model tests', ()=>{
    describe('verify init params', ()=>{
        it('init max < min', ()=>{
            chai.to.throw(new SliderModel({min:10, max:9}));
        });

        it('default max < min', ()=>{
            chai.to.throw(new SliderModel({max:-5}));
        });

        it('max == min', ()=>{
            chai.to.throw(new SliderModel({min:10, max:10}));
        });

        it('init value < min', ()=>{
            chai.to.throw(new SliderModel({min:2, max:9, value: 1}));
        });

        it('init value > max', ()=>{
            chai.to.throw(new SliderModel({min:0, max:9, value: 10}));
        });

        it('diff max and min is at least one step', ()=>{
            chai.to.throw(new SliderModel({min:0, max:4, step: 5}));
        });
    });

    describe('setValue calculation', ()=>{
        it('single type, round to the nearest step up', ()=>{
            let model = new SliderModel({min:0, max:9, step:1, type:Type.Single});
            model.value = 5;
            chai.assert.equal(model.value, 6);
        });
        it('single type, round to the nearest step down ', ()=>{
            let model = new SliderModel({min:0, max:9, step:1, type:Type.Single});
            model.value = 4;
            chai.assert.equal(model.value, 3);
        });
        it('single type, if less than min => return min', ()=>{
            let model = new SliderModel({min:0, max:9, step:1, type:Type.Single});
            model.value = -5;
            chai.assert.equal(model.value, model.min);
        });
        it('single type, if more than max => return max', ()=>{
            let model = new SliderModel({min:0, max:9, step:1, type:Type.Single});
            model.value = 10;
            chai.assert.equal(model.value, model.max);
        });

    });
});