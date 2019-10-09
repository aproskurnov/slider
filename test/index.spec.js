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
            let fn = ()=>{new SliderModel({min:10, max:9})};
            chai.expect(fn).to.throw();
        });

        it('default max < min', ()=>{
            let fn = ()=>{new SliderModel({max:-5})};
            chai.expect(fn).to.throw();
        });

        it('max == min', ()=>{
            let fn = ()=>{new SliderModel({min:10, max:10})};
            chai.expect(fn).to.throw();
        });

        it('init handlers more than 2', ()=>{
            let fn = ()=>{new SliderModel({min:0, max:9, values:[1, 3, 5]})};
            chai.expect(fn).to.throw();
        });

        it('init value of 1 handler > 2 handler', ()=>{
            let fn = ()=>{new SliderModel({min:0, max:9, values:[4, 3]})};
            chai.expect(fn).to.throw();
        });

        it('init value of 1 handler === 2 handler', ()=>{
            let fn = ()=>{new SliderModel({min:0, max:9, values:[3, 3]})};
            chai.expect(fn).to.throw();
        });

        it('init val1 < min', ()=>{
            let fn = ()=>{new SliderModel({min:0, max:9, values:[-4]})};
            chai.expect(fn).to.throw();
        });
        it('init val1 > max', ()=>{
            let fn = ()=>{new SliderModel({min:0, max:9, values:[10]})};
            chai.expect(fn).to.throw();
        });

        it('2 handlers, init val2 > max', ()=>{
            let fn = function(){new SliderModel({min:0, max:9, values:[8, 10]})};
            chai.expect(fn).to.throw();
        });

        it('diff max and min proportional steps', ()=>{
            let model = new SliderModel({min:4, max:13, step: 2});
            chai.assert.equal(model.max, 14);
        });
    });

    describe('setValue calculation', ()=>{
        it('round to the nearest step up', ()=>{
            let model = new SliderModel({min:0, max:9, step:3});
            model.values = [5];
            chai.assert.equal(model.values[0], 6);
        });
        it('round to the nearest step down ', ()=>{
            let model = new SliderModel({min:0, max:9, step:3});
            model.values = [4];
            chai.assert.equal(model.values[0], 3);
        });
        it('if less than min => return min', ()=>{
            let model = new SliderModel({min:0, max:9, step:1});
            model.values = [-5];
            chai.assert.equal(model.values[0], model.min);
        });
        it('if more than max => return max', ()=>{
            let model = new SliderModel({min:0, max:9, step:1});
            model.values = [10];
            chai.assert.equal(model.values[0], model.max);
        });

        it('2 handlers, left changed, now its equal right, put before right', ()=>{
            let model = new SliderModel({min:0, max:9, step:1, values:[2, 4]});
            model.values = [4, 4];
            chai.expect(model.values).to.eql([3, 4]);
        });

        it('2 handlers, left changed, now its more than right, put before right', ()=>{
            let model = new SliderModel({min:0, max:9, step:1, values:[2, 4]});
            model.values = [5, 4];
            chai.expect(model.values).to.eql([3, 4]);
        });

        it('2 handlers, right changed, now its equal left, put after left', ()=>{
            let model = new SliderModel({min:0, max:9, step:1, values:[2, 4]});
            model.values = [2, 2];
            chai.expect(model.values).to.eql([2, 3]);
        });

        it('2 handlers, right changed, now its less than left, put after left', ()=>{
            let model = new SliderModel({min:0, max:9, step:1, values:[2, 4]});
            model.values = [2, 1];
            chai.expect(model.values).to.eql([2, 3]);
        });

        it('2 handlers, both changed, left === right, exception', ()=>{
            let model = new SliderModel({min:0, max:9, step:1, values:[2, 4]});
            chai.expect(()=>{model.values = [3, 3];}).to.throw();
        });

        it('more than 2 handlers', ()=>{
            let model = new SliderModel({min:0, max:9, values:[2, 4]});
            chai.expect(()=>{model.values = [1, 2, 3]}).to.throw();
        });

        it('2 handlers, both changed, left > right, exception', ()=>{
            let model = new SliderModel({min:0, max:9, step:1, values:[2, 4]});
            chai.expect(()=>{model.values = [5, 3]}).to.throw();
        });

        it('2 handlers, both changed, left < min, exception', ()=>{
            let model = new SliderModel({min:0, max:9, step:1, values:[2, 4]});
            chai.expect(()=>{model.values = [-1, 0]}).to.throw();
        });

        it('2 handlers, both changed, right > max, exception', ()=>{
            let model = new SliderModel({min:0, max:9, step:1, values:[2, 4]});
            chai.expect(()=>{model.values = [5, 10]}).to.throw();
        });

    });

    describe('position', ()=>{
        it('convert view position to model value ', ()=>{
            let model = new SliderModel({min:4, max:14, step:2});
            model.positions = [20];
            chai.assert.equal(model.values[0], 6);
        });

        it('convert model value to view position ', ()=>{
            let model = new SliderModel({min:4, max:14, step:2});
            model.values = [6];
            chai.assert.equal(model.positions[0], 20);
        });
    });

    describe('move', ()=>{
        it('x = 30 set to 20', ()=>{
            let model = new SliderModel({min:4, max:14, step:2});
            model.move(10, 100, 0, 30);
            chai.assert.equal(model.positions[0], 20);
        });
        it('less than 0 set to min', ()=>{
            let model = new SliderModel({min:4, max:14, step:2, type:Type.Single});
            model.move(10, 100, 0, -10);
            chai.assert.equal(model.positions[0], 0);
        });
        it('more than 100 set to max', ()=>{
            let model = new SliderModel({min:4, max:14, step:2, type:Type.Single});
            model.move(10, 100, 0, 110);
            chai.assert.equal(model.positions[0], 100);
        });
    });

    describe('added interface', ()=>{
        it('set min < left handle, throw exception', ()=>{
            let model = new SliderModel({min:0, max:9, values:[3]});
            chai.expect(()=>{model.min = 4}).to.throw();
        });

        it('set max > right handle, throw exception', ()=>{
            let model = new SliderModel({min:0, max:9, values:[3]});
            chai.expect(()=>{model.max = 10}).to.throw();
        });
    });

});