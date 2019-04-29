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
    let newScope = new Date(this.calendar.scope);
    // TODO: create reset date method in this class.
    newScope = new Date(newScope.setDate(1));
    newScope = new Date(newScope.setMonth(0));
    newScope = new Date(newScope.setFullYear(newScope.getFullYear() - 1));

    this.calendar.changeScope(newScope);
  }

  /**
   * Handling right switcher click.
   */
  public handleRightClick(): void {
    let newScope = new Date(this.calendar.scope);
    // TODO: create reset date method in this class.
    newScope = new Date(newScope.setDate(1));
    newScope = new Date(newScope.setMonth(0));
    newScope = new Date(newScope.setFullYear(newScope.getFullYear() + 1));

    this.calendar.changeScope(newScope);
  }

  /**
   * Handling center switcher click.
   */
  public handleCenterClick(): void {
    this.calendar.changeState(new DecadeState(this.calendar));
  }

  /**
   * Handling date cell click.
   *
   * @param {Element} element
   */
  public handleDateClick(element: Element): void {
    const timestamp = element.getAttribute('data-pc-timestamp') as string;
    const scope = new Date(parseInt(timestamp, 10));

    this.calendar.changeScope(scope);
    this.calendar.changeState(new MonthState(this.calendar));
  }

  /**
   * Rendering HTML content.
   *
   * @return {string}
   */
  public render(): string {
    const { grid, scope } = this.calendar;

    const dates: Date[] = grid.getMonths(scope);
    const months: string[] = grid.getMonthNames();

    return `
      <nav class="pc-controls">
        <button type="button" class="pc-pointer pc-pointer-left"></button>
        <button type="button" class="pc-title">${dates[0].getFullYear()}</button>
        <button type="button" class="pc-pointer pc-pointer-right"></button>
      </nav>
      <div class="pc-plate pc-plate-months">
        ${dates
          .map(
            date => `<button data-pc-timestamp="${date.getTime()}" class="pc-cell">${months[date.getMonth()]}</button>`,
          )
          .join('')}
      </div>
    `;
  }
}

export default YearState;
