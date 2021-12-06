const CHARCODEZERO = 47;
const BLACK = '0';
const WHITE = '1';
const CHARCODENINE = 57;
const nbrMapSpecs = 2;
const minMapSize = 1;
const maxMapSize = 182;
const Denque = require("denque");

function stringHasOnlyDigits(string: string): boolean {
    const stringLength = string.length;
    for (let i: number = 0; i < string.length; i++) {
      if (string.charCodeAt(i) < CHARCODEZERO || string.charCodeAt(i) > CHARCODENINE) 
        return false
    }
    return true
}

// Get number of testcases
function getNumberOfTests(line: string): number {
    var nbrTests: number = 0;
    if (arrayLength > 0 && line.length > 0 && stringHasOnlyDigits(line))
        nbrTests = parseInt(line);
    return nbrTests;
}

function setMapDimensionsIfValid(dimensions: dimensions, dimensionsString: string): boolean {
    const mapSpecs: string[] = dimensionsString.split(' ');
    const mapSpecsAreCorrectlyFormatted: boolean = (mapSpecs.length == nbrMapSpecs && stringHasOnlyDigits(mapSpecs[0]) && stringHasOnlyDigits(mapSpecs[1]));  
    if (mapSpecsAreCorrectlyFormatted) {
        dimensions.height = parseInt(mapSpecs[0]);
        dimensions.width = parseInt(mapSpecs[1]);
    }
    else
        return false;

    const isValidHeight: boolean = (dimensions.height >= minMapSize && dimensions.height <= maxMapSize)
    const isValidWidth: boolean = (dimensions.width >= minMapSize && dimensions.width <= maxMapSize)
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
        inputError(1);

    const mapEndsWithEOFOrEmptyLine: boolean = ((arrayLength == start + dimensions.height + 1) || (lines[start + dimensions.height + 1].length == 0));
    if (!mapEndsWithEOFOrEmptyLine)
        inputError(2);

    for (let i: number = start + 1; i < start + dimensions.height; i++) {
        if (!isValidMapLine(lines[i], dimensions)) {
            console.log(lines[i] + '\n');
            inputError(3); }
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

function calculateNeighborsDistance(currentPixel: dequeElement, deque: dequeElement[]) {
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
            calculateNeighborsDistance(currentPixel, deque);
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
    inputError(4);

var dimensions: dimensions = { 'height': 0, 'width': 0};
for (let i: number = 0; i < nbrTests; i++) {
    (index < arrayLength - 1) ? index++ : inputError(5);
    if (setMapDimensionsIfValid(dimensions, inputStringArray[index]) && mapIsValid(dimensions, inputStringArray, index)) {
        var distanceMap: number[] = new Array(dimensions.height * dimensions.width).fill(-1);
        var deque: any = new Denque(); // deque: dequeElement[]
        for (let j: number = 1; j <= dimensions.height; j++) {
            locateWhitePixelsInLine(inputStringArray[index + j], deque, j);
        }
        var noWhitePixels: boolean = deque.isEmpty();
        if (noWhitePixels)
            inputError(6);
        fillDistanceMap(distanceMap, deque, dimensions);
        printDistanceMap(distanceMap, dimensions.width);
        index += dimensions.height;
    }
}



// import getStdin from 'get-stdin';

// async function main() {
//     var value = await Promise.resolve('Hey there');
//     console.log('inside: ' + value);
//     return value;
//     console.log(await getStdin());
//     return 0;
// }



// var nbrTestcases : int 

// var readline = require('readline');

// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout

// });

// var i = 0;
// while(i < 10) {
// rl.question("", function(answer: string) {
//    console.log("Hello " + answer);
//    rl.close();
// });
// i++;
// }


// import { any, count } from 'dotless';
// import {
//     buildGrid,
//     cellNeighbors,
//     getGrid,
//     Grid,
//     gridBoundChecker,
//     GridLocation,
//     neighborsDelta,
// } from './util';

// const readline : require('readline');
// const rl = readline.createInterface({input : process.stdin,
//                                     output : process.stdout})
// const WHITE = '1';
// const BLACK = '0';
// const OCCUPIED = '*';
// type STATE = '1' | '0' | '*';
// type Layout = Grid<STATE>;
// type Location = GridLocation;
// type AdjacentFinder = (l: Location) => Location[];
// type AdjacentStrategy = (layout: Layout) => AdjacentFinder;
// const isSeat = (c: STATE) => c !== FLOOR;
// const isOccupied = (c: STATE) => c === OCCUPIED;

// const simple: AdjacentStrategy = cellNeighbors;
// const deep: AdjacentStrategy = (layout: Layout) => {
//     const withInBound = gridBoundChecker(layout);
//     return ([r, c]: Location) => {
//         const result: Location[] = [];
//         for (const [dr, dc] of neighborsDelta()) {
//             let [nr, nc] = [r + dr, c + dc];
//             while (withInBound([nr, nc])) {
//                 if (isSeat(layout[nr][nc])) {
//                     result.push([nr, nc]);
//                     break;
//                 }
//                 [nr, nc] = [nr + dr, nc + dc];
//             }
//         }
//         return result;
//     };
// };
// const memoize = (base: AdjacentFinder): AdjacentFinder => {
//     const memory = new Map<string, Location[]>();
//     return ([r, c]: Location): Location[] => {
//         const key = `${r}.${c}`;
//         if (memory.has(key)) {
//             return memory.get(key) as Location[];
//         }
//         const result = base([r, c]);
//         memory.set(key, result);
//         return result;
//     };
// };

// const getNextState = (
//     layout: Layout,
//     adjacentSeatsOf: AdjacentFinder,
//     t: number
// ): [Layout, number] => {
//     const rc = layout.length;
//     const cc = layout[0].length;
//     const occupied = ([r, c]: Location) => isOccupied(layout[r][c]);
//     const filled = (l: Location) => count(occupied)(adjacentSeatsOf(l));
//     const anyFilled = (l: Location) => any(occupied)(adjacentSeatsOf(l));
//     const stateChange = {
//         [FLOOR]: (_l: Location) => FLOOR as STATE,
//         [EMPTY]: (l: Location) => (anyFilled(l) ? EMPTY : OCCUPIED),
//         [OCCUPIED]: (l: Location) => (filled(l) >= t ? EMPTY : OCCUPIED),
//     };
//     let occupiedCount = 0;
//     const nextState = buildGrid(rc, cc, ([ri, ci]) => {
//         const current = layout[ri][ci];
//         const next = stateChange[current]([ri, ci]);
//         if (next === OCCUPIED) {
//             occupiedCount = occupiedCount + 1;
//         }
//         return next;
//     });
//     return [nextState, occupiedCount];
// };

// const solve = (layout: Layout, strategy: AdjacentStrategy = simple, t = 4) => {
//     let current = layout,
//         lastOccupiedCount = -1,
//         occupiedCount = 0;
//     const finder = memoize(strategy(layout));
//     while (lastOccupiedCount !== occupiedCount) {
//         lastOccupiedCount = occupiedCount;
//         [current, occupiedCount] = getNextState(current, finder, t);
//     }
//     return occupiedCount;
// };

// test('11', () => {
//     const testInput01 = getGrid('11-test') as Layout;
//     const input = getGrid('11') as Layout;

//     expect(solve(testInput01)).toEqual(37);
//     expect(solve(input)).toEqual(2296);
//     expect(solve(testInput01, deep, 5)).toEqual(26);
//     expect(solve(input, deep, 5)).toEqual(2089);
// });