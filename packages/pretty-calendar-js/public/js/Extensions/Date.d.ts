interface Date {
    resetTime(): Date;
    resetMonth(): Date;
    resetYear(): Date;
    resetDecade(): Date;
    diffInDays(date: Date): number;
    addDays(count: number): Date;
    addMonths(count: number): Date;
    addYears(count: number): Date;
    isToday(): boolean;
    dayInMonth(date: Date): boolean;
}
