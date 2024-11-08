import { Metadata } from 'next';

// Constants
import { PREVIEW_IMAGE } from '@/constants';

// Components
import LoginForm from '@/features/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login page for Medical Dashboard',
  openGraph: {
    title: 'Login',
    description: 'Login page for Medical Dashboard',
    images: [
      {
        url: PREVIEW_IMAGE,
        alt: 'preview image',
      },
    ],
  },
};

const LoginPage = () => <LoginForm />;

export default LoginPage;
