import chai from 'chai'
import {SliderModel} from "../src/SliderModel";
import {Type} from '../src/interfaces';



describe('Test test config', () => {
    it('should just run', () => {
        chai.assert.equal(3, 3);
    });
});

describe('Slider Model tests', ()=>{
    describe('verify init params', ()=>{
        it('init max < min', ()=>{
            let fn = function(){new SliderModel({min:10, max:9})};
            chai.expect(fn).to.throw();
        });

        it('default max < min', ()=>{
            let fn = function(){new SliderModel({max:-5})};
            chai.expect(fn).to.throw();
        });

        it('max == min', ()=>{
            let fn = function(){new SliderModel({min:10, max:10})};
            chai.expect(fn).to.throw();
        });

        it('init value < min', ()=>{
            let fn = function(){new SliderModel({min:2, max:9, value: 1})};
            chai.expect(fn).to.throw();
        });

        it('init value > max', ()=>{
            let fn = function(){new SliderModel({min:0, max:9, value: 10})};
            chai.expect(fn).to.throw();
        });

        it('diff max and min is at least one step', ()=>{
            let fn = function(){new SliderModel({min:0, max:4, step: 5})};
            chai.expect(fn).to.throw();
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