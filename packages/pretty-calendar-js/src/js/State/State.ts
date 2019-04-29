import Calendar from '../Calendar/Calendar';

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
   * @return {string} [description]
   */
  public abstract render(): string;

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
   * @param {Element} element [description]
   */
  public abstract handleDateClick(element: Element): void;
}

export default State;
