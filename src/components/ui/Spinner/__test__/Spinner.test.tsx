import { render } from '@testing-library/react';

// Component
import { Spinner } from '..';
import { SpinnerProps } from '@nextui-org/react';

describe('Spinner Component', () => {
  const setup = (props: SpinnerProps) => render(<Spinner {...props} />);

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render Spinner component correctly without props', () => {
    const { asFragment } = setup({});

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Spinner component correctly with props', () => {
    const { asFragment } = setup({
      classNames: {
        circle1: '',
        circle2: '',
      },
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
