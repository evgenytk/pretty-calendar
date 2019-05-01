import State from './State';
import YearState from './YearState';
import Calendar from '../Calendar/Calendar';
import { v, IVDOMNode } from '../VDOM';

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
  public handleLeftClick = (): void => {
    let newScope = new Date(this.calendar.scope);
    // TODO: create reset date method in this class.
    newScope = new Date(newScope.setDate(1));
    newScope = new Date(newScope.setMonth(newScope.getMonth() - 1));

    this.calendar.changeScope(newScope);
    this.calendar.publisher.notify('prev');
  }

  /**
   * Handling right switcher click.
   */
  public handleRightClick = (): void => {
    let newScope = new Date(this.calendar.scope);
    // TODO: create reset date method in this class.
    newScope = new Date(newScope.setDate(1));
    newScope = new Date(newScope.setMonth(newScope.getMonth() + 1));

    this.calendar.changeScope(newScope);
    this.calendar.publisher.notify('next');
  }

  /**
   * Handling center switcher click.
   */
  public handleCenterClick = (): void => {
    this.calendar.changeState(new YearState(this.calendar));
  }

  /**
   * Handling date cell click.
   *
   * @param {number} timestamp
   */
  public handleDateClick = (timestamp: number): void => {
    const date = new Date(parseInt(`${timestamp}`, 10));
    this.calendar.changeDate(date);
  }

  /**
   * Rendering HTML content.
   *
   * @return {IVDOMNode}
   */
  public render(): IVDOMNode {
    const { grid, scope } = this.calendar;

    const dates: Date[] = grid.getDays(scope);
    const weekndays: string[] = grid.getWeekdayNames();
    const months: string[] = grid.getMonthNames();

    return(
      v('fragment', {}, 
        v('nav', {className: 'pc-controls'},
          v('button', {type: 'button', className: 'pc-pointer pc-pointer-left', onClick: this.handleLeftClick}),
          v('button', {type: 'button', className: 'pc-title', onClick: this.handleCenterClick}, `${months[dates[Math.floor(dates.length / 2)].getMonth()]}, ${dates[Math.floor(dates.length / 2)].getFullYear()}`),
          v('button', {type: 'button', className: 'pc-pointer pc-pointer-right', onClick: this.handleRightClick})
        ),
        v('div', {className: 'pc-plate pc-plate-days'}, 
          ...weekndays.map(name => v('span', {className: 'pc-cell light'}, name)),
          ...dates.map(date => {
            const { selectedDate } = this.calendar.options;
            let className = 'pc-cell';

            if (!date.dayInMonth(scope)) {
              className += ' light';
            }

            if (date.isToday()) {
              className += ' active';
            }

            if (selectedDate && selectedDate.diffInDays(date) === 0) {
              className += ' selected';
            }
            return v('button', {className, onClick: () => this.handleDateClick(date.getTime())}, date.getDate())
          })
        ) 
      )
    );
  }
}

export default MonthState;
