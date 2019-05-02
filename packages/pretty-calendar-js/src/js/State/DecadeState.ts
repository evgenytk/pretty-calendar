import State from './State';
import YearState from './YearState';
import Calendar from '../Calendar/Calendar';
import { v, IVDOMNode } from '../VDOM';

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
    // TODO: create reset date method in this class.
    newScope = new Date(newScope.setDate(1));
    newScope = new Date(newScope.setMonth(0));
    // TODO: Implement method resetDecade right here! (maybe in Grid class)
    newScope = newScope.resetDecade();
    newScope = new Date(newScope.setFullYear(newScope.getFullYear() - 10));

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
    newScope = new Date(newScope.setMonth(0));
    // TODO: Implement method resetDecade right here! (maybe in Grid class)
    newScope = newScope.resetDecade();
    newScope = new Date(newScope.setFullYear(newScope.getFullYear() + 10));

    this.calendar.changeScope(newScope);
    this.calendar.publisher.notify('next');
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
