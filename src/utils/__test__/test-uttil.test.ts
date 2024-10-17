import { resolvedComponent } from '..';

describe('resolvedComponent function', () => {
  it('should return a function that resolves to the component result', async () => {
    const mockComponent = jest.fn(async (props) => `Hi, ${props.name}`);
    const props = { name: 'John' };
    const resultFn = await resolvedComponent(mockComponent, props);

    expect(typeof resultFn).toBe('function');

    const resolvedValue = resultFn();

    expect(resolvedValue).toBe(`Hi, ${props.name}`);
    expect(mockComponent).toHaveBeenCalledWith(props);
    expect(mockComponent).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if component throws', async () => {
    const error = new Error('Component error');
    const mockComponent = jest.fn(async () => {
      throw error;
    });

    await expect(resolvedComponent(mockComponent, {})).rejects.toThrow(
      'Component error',
    );
  });
});
