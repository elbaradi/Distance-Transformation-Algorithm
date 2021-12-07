"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushSurroundingPixelsToDeque = exports.pushPixelDistanceToMap = exports.findWhitePixelsInLine = void 0;
const WHITE = '1';
function pushWhitePixel(pixelDeque, x, y) {
    pixelDeque.push({
        'distance': 0,
        'x': x,
        'y': y,
        'goLeft': true,
        'goRight': true,
        'goUp': true,
        'goDown': true
    });
}
function findWhitePixelsInLine(line, pixelDeque, y) {
    let index = line.length;
    while (index--) {
        let pixelIsWhite = line[index] == WHITE;
        if (pixelIsWhite)
            pushWhitePixel(pixelDeque, index + 1, y);
    }
}
exports.findWhitePixelsInLine = findWhitePixelsInLine;
function pushPixelDistanceToMap(distanceMap, pixelIndex, pixelDistance) {
    distanceMap[pixelIndex] = pixelDistance;
}
exports.pushPixelDistanceToMap = pushPixelDistanceToMap;
function pushLeftPixel(pixel, pixelDeque) {
    pixelDeque.push({
        'distance': pixel.distance + 1,
        'x': pixel.x - 1,
        'y': pixel.y,
        'goLeft': true,
        'goRight': false,
        'goUp': true,
        'goDown': true
    });
}
function pushRightPixel(pixel, pixelDeque) {
    pixelDeque.push({
        'distance': pixel.distance + 1,
        'x': pixel.x + 1,
        'y': pixel.y,
        'goLeft': false,
        'goRight': true,
        'goUp': true,
        'goDown': true
    });
}
function pushUpPixel(pixel, pixelDeque) {
    pixelDeque.push({
        'distance': pixel.distance + 1,
        'x': pixel.x,
        'y': pixel.y - 1,
        'goLeft': false,
        'goRight': false,
        'goUp': true,
        'goDown': false
    });
}
function pushDownPixel(pixel, pixelDeque) {
    pixelDeque.push({
        'distance': pixel.distance + 1,
        'x': pixel.x,
        'y': pixel.y + 1,
        'goLeft': false,
        'goRight': false,
        'goUp': false,
        'goDown': true
    });
}
function pushSurroundingPixelsToDeque(pixel, pixelDeque) {
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
exports.pushSurroundingPixelsToDeque = pushSurroundingPixelsToDeque;
