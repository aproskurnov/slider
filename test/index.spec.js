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

        it('init value < min, val = min', ()=>{
            let model = new SliderModel({min:2, max:9, value: 1});
            chai.assert.equal(model.value, 2);
        });

        it('init value > max, val = max', ()=>{
            let model = new SliderModel({min:0, max:9, value: 10});
            chai.assert.equal(model.value, 9);
        });

        it('diff max and min proportional steps', ()=>{
            let model = new SliderModel({min:4, max:13, step: 2});
            chai.assert.equal(model.max, 14);
        });
    });

    describe('setValue calculation', ()=>{
        it('single type, round to the nearest step up', ()=>{
            let model = new SliderModel({min:0, max:9, step:3, type:Type.Single});
            model.value = 5;
            chai.assert.equal(model.value, 6);
        });
        it('single type, round to the nearest step down ', ()=>{
            let model = new SliderModel({min:0, max:9, step:3, type:Type.Single});
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

    describe('position', ()=>{
        it('convert view position to model value ', ()=>{
            let model = new SliderModel({min:0, max:10, step:1, type:Type.Single});
            model.position = 20;
            chai.assert.equal(model.value, 2);
        });

        it('convert model value to view position ', ()=>{
            let model = new SliderModel({min:0, max:10, step:1, type:Type.Single});
            model.value = 2;
            chai.assert.equal(model.position, 20);
        });
    })
});