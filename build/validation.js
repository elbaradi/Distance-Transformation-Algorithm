"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exitWithError = exports.mapIsValid = exports.setMapDimensionsIfValid = exports.getNumberOfMaps = void 0;
const BLACK = '0';
const WHITE = '1';
const CHAR_CODE_ZERO = 47;
const CHAR_CODE_NINE = 57;
const NBR_MAP_SPECS = 2;
const MIN_MAP_SIZE = 1;
const MAX_MAP_SIZE = 182;
const main_1 = require("./main");
function stringHasOnlyDigits(string) {
    const stringLength = string.length;
    for (let i = 0; i < string.length; i++) {
        if (string.charCodeAt(i) < CHAR_CODE_ZERO || string.charCodeAt(i) > CHAR_CODE_NINE)
            return false;
    }
    return true;
}
function getNumberOfMaps(line) {
    let nbrMaps = 0;
    if (main_1.inputArray.length > 0 && line.length > 0 && stringHasOnlyDigits(line))
        nbrMaps = parseInt(line);
    return nbrMaps;
}
exports.getNumberOfMaps = getNumberOfMaps;
function setMapDimensionsIfValid(dimensions, dimensionsString) {
    const mapSpecs = dimensionsString.split(' ');
    const correctNbrMapSpecs = (mapSpecs.length == NBR_MAP_SPECS);
    if (!correctNbrMapSpecs)
        return false;
    const heigthIsNumerical = (stringHasOnlyDigits(mapSpecs[0]));
    if (!heigthIsNumerical)
        return false;
    const widthIsNumerical = (stringHasOnlyDigits(mapSpecs[1]));
    if (!widthIsNumerical)
        return false;
    dimensions.height = parseInt(mapSpecs[0]);
    dimensions.width = parseInt(mapSpecs[1]);
    const isValidHeight = (dimensions.height >= MIN_MAP_SIZE && dimensions.height <= MAX_MAP_SIZE);
    const isValidWidth = (dimensions.width >= MIN_MAP_SIZE && dimensions.width <= MAX_MAP_SIZE);
    return (isValidHeight && isValidWidth);
}
exports.setMapDimensionsIfValid = setMapDimensionsIfValid;
function isValidMapLine(line, dimensions) {
    const isCorrectLineLength = (line.length == dimensions.width);
    if (!isCorrectLineLength)
        return false;
    let pixel = line.length;
    while (pixel--) {
        let pixelIsBlackOrWhite = (line[pixel] == BLACK || line[pixel] == WHITE);
        if (!pixelIsBlackOrWhite)
            return false;
    }
    return true;
}
function mapIsValid(dimensions, lines, start) {
    const mapHasCorrectNumberOfLines = (main_1.inputArray.length > start + dimensions.height);
    if (!mapHasCorrectNumberOfLines)
        exitWithError("ERR_INVALID_MAP_LINES");
    const mapEndsWithEOFOrEmptyLine = ((main_1.inputArray.length == start + dimensions.height + 1) || (lines[start + dimensions.height + 1].length == 0));
    if (!mapEndsWithEOFOrEmptyLine)
        exitWithError("ERR_INVALID_MAP_SEPARATION");
    for (let i = start + 1; i < start + dimensions.height; i++) {
        if (!isValidMapLine(lines[i], dimensions)) {
            exitWithError("ERR_INVALID_LINE_LENGTH");
        }
    }
    return true;
}
exports.mapIsValid = mapIsValid;
function exitWithError(errString) {
    console.log("Input error: " + errString + '\n');
    return process.exit(0);
}
exports.exitWithError = exitWithError;
