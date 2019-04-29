import Mask from './Mask';

describe('Initialization', () => {
  it('it should initialize without errors', () => {
    const pattern = 'xx.xx.xxxx';

    expect(() => {
      const mask = new Mask(pattern);
    }).not.toThrow();

    expect(() => {
      const mask = new Mask(pattern, {
        placeholder: 'x',
      });
    }).not.toThrow();
  });

  it('it should mask value', () => {
    let value = '123456789098765432101234567890';
    let pattern = 'Ax±x§x!x@x#x$x%x^x&x*x(x)x_x+x{x}x[x]x;x:x\\x|x/x?x.x,x>x<x~xZ';
    let mask = new Mask(pattern);

    expect(mask.mask(value)).toEqual('A1±2§3!4@5#6$7%8^9&0*9(8)7_6+5{4}3[2]1;0:1\\2|3/4?5.6,7>8<9~0Z');
  });

  it('it should unmask value', () => {
    let value = 'A1±2§3!4@5#6$7%8^9&0*9(8)7_6+5{4}3[2]1;0:1\\2|3/4?5.6,7>8<9~0Z';
    let pattern = 'Ax±x§x!x@x#x$x%x^x&x*x(x)x_x+x{x}x[x]x;x:x\\x|x/x?x.x,x>x<x~xZ';
    let mask = new Mask(pattern);

    expect(mask.unmask(value)).toEqual('123456789098765432101234567890');
  });

  it('it should remask value', () => {
    let value = '123456789098765432101234567890';
    let pattern = 'Ax±x§x!x@x#x$x%x^x&x*x(x)x_x+x{x}x[x]x;x:x\\x|x/x?x.x,x>x<x~xZ';
    let mask = new Mask(pattern);

    expect(mask.reapply(value)).toEqual('A1±2§3!4@5#6$7%8^9&0*9(8)7_6+5{4}3[2]1;0:1\\2|3/4?5.6,7>8<9~0Z');
  });

  it('it should return caret position', () => {
    let pattern = 'xxxx-xxxx--xxxx---xxxx';
    let mask = new Mask(pattern);

    expect(mask.getCaretPosition(mask.unmask('111'))).toEqual(3);
    expect(mask.getCaretPosition(mask.unmask('1111'))).toEqual(5);
    expect(mask.getCaretPosition(mask.unmask('111111'))).toEqual(7);
    expect(mask.getCaretPosition(mask.unmask('111111111'))).toEqual(12);
    expect(mask.getCaretPosition(mask.unmask('11111111111111111'))).toEqual(22);
  });

  it('it should throw an error of the incorrect pattern length', () => {
    const pattern = '';
    expect(() => {
      const mask = new Mask(pattern);
    }).toThrow();
  });

  it('it should throw an error of the incorrect placeholder length', () => {
    const pattern = 'xx.xx.xxxx';
    expect(() => {
      const mask = new Mask(pattern, {
        placeholder: 'xx',
      });
    }).toThrow();
  });

  it('it should throw an error of the missing placeholder char in pattern', () => {
    const pattern = 'xx.xx.xxxx';
    expect(() => {
      const mask = new Mask(pattern, {
        placeholder: 'z',
      });
    }).toThrow();
  });
});
