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