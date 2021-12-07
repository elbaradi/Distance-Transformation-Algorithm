"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputArray = void 0;
const WHITE = '1';
const fs_1 = __importDefault(require("fs"));
const denque_1 = __importDefault(require("denque"));
const validation_1 = require("./validation");
const validation_2 = require("./validation");
const validation_3 = require("./validation");
const validation_4 = require("./validation");
const algorithm_utils_1 = require("./algorithm_utils");
const algorithm_utils_2 = require("./algorithm_utils");
const algorithm_utils_3 = require("./algorithm_utils");
function fillDistanceMap(distanceMap, pixelDeque, dimensions) {
    while (!pixelDeque.isEmpty()) {
        let pixel = pixelDeque.peekFront();
        let pixelWithinBounds = (pixel.x > 0 && pixel.x < dimensions.width + 1 && pixel.y > 0 && pixel.y < dimensions.height + 1);
        let pixelIndex = pixel.x - 1 + ((pixel.y - 1) * dimensions.width);
        let pixelDistanceNotInMap = !(typeof distanceMap[pixelIndex] !== 'undefined');
        if (pixelWithinBounds && pixelDistanceNotInMap) {
            (0, algorithm_utils_1.pushPixelDistanceToMap)(distanceMap, pixelIndex, pixel.distance);
            (0, algorithm_utils_2.pushSurroundingPixelsToDeque)(pixel, pixelDeque);
        }
        pixelDeque.shift();
    }
}
function printDistanceMap(distanceMap, dimensions) {
    let outputString = distanceMap[0].toString();
    const indexEnd = dimensions.height * dimensions.width;
    let i = 1;
    while (i < indexEnd) {
        if (i % dimensions.width == 0)
            outputString += '\n';
        else
            outputString += ' ';
        outputString += distanceMap[i];
        i++;
    }
    outputString += '\n';
    console.log(outputString);
}
function main() {
    let index = 0;
    const nbrOfMaps = (0, validation_1.getNumberOfMaps)(exports.inputArray[index]);
    if (nbrOfMaps == 0 || nbrOfMaps > 1000)
        (0, validation_2.exitWithError)("ERR_INVALID_NBR_OF_MAPS");
    let dimensions = { 'height': 0, 'width': 0 };
    for (let i = 0; i < nbrOfMaps; i++) {
        if (!(index < exports.inputArray.length - 1))
            (0, validation_2.exitWithError)("ERR_INVALID_NBR_OF_MAPS");
        index++;
        if ((0, validation_3.setMapDimensionsIfValid)(dimensions, exports.inputArray[index]) && (0, validation_4.mapIsValid)(dimensions, exports.inputArray, index)) {
            let distanceMap = new Array(dimensions.height * dimensions.width);
            let pixelDeque = new denque_1.default();
            for (let j = 1; j <= dimensions.height; j++) {
                (0, algorithm_utils_3.findWhitePixelsInLine)(exports.inputArray[index + j], pixelDeque, j);
            }
            let noWhitePixelsInMap = pixelDeque.isEmpty();
            if (noWhitePixelsInMap)
                (0, validation_2.exitWithError)("ERR_INVALID_MAP_NO_WHITE_PIXEL");
            fillDistanceMap(distanceMap, pixelDeque, dimensions);
            printDistanceMap(distanceMap, dimensions);
            index += dimensions.height + 1;
        }
        else {
            (0, validation_2.exitWithError)("ERR_INVALID_MAP");
        }
    }
}
exports.inputArray = fs_1.default.readFileSync('/dev/stdin').toString().split('\n');
main();
