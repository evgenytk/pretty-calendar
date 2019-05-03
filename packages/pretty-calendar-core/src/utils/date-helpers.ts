/**
 * Set time to 00:00:00.
 *
 * Example input:  2019-02-25 12:00:00
 * Example output: 2019-02-25 00:00:00
 * 
 * @param {Date}  date
 * @return {Date}
 */
export const resetTime = (date: Date): Date => {
  // make date immutable
  date = new Date(date);
  return new Date(date.setHours(0, 0, 0, 0));
}

/**
 * Set the first day of the month.
 * 
 * Example input:  2019-02-25 12:00:00
 * Example output: 2019-02-01 12:00:00
 *  
 * @param {Date}  date
 * @return {Date}
 */
export const resetMonth = (date: Date): Date => {
  date = new Date(date);
  return new Date(date.setDate(1));
};

/**
 * Set the first month of the year.
 * 
 * Example input:  2019-04-12 12:00:00
 * Example output: 2019-01-12 12:00:00
 *  
 * @param {Date}  date
 * @return {Date}
 */
export const resetYear = (date: Date): Date => {
  date = new Date(date);
  return new Date(date.setMonth(0));
};

/**
 * Set the first year of the decade.
 * 
 * Example input:  2019-02-25 12:00:00
 * Example output: 2010-02-25 12:00:00
 *  
 * @param {Date}  date
 * @return {Date}
 */
export const resetDecade = (date: Date): Date => {
  date = new Date(date);
  while (date.getFullYear() % 10 !== 0) {
    date = new Date(date.setFullYear(date.getFullYear() - 1));
  }

  return date;
};

/**
 * Add or reduce days to date.
 *
 * @param {Date}   date
 * @param {number} count
 * @return {Date}
 */
export const addDays = (date: Date, count: number): Date => {
  const timestamp: number = date.getTime();

  if (count >= 0) {
    return new Date(timestamp + 3600 * 24 * count * 1000);
  } else {
    return new Date(timestamp - 3600 * 24 * Math.abs(count) * 1000);
  }
};

/**
 * Add or reduce months to date.
 *
 * @param {Date}   date
 * @param {number} count
 * @return {Date}
 */
export const addMonths = (date: Date, count: number): Date => {
  date = new Date(date);
  if (count >= 0) {
    return new Date(date.setMonth(date.getMonth() + count));
  } else {
    return new Date(date.setMonth(date.getMonth() - Math.abs(count)));
  }
};
  
/**
 * Add or reduce months to date.
 *
 * @param {Date}   date
 * @param {number} count
 * @return {Date}
 */
export const addYears = (date: Date, count: number): Date => {
  date = new Date(date);
  if (count >= 0) {
    return new Date(date.setFullYear(date.getFullYear() + count));
  } else {
    return new Date(date.setFullYear(date.getFullYear() - Math.abs(count)));
  }
};


/**
 * Get time difference between two dates.
 * 
 * @param {Date} startDate
 * @param {Date} endDate
 * @return {number}
 */
export const diffInDays = (startDate: Date, endDate: Date): number => {
  startDate = resetTime(startDate);
  endDate = resetTime(endDate);

  return Math.abs((endDate.getTime() - startDate.getTime()) / (3600 * 24) / 1000);
}

/**
 * Checking the date is today.
 * 
 * @param {Date} date
 * @return {boolean}
 */
export const isToday = (date: Date): boolean => {
  return diffInDays(new Date(), date) === 0;
}

/**
 * Checking the date belongs to the month.
 *
 * Example input:  2019-02-24 12:00:00, 2019-02-12 12:00:00
 * Example output: true
 * 
 * @param {Date}  date
 * @param {Date}  testDate
 * @return {boolean}
 */
export const belongsToMonth = (date: Date, testDate: Date): boolean => {
  return testDate.getFullYear() === date.getFullYear() && testDate.getMonth() === date.getMonth();
};

