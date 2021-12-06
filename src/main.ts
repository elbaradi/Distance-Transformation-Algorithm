const BLACK = '0';
const WHITE = '1';
const CHAR_CODE_ZERO = 47;
const CHAR_CODE_NINE = 57;
const NBR_MAP_SPECS = 2;
const MIN_MAP_SIZE = 1;
const MAX_MAP_SIZE = 182;
const ERR_INVALID_NBR_OF_TESTS = 401;
const ERR_INVALID_MAP = 402;
const Denque = require("denque");

function stringHasOnlyDigits(string: string): boolean {
    const stringLength = string.length;
    for (let i: number = 0; i < string.length; i++) {
      if (string.charCodeAt(i) < CHAR_CODE_ZERO || string.charCodeAt(i) > CHAR_CODE_NINE) 
        return false
    }
    return true
}

function getNumberOfTests(line: string): number {
    var nbrTests: number = 0;
    if (arrayLength > 0 && line.length > 0 && stringHasOnlyDigits(line))
        nbrTests = parseInt(line);
    return nbrTests;
}

function setMapDimensionsIfValid(dimensions: dimensions, dimensionsString: string): boolean {
    const mapSpecs: string[] = dimensionsString.split(' ');
    const mapSpecsAreCorrectlyFormatted: boolean = (mapSpecs.length == NBR_MAP_SPECS && stringHasOnlyDigits(mapSpecs[0]) && stringHasOnlyDigits(mapSpecs[1]));  
    if (mapSpecsAreCorrectlyFormatted) {
        dimensions.height = parseInt(mapSpecs[0]);
        dimensions.width = parseInt(mapSpecs[1]);
    }
    else
        return false;

    const isValidHeight: boolean = (dimensions.height >= MIN_MAP_SIZE && dimensions.height <= MAX_MAP_SIZE)
    const isValidWidth: boolean = (dimensions.width >= MIN_MAP_SIZE && dimensions.width <= MAX_MAP_SIZE)
    if (isValidHeight && isValidWidth)
        return true;
    else
        return false;
}

function isValidMapLine(line: string, dimensions: dimensions): boolean {
    const isCorrectLineLength: boolean = (line.length == dimensions.width)
    if (!isCorrectLineLength)
        return false;

    let index: number = line.length;
    while (index--) {
        let pixelIsBlackOrWhite: boolean = (line[index] == BLACK || line[index] == WHITE);
        if (!pixelIsBlackOrWhite)
            return false;
    }
    return true;
}

function mapIsValid(dimensions: dimensions, lines: string[], start: number): boolean {
    const mapHasCorrectNumberOfLines: boolean = (arrayLength > start + dimensions.height);
    if (!mapHasCorrectNumberOfLines)
        inputError(ERR_INVALID_MAP);

    const mapEndsWithEOFOrEmptyLine: boolean = ((arrayLength == start + dimensions.height + 1) || (lines[start + dimensions.height + 1].length == 0));
    if (!mapEndsWithEOFOrEmptyLine)
        inputError(ERR_INVALID_MAP);

    for (let i: number = start + 1; i < start + dimensions.height; i++) {
        if (!isValidMapLine(lines[i], dimensions)) {
            inputError(ERR_INVALID_MAP); }
    }
    return true;
}

function inputError(errno: number) {
    console.log(errno + " Input error\n");
    return process.exit(-1);
}

function locateWhitePixelsInLine(line: string, deque: dequeElement[], y: number) {
    let index: number = line.length;
    while (index--) {
    let pixelIsWhite: boolean = line[index] == WHITE;
    if (pixelIsWhite)
        deque.push({'distance': 0, 'x': index + 1, 'y': y, 'west': true, 'east': true, 'north': true, 'south': true});
    }
}

function updateCurrentPixelDistanceToMap(distanceMap: number[], pixelIndex: number, pixelDistance: number) {
    distanceMap[pixelIndex] = pixelDistance;
}

