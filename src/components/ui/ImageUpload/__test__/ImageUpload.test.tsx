import { render, screen } from '@testing-library/react';

import { ImageUpload } from '..';

describe('ImageUpload Component', () => {
  const mockOnRemoveImage = jest.fn();
  const mockOnClick = jest.fn();
  const mockOnUploadImage = jest.fn();

  const renderComponent = (props = {}) =>
    render(
      <ImageUpload
        onRemoveImage={mockOnRemoveImage}
        onUploadImage={mockOnUploadImage}
        onClick={mockOnClick}
        {...props}
      />,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const container = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('renders an avatar if src is provided', () => {
    renderComponent({ src: '/avatar.png' });
    const avatar = screen.getByAltText('Image for avatar');
    expect(avatar).toHaveAttribute('src', 'http://localhost:1341/avatar.png');
  });

  it('renders an uploaded image if srcUpload is provided', () => {
    renderComponent({ srcUpload: 'uploaded-image.png' });
    const uploadedImage = screen.getByAltText('Image for avatar');
    expect(uploadedImage).toHaveAttribute('src', 'uploaded-image.png');
  });
});
