import dynamic from 'next/dynamic';

const SignupForm = dynamic(() => import('@/features/auth/SignupForm'));

const SignupPage = () => <SignupForm />;

export default SignupPage;
