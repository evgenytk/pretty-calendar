import './Extensions/Date.ts';
import Calendar from './Calendar/Calendar';

const calendar = new Calendar('#pc', {
  selectedDate: new Date('2019-02-05'),
});

calendar.on('prev', () => console.log('prev clicked'));
calendar.on('next', () => console.log('next clicked'));
calendar.on('state-changed', (state: any) => console.log('state changed ' + state));
calendar.on('scope-changed', (scope: any) => console.log('scope changed ' + scope));
calendar.on('date-changed', (date: any) => console.log('date selected - ' + date));

document.addEventListener('keyup', ({ keyCode }) => {
  if (keyCode === 81) {
    calendar.prev();
  }

  if (keyCode === 87) {
    calendar.next();
  }

  if (keyCode === 69) {
    calendar.changeState('YearState');
  }

  if (keyCode === 82) {
    calendar.changeScope(new Date('2019-01-01'));
  }

  if (keyCode === 84) {
    calendar.changeDate(new Date('2019-01-05'));
  }
});

// const mask = new Mask('+Z (xxx) xxx-xx-xx');
// const el = <HTMLInputElement>document.querySelector('#test');

// el.value = mask.reapply(el.value);
// el.addEventListener('focus', () => {
//   const pos = mask.getCaretPosition(mask.unmask(el.value));
//   setTimeout(() => {
//     el.setSelectionRange(pos, pos);
//   }, 0);
// });

// el.addEventListener('input', (e) => {
//   const event = e as any;

//   const unmasked = mask.unmask(el.value);
//   const oldPos = mask.getCaretPosition(unmasked.slice(0, -1));
//   const newPos = mask.getCaretPosition(unmasked);

//   if(event.inputType === 'deleteContentBackward' && newPos - oldPos > 1) {
//     el.value = mask.mask(unmasked);
//     el.setSelectionRange(oldPos + 1, oldPos + 1);
//   } else {
//     el.value = mask.mask(unmasked);
//     el.setSelectionRange(newPos, newPos);
//   }
// });
