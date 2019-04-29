import { MaskOptions } from './MaskOptions';
declare class Mask {
    /**
     * Mask pattern.
     *
     * @type {string}
     */
    pattern: string;
    /**
     * Array of delimiters.
     *
     * @type {string[]}
     */
    delimiters: string[];
    /**
     * Mask options.
     *
     * @type {MaskOptions}
     */
    options: MaskOptions;
    /**
     * Default Mask options.
     *
     * @type {MaskOptions}
     */
    private static defaultOptions;
    /**
     * Initialization.
     *
     * @param {string}      pattern
     * @param {MaskOptions} options
     */
    constructor(pattern: string, options?: MaskOptions);
    /**
     * Checking for bad options.
     *
     * @type {MaskOptions} options
     */
    private validateArguments;
    /**
     * Checking for delimiter.
     *
     * @param {string}   char
     * @return {Boolean}
     */
    private isDelimiter;
    /**
     * Finding delimiter char in this.delimiters.
     *
     * @param {char}  string
     * @return {string}
     */
    private findDelimiter;
    /**
     * Extracting placeholder by the most repeating char in the pattern.
     *
     * @param {string} pattern
     * @return {string}
     */
    private extractPlaceholder;
    /**
     * Replace all characters except numbers.
     *
     * @param {string}  v
     * @return {string}
     */
    unmask: (v: string) => string;
    /**
     * Mask unmasked value according to pattern.
     *
     * @param {string}  v
     * @return {string}
     */
    mask: (v: string) => string;
    /**
     * Unmask and mask value.
     *
     * @param {string}   v
     * @return {string}
     */
    reapply: (v: string) => string;
    /**
     * Calculating position based on last char in unmasked value.
     *
     * @param {string}   v
     * @return {number}
     */
    getCaretPosition: (v: string) => number;
}
export default Mask;
