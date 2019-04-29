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

Date.prototype.resetTime = function(): Date {
  const timestamp: number = new Date(this).setHours(0, 0, 0, 0);

  return new Date(timestamp);
};

Date.prototype.resetMonth = function(): Date {
  let timestamp: number = new Date(this).setDate(1);
  return new Date(timestamp);
};

Date.prototype.resetYear = function(): Date {
  let timestamp: number = new Date(this).setMonth(0);
  timestamp = new Date(this).setDate(0);

  return new Date(timestamp);
};

Date.prototype.resetDecade = function(): Date {
  let date = new Date(this);
  while (date.getFullYear() % 10 !== 0) {
    date = new Date(date.setFullYear(date.getFullYear() - 1));
  }

  return date;
};

Date.prototype.diffInDays = function(date: Date): number {
  const startDate = new Date(this).resetTime();
  const endDate = new Date(date).resetTime();

  return Math.abs((endDate.getTime() - startDate.getTime()) / (3600 * 24) / 1000);
};

Date.prototype.addDays = function(count: number): Date {
  const timestamp: number = new Date(this).getTime();

  if (count >= 0) {
    return new Date(timestamp + 3600 * 24 * count * 1000);
  } else {
    return new Date(timestamp - 3600 * 24 * Math.abs(count) * 1000);
  }
};

Date.prototype.addMonths = function(count: number): Date {
  const date: Date = new Date(this);

  if (count >= 0) {
    return new Date(date.setMonth(date.getMonth() + count));
  } else {
    return new Date(date.setMonth(date.getMonth() - Math.abs(count)));
  }
};

Date.prototype.addYears = function(count: number): Date {
  const date: Date = new Date(this);

  if (count >= 0) {
    return new Date(date.setFullYear(date.getFullYear() + count));
  } else {
    return new Date(date.setFullYear(date.getFullYear() - Math.abs(count)));
  }
};

Date.prototype.isToday = function(): boolean {
  return new Date(this).diffInDays(new Date()) === 0;
};

Date.prototype.dayInMonth = function(date: Date): boolean {
  const current: Date = new Date(this);

  return date.getFullYear() === current.getFullYear() && date.getMonth() === current.getMonth();
};
