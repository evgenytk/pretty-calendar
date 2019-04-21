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
    let newScope = this.calendar.scope;
        // TODO: create reset date method in this class.
        newScope = new Date(newScope.setDate(1));
        newScope = new Date(newScope.setMonth(0));
        // TODO: Implement method resetDecade right here! (maybe in Grid class)
        newScope = newScope.resetDecade();
        newScope = new Date(newScope.setFullYear(newScope.getFullYear() - 10));

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
        // TODO: Implement method resetDecade right here! (maybe in Grid class)
        newScope = newScope.resetDecade();
        newScope = new Date(newScope.setFullYear(newScope.getFullYear() + 10));

    this.calendar.scope = newScope;
    this.calendar.updateState(this);
  }

  /**
   * Handling center switcher click.
   */
  public handleCenterClick(): void {
    // null behavior
  }

  public handleDateClick(element: Element): void {
    const timestamp = element.getAttribute('data-pc-timestamp');

    if(timestamp === null) {
      throw new Error('Required data-pc-timestamp attribute');
    }

    const date = new Date(parseInt(timestamp));

    this.calendar.scope = date;
    this.calendar.publisher.notify('year-changed', date.getFullYear());
    this.calendar.updateState(new YearState(this.calendar));
  }

  /**
   * Handling date cell click.
   *
   * @param {Element} element
   */
  public render(): string {
    const { grid, scope } = this.calendar;

    const dates: Array<Date> = grid.getYears(scope);

    return `
      <nav class="pc-controls">
        <button type="button" class="pc-pointer pc-pointer-left"></button>
        <button type="button" class="pc-title">${dates[0].getFullYear()} - ${dates[dates.length - 1].getFullYear()}</button>
        <button type="button" class="pc-pointer pc-pointer-right"></button>
      </nav>
      <div class="pc-plate pc-plate-months">
        ${dates.map(date => `<button data-pc-timestamp="${date.getTime()}" class="pc-cell">${date.getFullYear()}</button>`).join('')}
      </div>
    `;
  }
}

export default DecadeState;