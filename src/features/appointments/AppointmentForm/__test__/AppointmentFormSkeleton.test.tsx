import { render } from '@testing-library/react';
import { AppointmentFormSkeleton } from '../AppointmentFormSkeleton';

describe('AppointmentFormSkeleton test case', () => {
  const setup = () => render(<AppointmentFormSkeleton />);

  it('should render correctly', () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
