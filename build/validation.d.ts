import { Dimensions } from './interface';
export declare function getNumberOfMaps(line: string): number;
export declare function setMapDimensionsIfValid(dimensions: Dimensions, dimensionsString: string): boolean;
export declare function mapIsValid(dimensions: Dimensions, lines: string[], start: number): boolean;
export declare function exitWithError(errString: string): never;
