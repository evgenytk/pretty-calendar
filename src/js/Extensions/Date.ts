interface Date {
  resetTime(): Date,
  diffInDays(date: Date): number,
  addDays(count: number): Date,
  isToday(): boolean,
  dayInMonth(date: Date): boolean
}

Date.prototype.resetTime = function(): Date {
  const timestamp: number = new Date(this).setHours(0, 0, 0, 0);

  return new Date(timestamp);
}

Date.prototype.diffInDays = function(date: Date): number {
  const startDate = new Date(this).resetTime();
  const endDate = new Date(date).resetTime();

  return Math.abs((endDate.getTime() - startDate.getTime()) / (3600 * 24) / 1000);
}

Date.prototype.addDays = function(count: number): Date {
  const timestamp: number = new Date(this).getTime();

  return new Date(timestamp + (3600 * 24 * 1000));
}

Date.prototype.isToday = function(): boolean {
  return new Date(this).diffInDays(new Date) === 0;
}

Date.prototype.dayInMonth = function(date: Date): boolean {
  const current: Date = new Date(this);

  return date.getFullYear() === current.getFullYear() && date.getMonth() === current.getMonth();
}