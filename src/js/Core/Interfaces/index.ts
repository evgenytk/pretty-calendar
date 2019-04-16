import { WeekdaysEnum, MonthsEnum } from '../Enums';

export interface Day {
	day: number,
	week: WeekdaysEnum,
	month: MonthsEnum,
	year: number
}

export interface CoreOptions {
	minDate: Date,
	maxDate: Date,
	selectedDate: Date,
	firstDay: WeekdaysEnum
}