# Slider
### Demo
You can find a demo of the slider on <a href="http://slider.vxoxv.ru">this page</a>

### Description

The Slider is build as a classical MVC application. SliderModel contains business logic, 
SliderView displays data and SliderController handles user requests. Just create a new 
SliderController and pass initial parameters to the constructor.

### Options
| Variable | Description |
| --- | --- |
|min| Minimal value of range|
|max| Maximal value of range|
|step| Step size|
|label| Label visibility|
|orientation| Vertical or horizontal orientation|
|values| Initial values of handles|
|callbacks| Callbacks|

### Callbacks
| Callback | Description |
| --- | --- |
|onMove(values:number[])| Invoke after handler is moved passing new handle values |


### SliderControllers methods
| Method | Description | Type |
| --- | --- | --- |
| getter/setter max | Maximal value of range | Number |
| getter/setter min | Minimal value of range | Number |
| getter/setter label | Show label  | Boolean |
| getter value | Values of handlers | Number[] |

### Examples
The snipped below adds the slider on a page:
```javascript
let slider = new SliderController(document.querySelector('#slider'), {min: 0, max: 9});
```
See also slider.ts for a sample jQuery plugin implementation wrapping the slider


### UML diagram
![Diagram](http://slider.vxoxv.ru/slider-diagram.png)