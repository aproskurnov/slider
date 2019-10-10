import chai from 'chai'
import {SliderModel} from "../src/SliderModel";



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

        it('more than 2 handlers, middle > right', ()=>{
            let fn = function(){new SliderModel({min:0, max:9, values:[2, 7, 4]})};
            chai.expect(fn).to.throw();
        });

        it('more than 2 handlers, left > middle', ()=>{
            let fn = function(){new SliderModel({min:0, max:9, values:[7, 2, 8]})};
            chai.expect(fn).to.throw();
        });

        it('diff max and min proportional steps', ()=>{
            let model = new SliderModel({min:4, max:13, step: 2});
            chai.assert.equal(model.max, 14);
        });
    });

    describe('value setter calculation', ()=>{
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

        it('more than 2 handlers, middle set value equal right, need place before right', ()=>{
            let model = new SliderModel({min:0, max:9, values:[2, 4, 7]});
            model.values = [2, 7, 7];
            chai.expect(model.values).to.eql([2, 6, 7]);
        });

        it('more than 2 handlers, middle set value more than right, need place before right', ()=>{
            let model = new SliderModel({min:0, max:9, values:[2, 4, 7]});
            model.values = [2, 8, 7];
            chai.expect(model.values).to.eql([2, 6, 7]);
        });

        it('more than 2 handlers, middle set value equal left, need place after left', ()=>{
            let model = new SliderModel({min:0, max:9, values:[2, 4, 7]});
            model.values = [2, 2, 7];
            chai.expect(model.values).to.eql([2, 3, 7]);
        });

        it('more than 2 handlers, middle set value less than left, need place after left', ()=>{
            let model = new SliderModel({min:0, max:9, values:[2, 4, 7]});
            model.values = [2, 1, 7];
            chai.expect(model.values).to.eql([2, 3, 7]);
        });

        it('3 handlers, 2 changed, right > max, exception', ()=>{
            let model = new SliderModel({min:0, max:9, step:1, values:[2, 4, 7]});
            chai.expect(()=>{model.values = [2, 5, 10]}).to.throw();
        });

        it('3 handlers, 2 changed, left > min, exception', ()=>{
            let model = new SliderModel({min:0, max:9, step:1, values:[2, 4, 7]});
            chai.expect(()=>{model.values = [-1, 5, 7]}).to.throw();
        });

        it('3 handlers, 2 changed, left === middle, exception', ()=>{
            let model = new SliderModel({min:0, max:9, step:1, values:[2, 4, 7]});
            chai.expect(()=>{model.values = [5, 5, 7]}).to.throw();
        });

        it('3 handlers, 2 changed, left > middle, exception', ()=>{
            let model = new SliderModel({min:0, max:9, step:1, values:[2, 4, 7]});
            chai.expect(()=>{model.values = [3, 2, 7]}).to.throw();
        });

        it('3 handlers, 2 changed,  middle > right, exception', ()=>{
            let model = new SliderModel({min:0, max:9, step:1, values:[2, 4, 7]});
            chai.expect(()=>{model.values = [2, 8, 6]}).to.throw();
        });

    });

    describe('position', ()=>{
        it('convert view position to model value ', ()=>{
            let model = new SliderModel({min:4, max:14, step:2});
            model.positions = [20];
            chai.assert.equal(model.values[0], 6);
        });

        it('convert model value to view position (1 val) ', ()=>{
            let model = new SliderModel({min:4, max:14, step:2});
            model.values = [6];
            chai.assert.equal(model.positions[0], 20);
        });

        it('convert model value to view position (2 val)', ()=>{
            let model = new SliderModel({min:4, max:14, step:2});
            model.values = [6, 8];
            chai.expect(model.positions).to.eql([20, 40]);
        });

        it('convert model value to view position (3 val)', ()=>{
            let model = new SliderModel({min:4, max:14, step:2});
            model.values = [6, 8, 10];
            chai.expect(model.positions).to.eql([20, 40, 60]);
        });

    });

    describe('move', ()=>{
        it('x = 30 set to 20', ()=>{
            let model = new SliderModel({min:4, max:14, step:2});
            model.move(10, 100, 0, 30);
            chai.assert.equal(model.positions[0], 20);
        });
        it('less than 0 set to min', ()=>{
            let model = new SliderModel({min:4, max:14, step:2});
            model.move(10, 100, 0, -10);
            chai.assert.equal(model.positions[0], 0);
        });
        it('more than 100 set to max', ()=>{
            let model = new SliderModel({min:4, max:14, step:2});
            model.move(10, 100, 0, 110);
            chai.assert.equal(model.positions[0], 100);
        });
    });

    describe('min/max', ()=>{
        it('set min > left handle, throw exception', ()=>{
            let model = new SliderModel({min:0, max:9, values:[3]});
            chai.expect(()=>{model.min = 4}).to.throw();
        });

        it('set max < right handle, throw exception', ()=>{
            let model = new SliderModel({min:0, max:9, values:[3]});
            chai.expect(()=>{model.max = 2}).to.throw();
        });
    });

    describe('setValue', ()=>{
        it('round to the nearest step up', ()=>{
            let model = new SliderModel({min:0, max:9, step:3});
            model.setValue(5, 0);
            chai.assert.equal(model.values[0], 6);
        });
        it('round to the nearest step down ', ()=>{
            let model = new SliderModel({min:0, max:9, step:3});
            model.setValue(4, 0);
            chai.assert.equal(model.values[0], 3);
        });
        it('if less than min => return min', ()=>{
            let model = new SliderModel({min:0, max:9, step:1});
            model.setValue(-5, 0);
            chai.assert.equal(model.values[0], model.min);
        });
        it('if more than max => return max', ()=>{
            let model = new SliderModel({min:0, max:9, step:1});
            model.setValue(10, 0);
            chai.assert.equal(model.values[0], model.max);
        });
    });

});