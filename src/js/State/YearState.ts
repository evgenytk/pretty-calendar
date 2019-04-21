import State from './State';
import MonthState from './MonthState';
import DecadeState from './DecadeState';
import Calendar from '../Calendar/Calendar';

class YearState extends State {

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
    let newScope = this.calendar.scope;
        // TODO: create reset date method in this class.
        newScope = new Date(newScope.setDate(1));
        newScope = new Date(newScope.setMonth(0));
        newScope = new Date(newScope.setFullYear(newScope.getFullYear() - 1));

    this.calendar.scope = newScope;
    this.calendar.updateState(this);
  }

  /**
   * Handling right switcher click.
   */
  public handleRightClick(): void {
    let newScope = this.calendar.scope;
        // TODO: create reset date method in this class.
        newScope = new Date(newScope.setDate(1));
        newScope = new Date(newScope.setMonth(0));
        newScope = new Date(newScope.setFullYear(newScope.getFullYear() + 1));

    this.calendar.scope = newScope;
    this.calendar.updateState(this);
  }

  /**
   * Handling center switcher click.
   */
  public handleCenterClick(): void {
    this.calendar.updateState(new DecadeState(this.calendar));
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
    this.calendar.updateState(new MonthState(this.calendar));
  }

  /**
   * Rendering HTML content.
   * 
   * @return {string}
   */
  public render(): string {
    const { grid, scope } = this.calendar;

    const dates: Array<Date> = grid.getMonths(scope),
          months: Array<string> = grid.getMonthNames();

    return `
      <nav class="pc-controls">
        <button type="button" class="pc-pointer pc-pointer-left"></button>
        <button type="button" class="pc-title">${dates[0].getFullYear()}</button>
        <button type="button" class="pc-pointer pc-pointer-right"></button>
      </nav>
      <div class="pc-plate pc-plate-months">
        ${dates.map(date => `<button data-pc-timestamp="${date.getTime()}" class="pc-cell">${months[date.getMonth()]}</button>`).join('')}
      </div>
    `;
  }
}

export default YearState;