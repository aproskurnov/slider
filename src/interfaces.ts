export enum Orientation{
    Vertical,
    Horizontal
}

export enum Type{
    Single,
    Range
}

export interface Options {
    min?: number,
    max?: number,
    step?: number,
    showValue?: boolean,
    orientation?: Orientation,
    type?:Type,
    value?: number
}

export interface SliderEvents {
    onMouseDown():void,
    onMouseUp():void,
    onMouseMove(e:MouseEvent):void
    onMouseLeave(e:Event):void
}