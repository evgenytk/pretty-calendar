import { IMaskCharInterface } from './IMaskCharInterface';
import { IMaskOptions } from './IMaskOptions';

class Mask {
  /**
   * Default Mask options.
   *
   * @type {IMaskOptions}
   */
  private static defaultOptions: IMaskOptions = {};

  /**
   * Mask pattern.
   *
   * @type {string}
   */
  public pattern: string;

  /**
   * Array of delimiters.
   *
   * @type {string[]}
   */
  public delimiters: string[];

  /**
   * Mask options.
   *
   * @type {IMaskOptions}
   */
  public options: IMaskOptions;

  /**
   * Initialization.
   *
   * @param {string}      pattern
   * @param {IMaskOptions} options
   */
  constructor(pattern: string, options: IMaskOptions = {}) {
    this.validateArguments(pattern, options);
    this.pattern = pattern;
    this.options = {
      ...Mask.defaultOptions,
      ...options,
    };
    if (this.options.placeholder === undefined) {
      this.options.placeholder = this.extractPlaceholder(pattern);
    }
    this.delimiters = pattern.match(/(\W|[A-z]|_|\s)/g) || [];
    this.delimiters = this.delimiters.filter(d => d !== this.options.placeholder);
  }

  /**
   * Replace all characters except numbers.
   *
   * @param {string}  v
   * @return {string}
   */
  public unmask = (v: string): string => {
    return v.replace(/\D/g, '');
  };

  /**
   * Mask unmasked value according to pattern.
   *
   * @param {string}  v
   * @return {string}
   */
  public mask = (v: string): string => {
    let i: number = 0;
    let offset: number = 0;
    let result: string = '';

    for (i; i < this.pattern.length; i++) {
      if (this.isDelimiter(this.pattern[i])) {
        result += this.findDelimiter(this.pattern[i]);
        offset++;

        continue;
      }

      if (v[i - offset] !== undefined) {
        result += v[i - offset];
      } else {
        result += this.options.placeholder;
      }
    }

    return result;
  };

  /**
   * Unmask and mask value.
   *
   * @param {string}   v
   * @return {string}
   */
  public reapply = (v: string): string => {
    v = this.unmask(v);
    v = this.mask(v);

    return v;
  };

  /**
   * Calculating position based on last char in unmasked value.
   *
   * @param {string}   v
   * @return {number}
   */
  public getCaretPosition = (v: string): number => {
    let i: number = 0;
    let offset: number = 0;

    for (i; i < this.pattern.length; i++) {
      if (this.isDelimiter(this.pattern[i])) {
        offset++;
        continue;
      }

      if (v[i - offset] === undefined) {
        break;
      }
    }

    return i;
  };

  /**
   * Checking for bad options.
   *
   * @type {IMaskOptions} options
   */
  private validateArguments = (pattern: string, options: IMaskOptions): void => {
    if (pattern.length === 0) {
      throw new Error('Incorrect pattern length.');
    }

    // Checking for placeholder length (should be === 1)
    if (options.placeholder !== undefined && options.placeholder.length !== 1) {
      // TODO dealing with numbers as a placeholder char.
      throw new Error('Incorrect placeholder length, it must have a 1 char.');
    }

    // Checking for existing placeholder char in pattern
    if (options.placeholder !== undefined && pattern.match(new RegExp(`(${options.placeholder})`)) === null) {
      throw new Error('Can not find a placeholder.');
    }
  };

  /**
   * Checking for delimiter.
   *
   * @param {string}   char
   * @return {Boolean}
   */
  private isDelimiter = (char: string): boolean => {
    const delimiter: string | undefined = this.delimiters.filter(d => d === char)[0];

    if (delimiter !== undefined) {
      return true;
    }

    return false;
  };

  /**
   * Finding delimiter char in this.delimiters.
   *
   * @param {char}  string
   * @return {string}
   */
  private findDelimiter = (char: string): string => {
    const delimiter: string | undefined = this.delimiters.filter(d => d === char)[0];

    if (delimiter === undefined) {
      throw new Error(`Undefined char ${char}`);
    }

    return delimiter;
  };

  /**
   * Extracting placeholder by the most repeating char in the pattern.
   *
   * @param {string} pattern
   * @return {string}
   */
  private extractPlaceholder = (pattern: string): string => {
    const chars: IMaskCharInterface[] = [];
    const matches: string[] = pattern.match(/\w/g) as string[];

    matches.forEach((match: string) => {
      const item: any = chars.filter(c => c.char === match)[0];
      if (item !== undefined) {
        item.count += 1;
      } else {
        chars.push({ char: match, count: 1 });
      }
    });

    chars.sort((a, b) => {
      return b.count - a.count;
    });

    return chars[0].char;
  };
}

export default Mask;
