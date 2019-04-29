import Calendar from '../Calendar/Calendar';
declare class DateInputExtension {
    private calendar;
    private id;
    private mask;
    constructor(calendar: Calendar);
    handleFocus: (event: any) => void;
    handleInput: (event: any) => void;
    private formatDate;
    render(): string;
}
export default DateInputExtension;
