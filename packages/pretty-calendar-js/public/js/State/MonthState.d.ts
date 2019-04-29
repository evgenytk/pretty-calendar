import State from './State';
import Calendar from '../Calendar/Calendar';
declare class MonthState extends State {
    /**
     * Initialization.
     *
     * @param {Calendar} calendar
     */
    constructor(calendar: Calendar);
    /**
     * Handling left switcher click.
     */
    handleLeftClick(): void;
    /**
     * Handling right switcher click.
     */
    handleRightClick(): void;
    /**
     * Handling center switcher click.
     */
    handleCenterClick(): void;
    /**
     * Handling date cell click.
     *
     * @param {Element} element
     */
    handleDateClick(element: Element): void;
    /**
     * Rendering HTML content.
     *
     * @return {string}
     */
    render(): string;
}
export default MonthState;
