import { WeekdaysEnum } from './WeekdaysEnum';
import { GridOptions } from './GridOptions';

class Grid {

  /**
   * Grid options.
   * 
   * @type {GridOptions}
   */
  private _options: GridOptions;

  /**
   * Default grid options.
   * 
   * @type {GridOptions}
   */
  static defaultOptions: GridOptions = {
    firstDay: WeekdaysEnum.MONDAY
  }

  /**
   * Initialize and checking options.
   * 
   * @param {object = {}} options
   */
  constructor(options: object = {}) {
    this._options = {
      ...Grid.defaultOptions,
      ...options
    };

    this.checkOptions();
  }

  /**
   * Validation rules for options.
   */
  private checkOptions(): void {
    if(this._options.firstDay < 0 || this._options.firstDay > 6) {
      throw new Error(`"${this._options.firstDay}" is invalid week day number.`);
    }

    if(typeof this._options.firstDay !== 'number') {
      throw new Error(`"${this._options.firstDay}" must be a type of number.`);
    }
  }

  /**
   * Getting month names.
   *   
   * @return {Array<string>}
   */
  public getMonthNames(): Array<string> {
    return [
      'January', 
      'February', 
      'March', 
      'April', 
      'May', 
      'June', 
      'Jule', 
      'August', 
      'September', 
      'October', 
      'November', 
      'December'
    ];
  }

  /**
   * Getting the week names based on the firstDay option.
   * 
   * @return {Array<string>}
   */
  public getWeekdayNames(): Array<string> {
    const weeks = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const sorted = [];

    let i:WeekdaysEnum = this._options.firstDay;

    for(i; i < weeks.length; i++) {
      sorted.push(weeks[i]);
    }

    let j:WeekdaysEnum = 0;
    for(j; j < this._options.firstDay; j++) {
      sorted.push(weeks[j]);
    }

    return sorted;
  }

  /**
   * Getting a grid of years based on the given year.
   * 
   * Returns an array of 10 Date objects that 
   * each start with January 1 00:00:00.
   * 
   * @param  {Date}     date
   * @return {GridView}
   */
  public getYears(date: Date): Array<Date> {

    date = new Date(date);

    // Set the first year of the decade
    while(date.getFullYear() % 10 !== 0) {
      date = new Date(date.setFullYear(date.getFullYear() - 1));
    }

    const dates: Array<Date> = [];
    let i: number = 0;

    for(i; i < 10; i++) {
      dates.push(date);
      date = new Date(date.getFullYear() + 1, date.getMonth(), date.getDay());
    }

    return dates;
  }

  /**
   * Getting a grid of months based on the given year.
   *
   * Returns an array of 12 Date objects that 
   * each start with the first day of the month 00:00:00.
   * 
   * @param  {Date}     date
   * @return {GridView}     
   */
  public getMonths(date: Date): Array<Date> {
    // Set the first day of the month
    date = new Date(date);
    date = new Date(date.setDate(1));

    const months: Array<Date> = [];
    let i: number = 0;

    for(i; i < 12; i++) {
      months.push(new Date(date.setMonth(i)));
    }
    
    return months;
  }

  /**
   * Getting a grid of days based on the given month.
   *
   * Returns an array of 28-31 Date objects that 
   * each start with 00:00:00.
   * 
   * @param  {Date}     date
   * @return {GridView}
   */
  public getDays(date: Date): Array<Date> {
    // Set the first day of the month
    date = new Date(date);
    date = new Date(date.setDate(1));

    const dates: Array<Date> = [];
    const months: Array<string> = this.getMonthNames();
    const title: string = `${months[date.getMonth()]}, ${date.getFullYear()}`

    let i: number = 0;
    let iDate = date;

    while(iDate.getMonth() === date.getMonth()) {
      dates.push(iDate);
      iDate = new Date(iDate.getTime() + (3600 * 24 * 1000));
    }

    iDate = date;

    while(dates[0].getDay() !== this._options.firstDay) {
      dates.unshift(new Date(iDate.getTime() - (3600 * 24 * 1000)));
      iDate = new Date(iDate.getTime() - (3600 * 24 * 1000));
    }

    iDate = dates[dates.length - 1];

    while(dates.length !== 42) {
      dates.push(new Date(iDate.getTime() + (3600 * 24 * 1000)));
      iDate = new Date(iDate.getTime() + (3600 * 24 * 1000));
    }

    return dates;
  }

}

export default Grid;