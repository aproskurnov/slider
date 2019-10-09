export enum Orientation{
    Vertical,
    Horizontal
}

export interface Options {
    min?: number,
    max?: number,
    step?: number,
    tooltip?: boolean,
    orientation?: Orientation,
    values?: number[]
}

export interface SliderEvents {
    onMouseDown(e:MouseEvent):void,
    onMouseUp(e:MouseEvent):void,
    onMouseMove(e:MouseEvent):void
    onMouseLeave(e:MouseEvent):void
}

export interface Handler {
    handler: HTMLElement,
    tooltip: HTMLElement
}