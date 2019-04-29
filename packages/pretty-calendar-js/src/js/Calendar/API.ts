import Calendar from './Calendar';
import State from '../State/State';
import MonthState from '../State/MonthState';
import YearState from '../State/YearState';
import DecadeState from '../State/DecadeState';

class API {
  /**
   * Calendar object.
   * 
   * @type {Calendar}
   */
  private calendar: Calendar;

  /**
   * Initialize.
   * 
   * @param {Calendar} calendar [description]
   */
  constructor(calendar: Calendar) {
    this.calendar = calendar;
  }

  /**
   * Shift scope to left.
   */
  public prev = ():void => {
    this.calendar.state.handleLeftClick();
  }

  /**
   * Shift scope to right.
   */
  public next = ():void => {
    this.calendar.state.handleRightClick();
  }

  /**
   * Changing calendar state.
   * 
   * @param {string}  name
   */
  public changeState = (name: string):void => {
    const states: any = {
        MonthState,
        YearState,
        DecadeState
    };

    if(states[name] === undefined) {
      throw new Error(`Unknown state name. Use the one of this - ${Object.keys(states).join(', ')}`)
    }

    this.calendar.updateState(new states[name](this.calendar))
  }

  /**
   * Changing calendar scope.
   * 
   * @param {Date}  date
   */
  public changeScope = (date: Date):void => {
    this.calendar.scope = date;
    this.calendar.updateState(this.calendar.state);
  }

  /**
   * Changing selected date in calendar options.
   * 
   * @param {Date}  date
   */
  public changeDate = (date: Date):void => {
    this.calendar.options.selectedDate = date;
    this.calendar.updateState(this.calendar.state);
  }
}

export default API;