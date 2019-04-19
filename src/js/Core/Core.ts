import '../Extensions/Date';
import { WeekdaysEnum, MonthsEnum, GridViewEnum } from './Enums';
import { CoreOptions, GridView } from './Interfaces';

class Core {

  private _options: CoreOptions;

  static defaultOptions: CoreOptions = {
    firstDay: WeekdaysEnum.MONDAY
  }

  constructor(options: object = {}) {
    this._options = {
      ...Core.defaultOptions,
      ...options
    };

    this.checkOptions();
  }

  private checkOptions(): void {
    if(this._options.firstDay < 0 || this._options.firstDay > 6) {
      throw new Error(`"${this._options.firstDay}" is invalid week day number.`);
    }
  }

  /**
   * Getting month names
   *   
   * @return {Array<string>}
   */
  public getMonthNames(): Array<string> {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'];
  }

  /**
   * Getting the week names based on firstDay option
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
   * Getting grid of years
   * 
   * @param  {Date}     date
   * @return {GridView}
   */
  public getYears(date: Date): GridView {
    date = date.resetDecade();

    const dates: Array<Date> = [];
    let i: number = 0;

    for(i; i < 10; i++) {
      dates.push(date);
      date = date.addYears(1);
    }

    return {
      title: `${dates[0].getFullYear()} - ${dates[dates.length - 1].getFullYear()}`,
      type: GridViewEnum.DECADE,
      items: dates
    }
  }

  /**
   * Getting grid of months
   * 
   * @param  {Date}     date [description]
   * @return {GridView}      [description]
   */
  public getMonths(date: Date): GridView {
    date = date.resetMonth().resetTime();
    const months: Array<Date> = [];
    let i: number = 0;

    for(i; i < 12; i++) {
      months.push(new Date(date.setMonth(i)));
    }
    
    return {
      title: date.getFullYear().toString(),
      type: GridViewEnum.YEAR,
      items: months
    }
  }

  /**
   * Getting grid of days
   * 
   * @param  {Date}     date
   * @return {GridView}
   */
  public getDays(date: Date): GridView {
    date = date.resetMonth().resetTime();

    const dates: Array<Date> = [];
    const months: Array<string> = this.getMonthNames();
    const title: string = `${months[date.getMonth()]}, ${date.getFullYear()}`

    let i: number = 0;
    let iDate = date;

    while(iDate.getMonth() === date.getMonth()) {
      dates.push(iDate);
      iDate = iDate.addDays(1);
    }

    iDate = date;

    while(dates[0].getDay() !== this._options.firstDay) {
      dates.unshift(iDate.addDays(-1));
      iDate = iDate.addDays(-1);
    }

    iDate = dates[dates.length - 1];

    while(dates.length !== 42) {
      dates.push(iDate.addDays(1));
      iDate = iDate.addDays(1);
    }

    return {
      title,
      type: GridViewEnum.MONTH,
      items: dates
    }
  }
}

export default Core;