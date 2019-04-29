import State from './State';
import YearState from './YearState';
import Calendar from '../Calendar/Calendar';

class DecadeState extends State {
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
    // TODO: Implement method resetDecade right here! (maybe in Grid class)
    newScope = newScope.resetDecade();
    newScope = new Date(newScope.setFullYear(newScope.getFullYear() - 10));

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
    // TODO: Implement method resetDecade right here! (maybe in Grid class)
    newScope = newScope.resetDecade();
    newScope = new Date(newScope.setFullYear(newScope.getFullYear() + 10));

    this.calendar.changeScope(newScope);
  }

  /**
   * Handling center switcher click.
   */
  public handleCenterClick(): void {
    // null behavior
  }

  public handleDateClick(element: Element): void {
    const timestamp = element.getAttribute('data-pc-timestamp') as string;
    const scope = new Date(parseInt(timestamp, 10));

    this.calendar.changeScope(scope);
    this.calendar.changeState(new YearState(this.calendar));
  }

  /**
   * Handling date cell click.
   *
   * @param {Element} element
   */
  public render(): string {
    const { grid, scope } = this.calendar;

    const dates: Date[] = grid.getYears(scope);

    return `
      <nav class="pc-controls">
        <button type="button" class="pc-pointer pc-pointer-left"></button>
        <button type="button" class="pc-title">${dates[0].getFullYear()} - ${dates[
      dates.length - 1
    ].getFullYear()}</button>
        <button type="button" class="pc-pointer pc-pointer-right"></button>
      </nav>
      <div class="pc-plate pc-plate-months">
        ${dates
          .map(date => `<button data-pc-timestamp="${date.getTime()}" class="pc-cell">${date.getFullYear()}</button>`)
          .join('')}
      </div>
    `;
  }
}

export default DecadeState;
