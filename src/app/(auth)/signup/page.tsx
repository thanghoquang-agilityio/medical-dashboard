import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const SignupForm = dynamic(() => import('@/features/auth/SignupForm'));

export const metadata: Metadata = {
  title: 'Signup',
  description: 'Signup page for Medical Dashboard',
};

const SignupPage = () => <SignupForm />;

export default SignupPage;
