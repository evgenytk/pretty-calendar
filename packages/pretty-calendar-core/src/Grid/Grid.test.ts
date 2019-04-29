import Grid from './Grid';

describe('Grid.ts', () => {
  it('it should initialize without errors', () => {
    expect(() => {
      const grid0 = new Grid();
      const grid1 = new Grid({
        firstDay: 0,
      });
      const grid2 = new Grid({
        firstDay: 6,
      });
    }).not.toThrow();

    expect(true);
  });

  it('it should throw an error of the incorrect firstDay option', () => {
    expect(() => {
      const grid = new Grid({
        firstDay: 9,
      });
    }).toThrow();
  });

  it('it should throw an error of the incorrect firstDay option type', () => {
    expect(() => {
      const grid = new Grid({
        firstDay: '1',
      });
    }).toThrow();
  });

  it('it should return month names', () => {
    const grid = new Grid();
    expect(grid.getMonthNames().length).toEqual(12);
  });

  it('it should return the week names', () => {
    const grid = new Grid();
    expect(grid.getWeekdayNames().length).toEqual(7);
    expect(grid.getWeekdayNames()[0]).toEqual('Mo');
  });

  it('it should return the week names with offset', () => {
    expect(new Grid({ firstDay: 0 }).getWeekdayNames()[0]).toEqual('Su');
    expect(new Grid({ firstDay: 1 }).getWeekdayNames()[0]).toEqual('Mo');
    expect(new Grid({ firstDay: 2 }).getWeekdayNames()[0]).toEqual('Tu');
    expect(new Grid({ firstDay: 3 }).getWeekdayNames()[0]).toEqual('We');
    expect(new Grid({ firstDay: 4 }).getWeekdayNames()[0]).toEqual('Th');
    expect(new Grid({ firstDay: 5 }).getWeekdayNames()[0]).toEqual('Fr');
    expect(new Grid({ firstDay: 6 }).getWeekdayNames()[0]).toEqual('Sa');
  });

  it('it should return days grid', () => {
    // Checking size
    expect(new Grid().getDays(new Date('2019-01-01')).length).toEqual(42);

    // Checking date
    expect(new Grid().getDays(new Date('2019-02-28'))[3].getDate()).toEqual(31);
    expect(new Grid().getDays(new Date('2019-02-28'))[4].getDate()).toEqual(1);
    expect(new Grid().getDays(new Date('2019-02-01'))[31].getDate()).toEqual(28);
    expect(new Grid().getDays(new Date('2019-02-01'))[32].getDate()).toEqual(1);
    expect(new Grid().getDays(new Date('2019-02-28'))[0].getMonth()).toEqual(0);
    expect(new Grid().getDays(new Date('2019-02-28'))[4].getMonth()).toEqual(1);
    expect(new Grid().getDays(new Date('2019-02-28'))[32].getMonth()).toEqual(2);
    expect(new Grid().getDays(new Date('2019-02-28'))[0].getFullYear()).toEqual(2019);
    expect(new Grid().getDays(new Date('2019-02-01'))[41].getFullYear()).toEqual(2019);

    // Checking date
    expect(new Grid().getDays(new Date('2000-02-29'))[0].getDate()).toEqual(31);
    expect(new Grid().getDays(new Date('2000-02-29'))[1].getDate()).toEqual(1);
    expect(new Grid().getDays(new Date('2000-02-29'))[29].getDate()).toEqual(29);
    expect(new Grid().getDays(new Date('2000-02-29'))[30].getDate()).toEqual(1);
    expect(new Grid().getDays(new Date('2000-02-29'))[1].getMonth()).toEqual(1);
    expect(new Grid().getDays(new Date('2000-02-29'))[29].getMonth()).toEqual(1);
    expect(new Grid().getDays(new Date('2000-02-29'))[0].getMonth()).toEqual(0);
    expect(new Grid().getDays(new Date('2000-02-29'))[31].getMonth()).toEqual(2);
    expect(new Grid().getDays(new Date('2000-02-29'))[0].getFullYear()).toEqual(2000);
    expect(new Grid().getDays(new Date('2000-02-29'))[41].getFullYear()).toEqual(2000);

    // Checking offset
    expect(new Grid({ firstDay: 0 }).getDays(new Date('2019-01-01'))[0].getDate()).toEqual(30);
    expect(new Grid({ firstDay: 0 }).getDays(new Date('2019-01-01'))[41].getDate()).toEqual(9);
    expect(new Grid().getDays(new Date('2019-12-01'))[0].getDate()).toEqual(25);
    expect(new Grid().getDays(new Date('2019-12-01'))[41].getDate()).toEqual(5);
    expect(new Grid({ firstDay: 0 }).getDays(new Date('2019-12-01'))[0].getDate()).toEqual(1);
    expect(new Grid({ firstDay: 0 }).getDays(new Date('2019-12-01'))[41].getDate()).toEqual(11);
  });

  it('it should return months grid', () => {
    new Grid().getMonths(new Date('2019-01-01')).forEach((date, i) => {
      expect(date.getDate()).toEqual(1);
      expect(date.getMonth()).toEqual(0 + i);
      expect(date.getFullYear()).toEqual(2019);
    });

    new Grid().getMonths(new Date('2019-12-31')).forEach((date, i) => {
      expect(date.getDate()).toEqual(1);
      expect(date.getMonth()).toEqual(0 + i);
      expect(date.getFullYear()).toEqual(2019);
    });

    new Grid().getMonths(new Date('2000-12-31')).forEach((date, i) => {
      expect(date.getDate()).toEqual(1);
      expect(date.getMonth()).toEqual(0 + i);
      expect(date.getFullYear()).toEqual(2000);
    });
  });

  it('it should return years grid', () => {
    new Grid().getYears(new Date('2019-12-31')).forEach((date, i) => {
      expect(date.getDate()).toEqual(1);
      expect(date.getMonth()).toEqual(0);
      expect(date.getFullYear()).toEqual(2010 + i);
    });

    new Grid().getYears(new Date('2010-01-01')).forEach((date, i) => {
      expect(date.getDate()).toEqual(1);
      expect(date.getMonth()).toEqual(0);
      expect(date.getFullYear()).toEqual(2010 + i);
    });

    new Grid().getYears(new Date('2015-01-01')).forEach((date, i) => {
      expect(date.getDate()).toEqual(1);
      expect(date.getMonth()).toEqual(0);
      expect(date.getFullYear()).toEqual(2010 + i);
    });

    new Grid().getYears(new Date('2000-01-01')).forEach((date, i) => {
      expect(date.getDate()).toEqual(1);
      expect(date.getMonth()).toEqual(0);
      expect(date.getFullYear()).toEqual(2000 + i);
    });

    new Grid().getYears(new Date('2009-12-31')).forEach((date, i) => {
      expect(date.getDate()).toEqual(1);
      expect(date.getMonth()).toEqual(0);
      expect(date.getFullYear()).toEqual(2000 + i);
    });
  });
});