function calculateSurroundingPixelDistance(currentPixel: dequeElement, deque: dequeElement[]) {
    if (currentPixel.west)
        deque.push({'distance': currentPixel.distance + 1, 'x': currentPixel.x - 1, 'y': currentPixel.y, 'west': true, 'east': false, 'north': true, 'south': true});
    if (currentPixel.east)
        deque.push({'distance': currentPixel.distance + 1, 'x': currentPixel.x + 1, 'y': currentPixel.y, 'west': false, 'east': true, 'north': true, 'south': true});
    if (currentPixel.north)
        deque.push({'distance': currentPixel.distance + 1, 'x': currentPixel.x, 'y': currentPixel.y - 1, 'west': false, 'east': false, 'north': true, 'south': false});
    if (currentPixel.south)
        deque.push({'distance': currentPixel.distance + 1, 'x': currentPixel.x, 'y': currentPixel.y + 1, 'west': false, 'east': false, 'north': false, 'south': true});
}

function fillDistanceMap(distanceMap: number[], deque: any, dimensions: dimensions) {
    while (!deque.isEmpty()) {
        let currentPixel: dequeElement = deque.peekFront();
        let pixelOutOfBounds: boolean = (currentPixel.x == 0 || currentPixel.x == dimensions.width + 1 || currentPixel.y == 0 || currentPixel.y == dimensions.height + 1);
        let currentPixelIndex: number = currentPixel.x - 1 + ((currentPixel.y - 1) * dimensions.width);
        let pixelDistanceAlreadyCalculated: boolean = (distanceMap[currentPixelIndex] >= 0);
        if (pixelOutOfBounds || pixelDistanceAlreadyCalculated)
            deque.shift();
        else {
            updateCurrentPixelDistanceToMap(distanceMap, currentPixelIndex, currentPixel.distance);
            calculateSurroundingPixelDistance(currentPixel, deque);
            deque.shift();
        }
    }
}

function printDistanceMap(distanceMap: number[], width: number) {
    let outputString: string = distanceMap[0].toString();
    const indexEnd: number = dimensions.height * dimensions.width;
    let i: number = 1;
    while (i < indexEnd) {
        if (i % width == 0)
            outputString += '\n';
        else
            outputString += ' ';
        outputString += distanceMap[i];
        i++;
    }

    console.log(outputString);
}

interface dimensions {
    height: number;
    width: number;
}

interface dequeElement {
    distance: number;
    x: number;
    y: number;
    west: boolean;
    east: boolean;
    north: boolean;
    south: boolean;
}

// Read input
const fs = require('fs');
const inputStringArray: string[] = fs.readFileSync('/dev/stdin').toString().split('\n');
const arrayLength: number = inputStringArray.length;
var index: number = 0;
const nbrTests: number = getNumberOfTests(inputStringArray[index]);
if (nbrTests == 0 || nbrTests > 1000)
    inputError(ERR_INVALID_NBR_OF_TESTS);

var dimensions: dimensions = { 'height': 0, 'width': 0};
for (let i: number = 0; i < nbrTests; i++) {
    (index < arrayLength - 1) ? index++ : inputError(5);
    if (setMapDimensionsIfValid(dimensions, inputStringArray[index]) && mapIsValid(dimensions, inputStringArray, index)) {
        var distanceMap: number[] = new Array(dimensions.height * dimensions.width).fill(-1);
        var deque: any = new Denque(); // why can't we do deque: dequeElement[]?
        for (let j: number = 1; j <= dimensions.height; j++) {
            locateWhitePixelsInLine(inputStringArray[index + j], deque, j);
        }
        var noWhitePixels: boolean = deque.isEmpty();
        if (noWhitePixels)
            inputError(ERR_INVALID_MAP);
        fillDistanceMap(distanceMap, deque, dimensions);
        printDistanceMap(distanceMap, dimensions.width);
        index += dimensions.height;
    } else {
        inputError(ERR_INVALID_MAP);
    }
}
