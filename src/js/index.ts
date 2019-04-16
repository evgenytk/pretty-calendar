import './Extensions/Date.ts';
import Core from './Core/Core';
import Calendar from './Calendar/Calendar';
import HTMLNode from './HTML/HTMLNode';

// const core = new Core({
//  minDate: new Date('2019-01-01'),
//  maxDate: new Date('2020-01-01'),
//  selectedDate: new Date('2019-02-15'),
//  firstDay: 2,
// });
// console.log(core.filter())


// const calendar = new Calendar('#pc', {
//  selectedDate: new Date('2019-02-01')
// });
const calendar = new Calendar('#pc');
