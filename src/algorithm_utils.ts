const WHITE = '1';

import {Dimensions} from './interfaces'
import {PixelDequeNode} from './interfaces'

export function isWithinBounds(pixel: PixelDequeNode, dimensions: Dimensions): boolean {
    let pixelWithinXBounds: boolean = (pixel.x > 0 && pixel.x < dimensions.width + 1);
    let pixelWithinYBounds: boolean = (pixel.y > 0 && pixel.y < dimensions.height + 1);
    return (pixelWithinXBounds && pixelWithinYBounds);
}

function pushWhitePixel(pixelDeque: PixelDequeNode[], x: number, y: number) {
    pixelDeque.push({
        'distance': 0,
        'x': x,
        'y': y,
        'goLeft': true,
        'goRight': true,
        'goUp': true,
        'goDown': true });
}

export function findWhitePixelsInLine(line: string, pixelDeque: PixelDequeNode[], y: number) {
    let index: number = line.length;
    while (index--) {
        let pixelIsWhite: boolean = line[index] == WHITE;
        if (pixelIsWhite)
            pushWhitePixel(pixelDeque, index + 1, y);
    }
}

export function pushPixelDistanceToMap(distanceMap: number[], pixelIndex: number, pixelDistance: number) {
    distanceMap[pixelIndex] = pixelDistance;
}

function pushLeftPixel(pixel: PixelDequeNode, pixelDeque: PixelDequeNode[]) {
    pixelDeque.push({
        'distance': pixel.distance + 1,
        'x': pixel.x - 1,
        'y': pixel.y,
        'goLeft': true,
        'goRight': false,
        'goUp': true,
        'goDown': true });
}

function pushRightPixel(pixel: PixelDequeNode, pixelDeque: PixelDequeNode[]) {
    pixelDeque.push({
        'distance': pixel.distance + 1,
        'x': pixel.x + 1,
        'y': pixel.y,
        'goLeft': false,
        'goRight': true,
        'goUp': true,
        'goDown': true });
}

function pushUpPixel(pixel: PixelDequeNode, pixelDeque: PixelDequeNode[]) {
    pixelDeque.push({
        'distance': pixel.distance + 1,
        'x': pixel.x,
        'y': pixel.y - 1,
        'goLeft': false,
        'goRight': false,
        'goUp': true,
        'goDown': false });
}

function pushDownPixel(pixel: PixelDequeNode, pixelDeque: PixelDequeNode[]) {
    pixelDeque.push({
        'distance': pixel.distance + 1,
        'x': pixel.x,
        'y': pixel.y + 1,
        'goLeft': false,
        'goRight': false,
        'goUp': false,
        'goDown': true });
}

export function pushSurroundingPixelsToDeque(pixel: PixelDequeNode, pixelDeque: PixelDequeNode[]) {
    switch (true) {
        case pixel.goLeft:
            pushLeftPixel(pixel, pixelDeque);
        case pixel.goRight:
            pushRightPixel(pixel, pixelDeque);
        case pixel.goUp:
            pushUpPixel(pixel, pixelDeque);
        case pixel.goDown:
            pushDownPixel(pixel, pixelDeque);
    }
}