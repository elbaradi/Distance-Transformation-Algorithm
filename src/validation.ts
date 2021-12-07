const BLACK = '0';
const WHITE = '1';
const ZERO = 47;
const NINE = 57;
const NBR_MAP_SPECS = 2;
const MIN_MAP_SIZE = 1;
const MAX_MAP_SIZE = 182;

import {inputArray} from "./main";
import {Dimensions} from './interfaces'

function stringHasOnlyDigits(string: string): boolean {
    const stringLength = string.length;

    for (let i = 0; i < string.length; i++) {
        if (string.charCodeAt(i) < ZERO || string.charCodeAt(i) > NINE)
            return false
    }
    return true
}

export function getNumberOfMaps(line: string): number {
    let numberOfMaps: number = 0;

    const isNumericalString: boolean =
        (inputArray.length > 0 && line.length > 0 && stringHasOnlyDigits(line))
    if (isNumericalString)
        numberOfMaps = parseInt(line);
    
    return numberOfMaps;
}

export function setMapDimensionsIfValid(dimensions: Dimensions, line: string): boolean {
    const mapSpecs: string[] = line.split(' ');

    const correctNbrMapSpecs = (mapSpecs.length == NBR_MAP_SPECS);
    if (!correctNbrMapSpecs)
        return false;

    const heightIsNumerical = (stringHasOnlyDigits(mapSpecs[0]));
    if (!heightIsNumerical)
            return false;

    const widthIsNumerical = (stringHasOnlyDigits(mapSpecs[1]));
    if (!widthIsNumerical)
        return false;
    
    dimensions.height = parseInt(mapSpecs[0]);
    dimensions.width = parseInt(mapSpecs[1]);

    const isValidHeight: boolean = (dimensions.height >= MIN_MAP_SIZE && dimensions.height <= MAX_MAP_SIZE)
    const isValidWidth: boolean = (dimensions.width >= MIN_MAP_SIZE && dimensions.width <= MAX_MAP_SIZE)
    return (isValidHeight && isValidWidth);
}

function isValidLine(line: string, dimensions: Dimensions): boolean {
    const isCorrectLineLength: boolean = (line.length == dimensions.width)
    if (!isCorrectLineLength)
        return false;

    let pixel: number = line.length;
    while (pixel--) {
        let pixelIsBlackOrWhite: boolean = (line[pixel] == BLACK || line[pixel] == WHITE);
        if (!pixelIsBlackOrWhite)
            return false;
    }
    return true;
}

export function mapIsValid(dimensions: Dimensions, lines: string[], start: number): boolean {
    const correctNumberOfLines: boolean = (inputArray.length > start + dimensions.height);
    if (!correctNumberOfLines)
        exitWithError("map has an incorrect number of lines");

    const endsWithEOF: boolean = (inputArray.length == start + dimensions.height + 1);
    const endsWithEmptyLine: boolean = (endsWithEOF)? false : (lines[start + dimensions.height + 1].length == 0);
    if (!(endsWithEOF || endsWithEmptyLine))
        exitWithError("map does not end with EOF or empty line");

    for (let i = start + 1; i < start + dimensions.height; i++) {
        if (!isValidLine(lines[i], dimensions)) {
            exitWithError("map contains invalid line");
        }
    }
    return true;
}

export function exitWithError(errString: string) {
    console.log("Input error: " + errString);
    return process.exit(0);
}