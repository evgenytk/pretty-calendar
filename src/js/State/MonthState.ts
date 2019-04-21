import State from './State';
import YearState from './YearState';
import Calendar from '../Calendar/Calendar';

class MonthState extends State {

  /**
   * Initialization.
   * 
   * @param {Calendar} calendar
   */
  constructor(calendar: Calendar) {
    super(calendar);
  }

  /**
   * Handling left switcher click.
   */
  public handleLeftClick(): void {
    let newScope = new Date(this.calendar.scope);
        // TODO: create reset date method in this class.
        newScope = new Date(newScope.setDate(1));
        newScope = new Date(newScope.setMonth(newScope.getMonth() - 1));

    this.calendar.scope = newScope;
    this.calendar.updateState(this);
  }

  /**
   * Handling right switcher click.
   */
  public handleRightClick(): void {
    let newScope = new Date(this.calendar.scope);
        // TODO: create reset date method in this class.
        newScope = new Date(newScope.setDate(1));
        newScope = new Date(newScope.setMonth(newScope.getMonth() + 1));

    this.calendar.scope = newScope;
    this.calendar.updateState(this);
  }

  /**
   * Handling center switcher click.
   */
  public handleCenterClick(): void {
    this.calendar.updateState(new YearState(this.calendar));
  }

  /**
   * Handling date cell click.
   * 
   * @param {Element} element
   */
  public handleDateClick(element: Element): void {
    const timestamp = element.getAttribute('data-pc-timestamp');

    if(timestamp === null) {
      throw new Error('Required data-pc-timestamp attribute');
    }

    const date = new Date(parseInt(timestamp));

    this.calendar.scope = date;
    this.calendar.options.selectedDate = date;
    this.calendar.publisher.notify('date-changed', date);
    this.calendar.updateState(this);
  }

  /**
   * Rendering HTML content.
   * 
   * @return {string}
   */
  public render(): string {
    const { grid, scope } = this.calendar;

    const dates: Array<Date> = grid.getDays(scope),
          weekndays: Array<string> = grid.getWeekdayNames(),
          months: Array<string> = grid.getMonthNames();

    return `
      <nav class="pc-controls">
        <button type="button" class="pc-pointer pc-pointer-left"></button>
        <button type="button" class="pc-title">${months[dates[Math.floor(dates.length / 2)].getMonth()]}, ${dates[Math.floor(dates.length / 2)].getFullYear()}</button>
        <button type="button" class="pc-pointer pc-pointer-right"></button>
      </nav>
      <div class="pc-plate pc-plate-days">
        ${weekndays.map(name => `<span class="pc-cell light">${name}</span>`).join('')}
        ${dates.map(date => {
          const { selectedDate } = this.calendar.options;
          let className = 'pc-cell';

          if(!date.dayInMonth(scope)) {
            className += ' light';
          }

          if(date.isToday()) {
            className += ' active';
          }

          if(selectedDate && selectedDate.diffInDays(date) === 0) {
            className += ' selected';
          }
          return `<button data-pc-timestamp="${date.getTime()}" class="${className}">${date.getDate()}</button>`
        }).join('')}
      </div>
    `;
  }
}

export default MonthState;