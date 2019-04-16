import { CoreOptions } from '../../Core/Interfaces';

export interface CalendarOptions extends CoreOptions {
	dateInput: boolean,
	timeInput: boolean,
	hours24: boolean,
	onChange: Function
}

export interface HTMLControls {
	left: Element,
	center: Element,
	right: Element
}

export interface CalendarNodes {
	wrapper: Element,
	container: Element,
	row: Element,
	controls: HTMLControls,
	plate: Element
}