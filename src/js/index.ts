import './Extensions/Date.ts';
import Calendar from './Calendar/Calendar';

const calendar = new Calendar('#pc', {
  selectedDate: new Date('2019-02-05')
});

calendar.on('prev', () => console.log('prev clicked'));
calendar.on('next', () => console.log('next clicked'));
calendar.on('state-changed', (state: any) => console.log('state changed ' + state ));
calendar.on('date-changed', (date: any) => console.log('date selected - ' + date));


document.addEventListener('keyup', ({keyCode}) => {
  if(keyCode === 81) {
    calendar.api.prev();
  }

  if(keyCode === 87) {
    calendar.api.next();
  }

  if(keyCode === 69) {
    calendar.api.changeState('YearState');
  }

  if(keyCode === 82) {
    calendar.api.changeScope(new Date('2019-01-01'));
  }

  if(keyCode === 84) {
    calendar.api.changeDate(new Date('2019-01-05'))
  }
})
