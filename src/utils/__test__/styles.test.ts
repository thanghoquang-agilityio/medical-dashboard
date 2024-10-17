import { cn } from '../styles';

describe('cn function', () => {
  it('should return correctly class string', () => {
    expect(cn('px-2', 'text-center')).toBe('px-2 text-center');
  });

  it('should return correctly class string with condition', () => {
    expect(cn('flex', { 'justify-center': true, 'justify-end': false })).toBe(
      'flex justify-center',
    );
  });

  it('should return correctly class string with multiple conditions', () => {
    expect(
      cn(
        'flex',
        { 'flex-row': true, 'flex-col': false },
        { 'gap-2': true, 'gap-4': false },
      ),
    ).toBe('flex flex-row gap-2');
  });

  it('should return correctly class string with array', () => {
    expect(cn('bg-red', ['border-1', 'border-primary-100'])).toBe(
      'bg-red border-1 border-primary-100',
    );
  });

  it('should return correctly class string with array and condition', () => {
    expect(
      cn('text-sm', [
        'font-bold',
        { ' text-center': true, ' text-italic': false },
        'text-primary-100',
      ]),
    ).toBe('text-sm font-bold text-center text-primary-100');
  });
});
