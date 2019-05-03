import State from './State';
import YearState from './YearState';
import Calendar from '../Calendar/Calendar';
import { v, IVDOMNode } from '../VDOM';
import { resetMonth, resetYear, resetDecade, addYears } from '@pretty-calendar/core';

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
  public handleLeftClick = (): void => {
    let newScope = new Date(this.calendar.scope);

    newScope = resetMonth(newScope);
    newScope = resetYear(newScope);
    newScope = resetDecade(newScope);
    newScope = addYears(newScope, -10);

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
    newScope = resetDecade(newScope);
    newScope = addYears(newScope, 10);

    if(this.calendar.monthIsAllowed(newScope)) {
      this.calendar.changeScope(newScope);
      this.calendar.publisher.notify('next');
    }
  }

  /**
   * Handling center switcher click.
   */
  public handleCenterClick = (): void => {
    // null behavior
  }

  /**
   * Handling date cell click.
   * @param {number} timestamp
   */
  public handleDateClick = (timestamp: number): void => {
    const scope = new Date(parseInt(`${timestamp}`, 10));

    this.calendar.changeScope(scope);
    this.calendar.changeState(new YearState(this.calendar));
  }

  /**
   * Handling date cell click.
   *
   * @param {IVDOMNode} element
   */
  public render(): IVDOMNode {
    const { grid, scope, yearIsAllowed } = this.calendar;

    const dates: Date[] = grid.getYears(scope);

    return(
      v('fragment', {}, 
        v('nav', {className: 'pc-controls'},
          v('button', {type: 'button', className: 'pc-pointer pc-pointer-left', onClick: this.handleLeftClick}),
          v('button', {type: 'button', className: 'pc-title'}, `${dates[0].getFullYear()} - ${dates[dates.length - 1].getFullYear()}`),
          v('button', {type: 'button', className: 'pc-pointer pc-pointer-right', onClick: this.handleRightClick})
        ),
        v('div', {className: 'pc-plate pc-plate-months'}, 
          ...dates.map(date => {
            let className = 'pc-cell';

            if (!yearIsAllowed(date)) {
              className += ' light';
            }

            return v('button', {className, disabled: !yearIsAllowed(date), onClick: () => this.handleDateClick(date.getTime())}, date.getFullYear())
          })
        ) 
      )
    );
  }
}

export default DecadeState;
