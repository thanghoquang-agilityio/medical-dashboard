import { PREVIEW_IMAGE } from '@/constants';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const SignupForm = dynamic(() => import('@/features/auth/SignupForm'));

export const metadata: Metadata = {
  title: 'Signup',
  description: 'Signup page for Medical Dashboard',
  openGraph: {
    title: 'Signup',
    description: 'Signup page for Medical Dashboard',
    images: [
      {
        url: PREVIEW_IMAGE,
        alt: 'preview image',
      },
    ],
  },
};

const SignupPage = () => <SignupForm />;

export default SignupPage;
