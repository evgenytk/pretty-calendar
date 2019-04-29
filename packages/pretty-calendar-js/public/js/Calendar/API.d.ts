import Calendar from './Calendar';
declare class API {
    /**
     * Calendar object.
     *
     * @type {Calendar}
     */
    private calendar;
    /**
     * Initialize.
     *
     * @param {Calendar} calendar [description]
     */
    constructor(calendar: Calendar);
    /**
     * Shift scope to left.
     */
    prev: () => void;
    /**
     * Shift scope to right.
     */
    next: () => void;
    /**
     * Changing calendar state.
     *
     * @param {string}  name
     */
    changeState: (name: string) => void;
    /**
     * Changing calendar scope.
     *
     * @param {Date}  date
     */
    changeScope: (date: Date) => void;
    /**
     * Changing selected date in calendar options.
     *
     * @param {Date}  date
     */
    changeDate: (date: Date) => void;
}
export default API;
