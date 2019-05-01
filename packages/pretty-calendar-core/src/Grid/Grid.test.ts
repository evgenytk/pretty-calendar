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

  it('it should throw an error of the incorrect months length', () => {
    expect(() => {
      const grid = new Grid({
        months: []
      });
    }).toThrow();
  });

  it('it should throw an error of the incorrect daysMin length', () => {
    expect(() => {
      const grid = new Grid({
        daysMin: ['1', '2', '3']
      });
    }).toThrow();
  });

  it('it should return month names', () => {
    const grid = new Grid();
    expect(grid.getMonthNames().length).toEqual(12);
    expect(grid.getMonthNames()[0]).toEqual('January');
    expect(grid.getMonthNames()[11]).toEqual('December');
  });

  it('it should return translated month names', () => {
    const grid = new Grid({
      months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    });
    expect(grid.getMonthNames().length).toEqual(12);
    expect(grid.getMonthNames()[0]).toEqual('Январь');
    expect(grid.getMonthNames()[11]).toEqual('Декабрь');
  });

  it('it should return the week names', () => {
    const grid = new Grid();
    expect(grid.getWeekdayNames()[0]).toEqual('Mo');
    expect(grid.getWeekdayNames()[1]).toEqual('Tu');
    expect(grid.getWeekdayNames()[2]).toEqual('We');
    expect(grid.getWeekdayNames()[3]).toEqual('Th');
    expect(grid.getWeekdayNames()[4]).toEqual('Fr');
    expect(grid.getWeekdayNames()[5]).toEqual('Sa');
    expect(grid.getWeekdayNames()[6]).toEqual('Su');
  });

  it('it should return translated week names', () => {
    const grid = new Grid({
      daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    });
    expect(grid.getWeekdayNames()[0]).toEqual('Пн');
    expect(grid.getWeekdayNames()[1]).toEqual('Вт');
    expect(grid.getWeekdayNames()[2]).toEqual('Ср');
    expect(grid.getWeekdayNames()[3]).toEqual('Чт');
    expect(grid.getWeekdayNames()[4]).toEqual('Пт');
    expect(grid.getWeekdayNames()[5]).toEqual('Сб');
    expect(grid.getWeekdayNames()[6]).toEqual('Вс');
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
