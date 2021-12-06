"use strict";
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
function stringHasOnlyDigits(string) {
    const stringLength = string.length;
    for (let i = 0; i < string.length; i++) {
        if (string.charCodeAt(i) < CHAR_CODE_ZERO || string.charCodeAt(i) > CHAR_CODE_NINE)
            return false;
    }
    return true;
}
function getNumberOfTests(line) {
    var nbrTests = 0;
    if (arrayLength > 0 && line.length > 0 && stringHasOnlyDigits(line))
        nbrTests = parseInt(line);
    return nbrTests;
}
function setMapDimensionsIfValid(dimensions, dimensionsString) {
    const mapSpecs = dimensionsString.split(' ');
    const mapSpecsAreCorrectlyFormatted = (mapSpecs.length == NBR_MAP_SPECS && stringHasOnlyDigits(mapSpecs[0]) && stringHasOnlyDigits(mapSpecs[1]));
    if (mapSpecsAreCorrectlyFormatted) {
        dimensions.height = parseInt(mapSpecs[0]);
        dimensions.width = parseInt(mapSpecs[1]);
    }
    else
        return false;
    const isValidHeight = (dimensions.height >= MIN_MAP_SIZE && dimensions.height <= MAX_MAP_SIZE);
    const isValidWidth = (dimensions.width >= MIN_MAP_SIZE && dimensions.width <= MAX_MAP_SIZE);
    if (isValidHeight && isValidWidth)
        return true;
    else
        return false;
}
function isValidMapLine(line, dimensions) {
    const isCorrectLineLength = (line.length == dimensions.width);
    if (!isCorrectLineLength)
        return false;
    let index = line.length;
    while (index--) {
        let pixelIsBlackOrWhite = (line[index] == BLACK || line[index] == WHITE);
        if (!pixelIsBlackOrWhite)
            return false;
    }
    return true;
}
function mapIsValid(dimensions, lines, start) {
    const mapHasCorrectNumberOfLines = (arrayLength > start + dimensions.height);
    if (!mapHasCorrectNumberOfLines)
        inputError(ERR_INVALID_MAP);
    const mapEndsWithEOFOrEmptyLine = ((arrayLength == start + dimensions.height + 1) || (lines[start + dimensions.height + 1].length == 0));
    if (!mapEndsWithEOFOrEmptyLine)
        inputError(ERR_INVALID_MAP);
    for (let i = start + 1; i < start + dimensions.height; i++) {
        if (!isValidMapLine(lines[i], dimensions)) {
            inputError(ERR_INVALID_MAP);
        }
    }
    return true;
}
function inputError(errno) {
    console.log(errno + " Input error\n");
    return process.exit(-1);
}
function findWhitePixelsInLine(line, deque, y) {
    let index = line.length;
    while (index--) {
        let pixelIsWhite = line[index] == WHITE;
        if (pixelIsWhite)
            deque.push({ 'distance': 0, 'x': index + 1, 'y': y, 'west': true, 'east': true, 'north': true, 'south': true });
    }
}
function updateCurrentPixelDistanceToMap(distanceMap, pixelIndex, pixelDistance) {
    distanceMap[pixelIndex] = pixelDistance;
}
function calculateDistanceOfSurroundingPixels(currentPixel, deque) {
    if (currentPixel.west)
        deque.push({ 'distance': currentPixel.distance + 1, 'x': currentPixel.x - 1, 'y': currentPixel.y, 'west': true, 'east': false, 'north': true, 'south': true });
    if (currentPixel.east)
        deque.push({ 'distance': currentPixel.distance + 1, 'x': currentPixel.x + 1, 'y': currentPixel.y, 'west': false, 'east': true, 'north': true, 'south': true });
    if (currentPixel.north)
        deque.push({ 'distance': currentPixel.distance + 1, 'x': currentPixel.x, 'y': currentPixel.y - 1, 'west': false, 'east': false, 'north': true, 'south': false });
    if (currentPixel.south)
        deque.push({ 'distance': currentPixel.distance + 1, 'x': currentPixel.x, 'y': currentPixel.y + 1, 'west': false, 'east': false, 'north': false, 'south': true });
}
function fillDistanceMap(distanceMap, deque, dimensions) {
    while (!deque.isEmpty()) {
        let currentPixel = deque.peekFront();
        let pixelOutOfBounds = (currentPixel.x == 0 || currentPixel.x == dimensions.width + 1 || currentPixel.y == 0 || currentPixel.y == dimensions.height + 1);
        let currentPixelIndex = currentPixel.x - 1 + ((currentPixel.y - 1) * dimensions.width);
        let pixelDistanceAlreadyCalculated = (distanceMap[currentPixelIndex] >= 0);
        if (pixelOutOfBounds || pixelDistanceAlreadyCalculated)
            deque.shift();
        else {
            updateCurrentPixelDistanceToMap(distanceMap, currentPixelIndex, currentPixel.distance);
            calculateDistanceOfSurroundingPixels(currentPixel, deque);
            deque.shift();
        }
    }
}
function printDistanceMap(distanceMap, width) {
    let outputString = '\n' + distanceMap[0].toString();
    const indexEnd = dimensions.height * dimensions.width;
    let i = 1;
    while (i < indexEnd) {
        if (i % width == 0)
            outputString += '\n';
        else
            outputString += ' ';
        outputString += distanceMap[i];
        i++;
    }
    outputString += '\n';
    console.log(outputString);
}
// CODE START
const fs = require('fs');
const inputStringArray = fs.readFileSync('/dev/stdin').toString().split('\n');
const arrayLength = inputStringArray.length;
var index = 0;
const nbrOfTests = getNumberOfTests(inputStringArray[index]);
if (nbrOfTests == 0 || nbrOfTests > 1000)
    inputError(ERR_INVALID_NBR_OF_TESTS);
var dimensions = { 'height': 0, 'width': 0 };
for (let i = 0; i < nbrOfTests; i++) {
    (index < arrayLength - 1) ? index++ : inputError(5);
    if (setMapDimensionsIfValid(dimensions, inputStringArray[index]) && mapIsValid(dimensions, inputStringArray, index)) {
        var distanceMap = new Array(dimensions.height * dimensions.width).fill(-1);
        var deque = new Denque(); // why can't we do deque: dequeElement[]?
        for (let j = 1; j <= dimensions.height; j++) {
            findWhitePixelsInLine(inputStringArray[index + j], deque, j);
        }
        var noWhitePixelsInMap = deque.isEmpty();
        if (noWhitePixelsInMap)
            inputError(ERR_INVALID_MAP);
        fillDistanceMap(distanceMap, deque, dimensions);
        printDistanceMap(distanceMap, dimensions.width);
        index += dimensions.height;
    }
    else {
        inputError(ERR_INVALID_MAP);
    }
}
