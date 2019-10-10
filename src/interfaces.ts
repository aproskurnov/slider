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
    onMouseDown(e:MouseEvent):void,
    onMouseUp(e:MouseEvent):void,
    onMouseMove(e:MouseEvent):void
    onMouseLeave(e:MouseEvent):void
}

export interface Handler {
    handler: HTMLElement,
    label: HTMLElement
}

export interface Callbacks {
    onMove?(val:number[]):void
}