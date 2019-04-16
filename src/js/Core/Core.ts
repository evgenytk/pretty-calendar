import { WeekdaysEnum, MonthsEnum, CalendarStatesEnum } from './Enums';
import { Day, CoreOptions } from './Interfaces';

class Core {

	private range: Array<Day>;

	private selected: Date;

	private firstDay: WeekdaysEnum;

	public state: CalendarStatesEnum;

	private gridSize: number = 42;

	constructor(options: CoreOptions) {
		this.range = this.makeRange(options.minDate, options.maxDate);
		this.selected = options.selectedDate;
		this.firstDay = options.firstDay;
		this.state = CalendarStatesEnum.DAYS;
	}

	private makeRange(startDate: Date, endDate: Date): Array<Day> {
		const diff:number = endDate.diffInDays(startDate);
		const days: Array<Day> = [];
		let i: number = 0;
		
		startDate = startDate.resetTime();

		for(i = 0; i < diff; i++) {
			days.push(this.makeDay(startDate));
			startDate = startDate.addDays(1);
		}

		return days;
	}

	private makeDay(date: Date): Day {
		return {
			day: date.getDate(),
			week: date.getDay() + 1,
			month: date.getMonth() + 1,
			year: date.getFullYear()
		}
	}

	public filter(): Array<Day> {
		const now: Day = this.makeDay(this.selected);

		// Get all days in current month
		const days: Array<Day> = this.range.filter((day: Day) => {
			return (
				day.year === now.year &&
				day.month === now.month
			)
		});

		// Getting a first index of the first day of current month in this.range
		let firstIndex: number = this.range.findIndex((day) => {
			return (
				day.year === days[0].year &&
				day.month === days[0].month &&
				day.day === days[0].day
			)
		});

		// Getting a last index of the first day of current month in this.range
		let lastIndex: number = this.range.findIndex((day) => {
			return (
				day.year === days[days.length - 1].year &&
				day.month === days[days.length - 1].month &&
				day.day === days[days.length - 1].day
			)
		});

		// Offset to left baesd on first day of week
		while(this.range[firstIndex] !== undefined && this.range[firstIndex].week !== this.firstDay) {
			days.unshift(this.range[firstIndex - 1]);
			firstIndex--;
		}

		// Offset to right baesd on first day of week
		while(this.range[lastIndex] !== undefined && days.length !== this.gridSize) {
			days.push(this.range[lastIndex + 1]);
			lastIndex++;
		}

		return days.filter((day: Day) => day !== undefined);
	}
}

export default Core;