import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Constants
import { SRC_LOGO } from '@/constants';

const LoginForm = dynamic(() => import('@/features/auth/LoginForm'));

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login page for Medical Dashboard',
  openGraph: {
    title: 'Login',
    description: 'Login page for Medical Dashboard',
    images: [
      {
        url: SRC_LOGO,
        alt: 'preview image',
      },
    ],
  },
};

const LoginPage = () => <LoginForm />;

export default LoginPage;
