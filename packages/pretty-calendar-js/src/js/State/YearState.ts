import State from './State';
import MonthState from './MonthState';
import DecadeState from './DecadeState';
import Calendar from '../Calendar/Calendar';
import { v, IVDOMNode } from '../VDOM';
import { resetMonth, resetYear, addYears } from '@pretty-calendar/core';

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
  public handleLeftClick = (): void => {
    let newScope = new Date(this.calendar.scope);

    newScope = resetMonth(newScope);
    newScope = resetYear(newScope);
    newScope = addYears(newScope, -1);

    if(this.calendar.monthIsAllowed(newScope)) {
      this.calendar.changeScope(newScope);
      this.calendar.publisher.notify('prev');
    }
  }

  /**
   * Handling right switcher click.
   */
  public handleRightClick = (): void => {
    let newScope = new Date(this.calendar.scope);

    newScope = resetMonth(newScope);
    newScope = resetYear(newScope);
    newScope = addYears(newScope, 1);

    if(this.calendar.monthIsAllowed(newScope)) {
      this.calendar.changeScope(newScope);
      this.calendar.publisher.notify('next');
    }
  }

  /**
   * Handling center switcher click.
   */
  public handleCenterClick = (): void => {
    this.calendar.changeState(new DecadeState(this.calendar));
  }

  /**
   * Handling date cell click.
   *
   * @param {number} timestamp
   */
  public handleDateClick = (timestamp: number): void => {
    const scope = new Date(parseInt(`${timestamp}`, 10));
    this.calendar.changeScope(scope);
    this.calendar.changeState(new MonthState(this.calendar));
  }

  /**
   * Rendering HTML content.
   *
   * @return {IVDOMNode}
   */
  public render(): IVDOMNode {
    const { grid, scope, monthIsAllowed } = this.calendar;

    const dates: Date[] = grid.getMonths(scope);
    const months: string[] = grid.getMonthNames();

    return(
      v('fragment', {}, 
        v('nav', {className: 'pc-controls'},
          v('button', {type: 'button', className: 'pc-pointer pc-pointer-left', onClick: this.handleLeftClick}),
          v('button', {type: 'button', className: 'pc-title', onClick: this.handleCenterClick}, dates[0].getFullYear()),
          v('button', {type: 'button', className: 'pc-pointer pc-pointer-right', onClick: this.handleRightClick})
        ),
        v('div', {className: 'pc-plate pc-plate-months'}, 
          ...dates.map(date => {
            let className = 'pc-cell';

            if (!monthIsAllowed(date)) {
              className += ' light';
            }

            return v('button', {className, disabled: !monthIsAllowed(date), onClick: () => this.handleDateClick(date.getTime())}, months[date.getMonth()])
          })
        ) 
      )
    );
  }
}

export default YearState;
