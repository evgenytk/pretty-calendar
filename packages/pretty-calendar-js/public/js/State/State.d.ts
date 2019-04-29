import Calendar from '../Calendar/Calendar';
/**
 * State pattern implementation.
 */
declare abstract class State {
    /**
     * @type {Calendar}
     */
    protected calendar: Calendar;
    /**
     * Initialization.
     *
     * @param {Calendar} calendar [description]
     */
    constructor(calendar: Calendar);
    /**
     * Rendering HTML content.
     *
     * @return {string} [description]
     */
    abstract render(): string;
    /**
     * Handling left switcher click.
     */
    abstract handleLeftClick(): void;
    /**
     * Handling right switcher click.
     */
    abstract handleRightClick(): void;
    /**
     * Handling center switcher click.
     */
    abstract handleCenterClick(): void;
    /**
     * Handling date cell click.
     *
     * @param {Element} element [description]
     */
    abstract handleDateClick(element: Element): void;
}
export default State;
