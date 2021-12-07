export interface Dimensions {
    height: number;
    width: number;
}
export interface PixelDequeNode {
    distance: number;
    x: number;
    y: number;
    goLeft: boolean;
    goRight: boolean;
    goUp: boolean;
    goDown: boolean;
}
