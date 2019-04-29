import State from './State';
import Calendar from '../Calendar/Calendar';
declare class DecadeState extends State {
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
    handleDateClick(element: Element): void;
    /**
     * Handling date cell click.
     *
     * @param {Element} element
     */
    render(): string;
}
export default DecadeState;
