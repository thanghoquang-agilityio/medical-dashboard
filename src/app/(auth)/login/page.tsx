import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('@/features/auth/LoginForm'));

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login page for Medical Dashboard',
};

const LoginPage = () => <LoginForm />;

export default LoginPage;
