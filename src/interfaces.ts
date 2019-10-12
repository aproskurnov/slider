export enum Orientation{
    Vertical,
    Horizontal
}

export interface Options {
    min?: number,
    max?: number,
    step?: number,
    label?: boolean,
    orientation?: Orientation,
    values?: number[],
    callbacks?:Callbacks
}

export interface SliderEvents {
    onMouseDown(e:MouseEvent|TouchEvent):void,
    onMouseUp(e:MouseEvent|TouchEvent):void,
    onMouseMove(e:MouseEvent|TouchEvent):void
    onMouseLeave(e:MouseEvent|TouchEvent):void
}

export interface Handler {
    handler: HTMLElement,
    label: HTMLElement
}

export interface Callbacks {
    onMove?(val:number[]):void
}