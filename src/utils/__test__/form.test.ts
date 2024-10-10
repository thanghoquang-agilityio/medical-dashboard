import { FieldErrors } from 'react-hook-form';
import { clearErrorOnChange, isEnableSubmit } from '../form';

describe('clearErrorOnChange function', () => {
  const mockClearError = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should clear error when error message exist', () => {
    const fieldName = 'email';
    const errors = {
      [fieldName]: {
        type: 'required',
        message: 'error message',
      } as FieldErrors<{ [key: string]: { type: string; message: string } }>,
    };
    clearErrorOnChange(fieldName, errors, mockClearError);

    expect(mockClearError).toHaveBeenCalledWith(fieldName);
  });

  it('should not call clearErrorFunc when error message does not exist', () => {
    const fieldName = 'name';
    const errors = {};
    clearErrorOnChange(fieldName, errors, mockClearError);

    expect(mockClearError).not.toHaveBeenCalled();
  });
});

describe('isEnableSubmit function', () => {
  const requiredFields = ['name', 'email'];

  it('should return true when all required fields is filled and no error', () => {
    const dirtyFields = ['name', 'email'];
    const errors = {};

    expect(isEnableSubmit(requiredFields, dirtyFields, errors)).toBe(true);
  });

  it('should return false when required fields is not filled', () => {
    const dirtyFields = ['name'];
    const errors = {};

    expect(isEnableSubmit(requiredFields, dirtyFields, errors)).toBe(false);
  });

  it('should return false when there is an error', () => {
    const dirtyFields = ['name', 'email'];
    const errors = { email: { type: 'required', message: 'error message' } };

    expect(isEnableSubmit(requiredFields, dirtyFields, errors)).toBe(false);
  });
});
