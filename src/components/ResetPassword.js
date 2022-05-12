import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useResetPassword, useAuthenticationStatus } from '@nhost/react';
import Input from './Input';
import Spinner from './Spinner';

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const { isLoading: isLoadingStatus, isAuthenticated } =
    useAuthenticationStatus();

  const {
    resetPassword,
    isLoading: isResettingPassword,
    isSent,
    isError,
    error,
  } = useResetPassword();

  const handleOnSubmit = e => {
    e.preventDefault();
    resetPassword(email, { redirectTo: '/profile' });
  };

  if (isLoadingStatus) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full max-w-lg">
      <div className="sm:rounded-xl sm:shadow-md sm:border border-opacity-50 sm:bg-white px-4 sm:px-8 py-12 flex flex-col items-center">
        <div className="h-14">
          <img
            src={process.env.PUBLIC_URL + 'logo.svg'}
            alt="logo"
            className="w-full h-full"
          />
        </div>

        <h1 className="mt-12 text-2xl font-semibold">Reset your password</h1>

        {isSent ? (
          <p className="mt-6 text-center">
            An email has been sent to <b>{email}</b>. Please follow the link in
            the email to reset your password.
          </p>
        ) : (
          <form onSubmit={handleOnSubmit} className="w-full">
            <div className="mt-12 w-full flex flex-col items-center space-y-6">
              <Input
                type="email"
                label="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={isResettingPassword}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isResettingPassword}
              className="mt-6 w-full font-medium inline-flex justify-center items-center rounded-md p-3 text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed  disabled:hover:bg-blue-600 disabled:hover:border-bg-600 transition-colors"
            >
              {isResettingPassword ? <Spinner size="sm" /> : 'Send reset link'}
            </button>

            {isError ? (
              <p className="mt-4 text-red-500 text-center">{error?.message}</p>
            ) : null}
          </form>
        )}
      </div>

      <p className="sm:mt-8 text-gray-500 text-center">
        Already have an account?{' '}
        <Link
          to="/sign-in"
          className="text-blue-600 hover:text-blue-500 hover:underline hover:underline-offset-1 transition"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default ResetPassword;
