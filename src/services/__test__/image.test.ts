import { ImgBBResponse } from '@/types';
import { uploadImageToImgbb } from '../image';

jest.mock('@/services/api', () => ({
  uploadImageToImgbb: jest.fn(),
}));
describe('Image service test cases', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockResponse: ImgBBResponse = {
    data: {
      id: '2ndCYJK',
      title: 'c1f64245afb2',
      url_viewer: 'https://ibb.co/2ndCYJK',
      url: 'https://i.ibb.co/w04Prt6/c1f64245afb2.gif',
      display_url: 'https://i.ibb.co/98W13PY/c1f64245afb2.gif',
      width: '1',
      height: '1',
      size: '42',
      time: '1552042565',
      expiration: '0',
      image: {
        filename: 'c1f64245afb2.gif',
        name: 'c1f64245afb2',
        mime: 'image/gif',
        extension: 'gif',
        url: 'https://i.ibb.co/w04Prt6/c1f64245afb2.gif',
      },
      thumb: {
        filename: 'c1f64245afb2.gif',
        name: 'c1f64245afb2',
        mime: 'image/gif',
        extension: 'gif',
        url: 'https://i.ibb.co/2ndCYJK/c1f64245afb2.gif',
      },
      medium: {
        filename: 'c1f64245afb2.gif',
        name: 'c1f64245afb2',
        mime: 'image/gif',
        extension: 'gif',
        url: 'https://i.ibb.co/98W13PY/c1f64245afb2.gif',
      },
      delete_url: 'https://ibb.co/2ndCYJK/670a7e48ddcb85ac340c717a41047e5c',
    },
    success: true,
    status: 200,
  };
  const mockFormData: FormData = new FormData();

  const mockImageFile = new File([new Uint8Array(1024)], 'mockImage.png', {
    type: 'image/png',
  });

  mockFormData.append('image', mockImageFile);

  it('should return the image url', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      }),
    ) as jest.Mock;

    const { image } = await uploadImageToImgbb(mockFormData);

    expect(image).toEqual(mockResponse.data.url);
  });

  it('should handle error response', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(undefined),
        text: () => Promise.resolve('mock error'),
      }),
    ) as jest.Mock;

    const { error } = await uploadImageToImgbb(mockFormData);

    expect(error).toBe('mock error');
  });
});
