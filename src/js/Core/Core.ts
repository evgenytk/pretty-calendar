import { WeekdaysEnum, MonthsEnum } from './Enums';
import { CoreOptions } from './Interfaces';

class Core {

  private _dates: Array<Date>;

  private _options: CoreOptions;

  constructor(options: CoreOptions) {
    this._dates = this.makeDates(options.minDate, options.maxDate);
    this._options = options;
  }

  private makeDates(startDate: Date, endDate: Date): Array<Date> {
    const diff:number = endDate.diffInDays(startDate);
    const dates: Array<Date> = [];
    let i: number = 0;
    
    startDate = startDate.resetTime();

    for(i = 0; i < diff; i++) {
      dates.push(new Date(startDate));
      startDate = startDate.addDays(1);
    }

    return dates;
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

  public monthView(date: Date): Array<Date> {

    // Get all days in given month
    const dates: Array<Date> = this._dates.filter((d: Date) => {
      return (
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth()
      )
    });

    // Getting a first index of the first day of current month in this._dates
    let firstIndex: number = this._dates.findIndex((d: Date) => {
      return (
        d.getFullYear() === dates[0].getFullYear() &&
        d.getMonth() === dates[0].getMonth() &&
        d.getDate() === dates[0].getDate()
      )
    });

    // Getting a last index of the first day of current month in this._dates
    let lastIndex: number = this._dates.findIndex((d: Date) => {
      return (
        d.getFullYear() === dates[dates.length - 1].getFullYear() &&
        d.getMonth() === dates[dates.length - 1].getMonth() &&
        d.getDate() === dates[dates.length - 1].getDate()
      )
    });

    // Offset to left baesd on first day of week
    while(this._dates[firstIndex] !== undefined && this._dates[firstIndex].getDay() !== this._options.firstDay) {
      dates.unshift(this._dates[firstIndex - 1]);
      firstIndex--;
    }

    // Offset to right baesd on first day of week
    while(this._dates[lastIndex] !== undefined && dates.length !== 42) {
      dates.push(this._dates[lastIndex + 1]);
      lastIndex++;
    }

    return dates.filter((d: Date) => d !== undefined);
  }
}

export default Core;