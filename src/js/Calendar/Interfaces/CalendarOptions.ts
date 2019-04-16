import { CoreOptions } from '../../Core/Interfaces';

export interface CalendarOptions extends CoreOptions {
	dateInput: boolean,
	timeInput: boolean,
	hours24: boolean,
	onChange: Function
}