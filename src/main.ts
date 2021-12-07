const WHITE = '1';

import fs from 'fs'
import Denque from 'denque'
import {getNumberOfMaps} from './validation'
import {exitWithError} from './validation'
import {setMapDimensionsIfValid} from './validation'
import {mapIsValid} from './validation'
import {Dimensions} from './interfaces'
import {PixelDequeNode} from './interfaces'
import {isWithinBounds} from './algorithm_utils'
import {pushPixelDistanceToMap} from './algorithm_utils'
import {pushSurroundingPixelsToDeque} from './algorithm_utils'
import {findWhitePixelsInLine} from './algorithm_utils'

function fillDistanceMap(distanceMap: number[], pixelDeque: any, dimensions: Dimensions) {
    while (!pixelDeque.isEmpty()) {
        let pixel: PixelDequeNode = pixelDeque.peekFront();
        let pixelWithinBounds: boolean = isWithinBounds(pixel, dimensions);
        let pixelIndex: number = pixel.x - 1 + ((pixel.y - 1) * dimensions.width);
        let pixelDistanceNotInMap: boolean = !(typeof distanceMap[pixelIndex] !== 'undefined');

        if (pixelWithinBounds && pixelDistanceNotInMap) {
            pushPixelDistanceToMap(distanceMap, pixelIndex, pixel.distance);
            pushSurroundingPixelsToDeque(pixel, pixelDeque);
        }
        pixelDeque.shift();
    }
}

function printDistanceMap(distanceMap: number[], dimensions: Dimensions) {
    let outputString: string = distanceMap[0].toString();
    const indexEnd: number = dimensions.height * dimensions.width;
    let i: number = 1;

    while (i < indexEnd) {
        if (i % dimensions.width == 0)
            outputString += '\n';
        else
            outputString += ' ';
        outputString += distanceMap[i];
        i++;
    }

    console.log(outputString);
}

function printEmptyLine(moreMapsComing: boolean) {
    if (moreMapsComing)
        console.log('\n');
}

function main() {
    let index: number = 0;
    const numberOfMaps: number = getNumberOfMaps(inputArray[index]);
    if (numberOfMaps == 0 || numberOfMaps > 1000)
        exitWithError("invalid number of maps");

    let dimensions: Dimensions = { 'height': 0, 'width': 0 };
    for (let i: number = 0; i < numberOfMaps; i++) {
        if (!(index < inputArray.length - 1))
            exitWithError("more maps expected");
        index++
        if (setMapDimensionsIfValid(dimensions, inputArray[index]) && mapIsValid(dimensions, inputArray, index)) {
            let distanceMap: number[] = new Array(dimensions.height * dimensions.width);
            let pixelDeque: any = new Denque();
            for (let j: number = 1; j <= dimensions.height; j++) {
                findWhitePixelsInLine(inputArray[index + j], pixelDeque, j);
            }
            let noWhitePixelsInMap: boolean = pixelDeque.isEmpty();
            if (noWhitePixelsInMap)
                exitWithError("invalid map with no white pixels");
            fillDistanceMap(distanceMap, pixelDeque, dimensions);
            printDistanceMap(distanceMap, dimensions);
            printEmptyLine((i < numberOfMaps - 1));
            index += dimensions.height + 1;
        } else {
            exitWithError("invalid map");
        }
    }
}

export const inputArray: string[] = fs.readFileSync('/dev/stdin').toString().split('\n');
main();
