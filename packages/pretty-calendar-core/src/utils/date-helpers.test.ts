import {
  resetTime,
  resetMonth,
  resetYear,
  resetDecade,
  addDays,
  addMonths,
  addYears,
  diffInDays,
  isToday,
  belongsToMonth
} from './date-helpers';

const date = new Date('2019-02-05 12:33:44');

describe('', () => {
  it('resetTime() should set time to 00:00:00', () => {
    expect(resetTime(date).getTime()).toEqual(new Date('2019-02-05 00:00:00').getTime());
  });

  it('resetMonth() should set the first day of the month', () => {
    expect(resetMonth(date).getTime()).toEqual(new Date('2019-02-01 12:33:44').getTime());
  });

  it('resetYear() should set the first month of the year', () => {
    expect(resetYear(date).getTime()).toEqual(new Date('2019-01-05 12:33:44').getTime());
  });

  it('resetDecade() should set the first year of the decade', () => {
    expect(resetDecade(date).getTime()).toEqual(new Date('2010-02-05 12:33:44').getTime());
  });

  it('addDays() should add and reduce days', () => {
    expect(addDays(date, 5).getTime()).toEqual(new Date('2019-02-10 12:33:44').getTime());
    expect(addDays(date, -2).getTime()).toEqual(new Date('2019-02-03 12:33:44').getTime());
  });

  it('addMonths() should add and reduce months', () => {
    expect(addMonths(date, 2).getTime()).toEqual(new Date('2019-04-05 12:33:44').getTime());
    expect(addMonths(date, -15).getTime()).toEqual(new Date('2017-11-05 12:33:44').getTime());
  });

  it('addYears() should add and reduce years', () => {
    expect(addYears(date, 15).getTime()).toEqual(new Date('2034-02-05 12:33:44').getTime());
    expect(addYears(date, -15).getTime()).toEqual(new Date('2004-02-05 12:33:44').getTime());
  });

  it('diffInDays() should calc difference between to dates', () => {
    expect(diffInDays(date, new Date('2019-02-10 00:00:00'))).toEqual(5);
    expect(diffInDays(date, new Date('2019-02-10 23:59:59'))).toEqual(5);
    expect(diffInDays(date, date)).toEqual(0);
    expect(diffInDays(date, new Date('2018-01-05 00:00:00'))).toEqual(396);
    expect(diffInDays(date, new Date('2020-02-05 00:00:00'))).toEqual(365);
  });

  it('isToday() should define today', () => {
    expect(isToday(date)).toBe(false);
    expect(isToday(new Date())).toBe(true);
  });

  it('belongsToMonth() should check the date belongs to the month', () => {
    expect(belongsToMonth(date, new Date('2019-02-10 00:00:00'))).toBe(true);
    expect(belongsToMonth(date, new Date('2019-02-01 00:00:00'))).toBe(true);
    expect(belongsToMonth(date, new Date('2019-02-28 23:59:59'))).toBe(true);
    expect(belongsToMonth(date, new Date('2019-01-01 00:00:00'))).toBe(false);
    expect(belongsToMonth(date, new Date('2019-03-01 00:00:00'))).toBe(false);
  })
});