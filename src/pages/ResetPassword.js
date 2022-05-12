import { Helmet } from 'react-helmet';
import ResetPassword from '../components/ResetPassword';

const ResetPasswordPage = () => {
  return (
    <>
      <Helmet>
        <title>Reset password - Nhost</title>
      </Helmet>

      <div className="h-screen flex items-center justify-center py-6">
        <ResetPassword />
      </div>
    </>
  );
};

export default ResetPasswordPage;
