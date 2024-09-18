import { render } from '@testing-library/react';

// Component
import { Spinner } from '..';

describe('Spinner Component', () => {
  it('should render Spinner component correctly', () => {
    const { container } = render(<Spinner />);

    expect(container).toMatchSnapshot();
  });
});
