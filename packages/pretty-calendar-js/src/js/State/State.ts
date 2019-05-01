import Calendar from '../Calendar/Calendar';
import { v, IVDOMNode } from '../VDOM';

/**
 * State pattern implementation.
 */
abstract class State {
  /**
   * @type {Calendar}
   */
  protected calendar: Calendar;

  /**
   * Initialization.
   *
   * @param {Calendar} calendar [description]
   */
  constructor(calendar: Calendar) {
    this.calendar = calendar;
  }

  /**
   * Rendering HTML content.
   *
   * @return {IVDOMNode} [description]
   */
  public abstract render(): IVDOMNode;

  /**
   * Handling left switcher click.
   */
  public abstract handleLeftClick(): void;

  /**
   * Handling right switcher click.
   */
  public abstract handleRightClick(): void;

  /**
   * Handling center switcher click.
   */
  public abstract handleCenterClick(): void;

  /**
   * Handling date cell click.
   *
   * @param {number} element [description]
   */
  public abstract handleDateClick(timestamp: number): void;
}

export default State;
