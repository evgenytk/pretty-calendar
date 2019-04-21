import './Extensions/Date.ts';
import Calendar from './Calendar/Calendar';

// const core = new Core({
//  minDate: new Date('2019-01-01'),
//  maxDate: new Date('2020-01-01'),
//  selectedDate: new Date('2019-02-15'),
//  firstDay: 2,
// });
// console.log(core.filter())


const calendar = new Calendar('#pc', {
  selectedDate: new Date('2019-02-05')
});

calendar.on('state-updated', () => console.log('state updated'));
calendar.on('prev-clicked', () => console.log('prev clicked'));
calendar.on('next-clicked', () => console.log('next clicked'));
calendar.on('center-clicked', () => console.log('center clicked'));



calendar.on('year-changed', (date: any) => console.log('year changed - ' + date));
calendar.on('month-changed', (date: any) => console.log('month changed - ' + date));
calendar.on('day-changed', (date: any) => console.log('day changed - ' + date));
calendar.on('date-selected', (date: any) => console.log('date selected - ' + date));


// OR

// calendar.on('update.state', () => console.log('state updated'));
// calendar.on('prev', () => console.log('prev clicked'));
// calendar.on('next', () => console.log('next clicked'));
// calendar.on('update.grid', () => console.log('grid updated'));


// calendar.on('change.year', (date: any) => console.log('year changed - ' + date));
// calendar.on('change.month', (date: any) => console.log('month changed - ' + date));
// calendar.on('change.day', (date: any) => console.log('day changed - ' + date));
// calendar.on('change.date', (date: any) => console.log('date changed - ' + date));

