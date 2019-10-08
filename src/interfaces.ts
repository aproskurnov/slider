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
    values?: number[]
}

export interface SliderEvents {
    onMouseDown(e:MouseEvent):void,
    onMouseUp():void,
    onMouseMove(e:MouseEvent):void
    onMouseLeave(e:Event):void
}