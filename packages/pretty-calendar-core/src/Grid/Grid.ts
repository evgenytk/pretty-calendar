import { IGridOptions } from './IGridOptions';
import { WeekdaysEnum } from './WeekdaysEnum';

class Grid {
  /**
   * Default grid options.
   *
   * @type {IGridOptions}
   */
  private static defaultOptions: IGridOptions = {
    firstDay: WeekdaysEnum.MONDAY,
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'],
    daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  };

  /**
   * Grid options.
   *
   * @type {IGridOptions}
   */
  private options: IGridOptions;

  /**
   * Initialize and checking options.
   *
   * @param {object = {}} options
   */
  constructor(options: object = {}) {
    this.options = {
      ...Grid.defaultOptions,
      ...options
    };

    this.checkOptions();
  }

  /**
   * Getting month names.
   *
   * @return {Array<string>}
   */
  public getMonthNames(): string[] {
    return this.options.months;
  }

  /**
   * Getting the week names based on the firstDay option.
   *
   * @return {Array<string>}
   */
  public getWeekdayNames(): string[] {
    const week = this.options.daysMin;
    const sorted = [];

    let i: WeekdaysEnum = this.options.firstDay;

    for (i; i < week.length; i++) {
      sorted.push(week[i]);
    }

    let j: WeekdaysEnum = 0;
    for (j; j < this.options.firstDay; j++) {
      sorted.push(week[j]);
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
  public getYears(date: Date): Date[] {
    date = new Date(date.getFullYear(), 0, 1);

    // Set the first year of the decade
    while (date.getFullYear() % 10 !== 0) {
      date = new Date(date.setFullYear(date.getFullYear() - 1));
    }

    const dates: Date[] = [];
    let i: number = 0;

    for (i; i < 10; i++) {
      dates.push(date);
      date = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
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
  public getMonths(date: Date): Date[] {
    // Set the first day of the month
    date = new Date(date.getFullYear(), 0, 1);

    const months: Date[] = [];
    let i: number = 0;

    for (i; i < 12; i++) {
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
  public getDays(date: Date): Date[] {
    // Set the first day of the month
    date = new Date(date.getTime());
    date = new Date(date.setDate(1));

    const dates: Date[] = [];
    const months: string[] = this.getMonthNames();
    const title: string = `${months[date.getMonth()]}, ${date.getFullYear()}`;

    let iDate = date;

    while (iDate.getMonth() === date.getMonth()) {
      dates.push(iDate);
      iDate = new Date(iDate.getTime() + 3600 * 24 * 1000);
    }

    iDate = date;

    while (dates[0].getDay() !== this.options.firstDay) {
      dates.unshift(new Date(iDate.getTime() - 3600 * 24 * 1000));
      iDate = new Date(iDate.getTime() - 3600 * 24 * 1000);
    }

    iDate = dates[dates.length - 1];

    while (dates.length !== 42) {
      dates.push(new Date(iDate.getTime() + 3600 * 24 * 1000));
      iDate = new Date(iDate.getTime() + 3600 * 24 * 1000);
    }

    return dates;
  }

  /**
   * Validation rules for options.
   */
  private checkOptions(): void {
    if (this.options.firstDay < 0 || this.options.firstDay > 6) {
      throw new Error(`"${this.options.firstDay}" is invalid week day number.`);
    }

    if (typeof this.options.firstDay !== 'number') {
      throw new Error(`"${this.options.firstDay}" must be a type of number.`);
    }

    if(this.options.months.length != 12) {
      throw new Error(`Option months should be an array of 12 string`); 
    }

    if(this.options.daysMin.length != 7) {
      throw new Error(`Option daysMin should be an array of 7 string`); 
    }
  }
}

export default Grid;
