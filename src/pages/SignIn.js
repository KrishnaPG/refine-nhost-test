import { Helmet } from 'react-helmet';
import SignIn from '../components/SignIn';

const SignInPage = () => {
  return (
    <>
      <Helmet>
        <title>Sign in - Nhost</title>
      </Helmet>

      <div className="h-screen flex items-center justify-center py-6">
        <SignIn />
      </div>
    </>
  );
};

export default SignInPage;
