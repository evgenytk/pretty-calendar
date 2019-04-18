import { WeekdaysEnum, MonthsEnum, GridViewEnum } from './Enums';
import { CoreOptions, GridView } from './Interfaces';

class Core {

  private _options: CoreOptions;

  constructor(options: CoreOptions) {
    this._options = options;
  }

  public getMonths(): Array<string> {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'];
  }

  public getWeekdays(): Array<string> {
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

  public decadeView(date: Date): GridView {
    date = date.resetDecade()
               .resetYear()
               .resetMonth()
               .resetTime();

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

  public yearView(date: Date): GridView {
    date = date.resetYear().resetMonth().resetTime();
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
   * @param  {Date}     date Depends of month
   * @return {GridView}      [description]
   */
  public monthView(date: Date): GridView {
    date = date.resetMonth().resetTime();

    const dates: Array<Date> = [];
    const months: Array<string> = this.getMonths();
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