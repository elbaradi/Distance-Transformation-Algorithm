import { PixelDequeNode } from './interface';
export declare function findWhitePixelsInLine(line: string, pixelDeque: PixelDequeNode[], y: number): void;
export declare function pushPixelDistanceToMap(distanceMap: number[], pixelIndex: number, pixelDistance: number): void;
export declare function pushSurroundingPixelsToDeque(pixel: PixelDequeNode, pixelDeque: PixelDequeNode[]): void;
