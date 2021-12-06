declare const BLACK = "0";
declare const WHITE = "1";
declare const CHAR_CODE_ZERO = 47;
declare const CHAR_CODE_NINE = 57;
declare const NBR_MAP_SPECS = 2;
declare const MIN_MAP_SIZE = 1;
declare const MAX_MAP_SIZE = 182;
declare const ERR_INVALID_NBR_OF_TESTS = 401;
declare const ERR_INVALID_MAP = 402;
declare const Denque: any;
declare function stringHasOnlyDigits(string: string): boolean;
declare function getNumberOfTests(line: string): number;
declare function setMapDimensionsIfValid(dimensions: dimensions, dimensionsString: string): boolean;
declare function isValidMapLine(line: string, dimensions: dimensions): boolean;
declare function mapIsValid(dimensions: dimensions, lines: string[], start: number): boolean;
declare function inputError(errno: number): never;
declare function locateWhitePixelsInLine(line: string, deque: dequeElement[], y: number): void;
declare function updateCurrentPixelDistanceToMap(distanceMap: number[], pixelIndex: number, pixelDistance: number): void;
declare function calculateSurroundingPixelDistance(currentPixel: dequeElement, deque: dequeElement[]): void;
declare function fillDistanceMap(distanceMap: number[], deque: any, dimensions: dimensions): void;
declare function printDistanceMap(distanceMap: number[], width: number): void;
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
declare const fs: any;
declare const inputStringArray: string[];
declare const arrayLength: number;
declare var index: number;
declare const nbrTests: number;
declare var dimensions: dimensions;
