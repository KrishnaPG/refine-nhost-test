import { useState } from 'react';
import { useSignInEmailPassword } from '@nhost/react';
import { Link, Navigate } from 'react-router-dom';
import Input from './Input';
import Spinner from './Spinner';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    signInEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignInEmailPassword();

  const handleOnSubmit = e => {
    e.preventDefault();
    signInEmailPassword(email, password);
  };

  if (isSuccess) {
    return <Navigate to="/" replace={true} />;
  }

  const disableForm = isLoading || needsEmailVerification;

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

        {needsEmailVerification ? (
          <p className="mt-12 text-center">
            Please check your mailbox and follow the verification link to verify
            your email.
          </p>
        ) : (
          <>
            <form onSubmit={handleOnSubmit} className="w-full">
              <div className="mt-12 w-full flex flex-col items-center space-y-6">
                <Input
                  type="email"
                  label="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={disableForm}
                  required
                />
                <Input
                  type="password"
                  label="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  disabled={disableForm}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={disableForm}
                className="mt-6 w-full font-medium inline-flex justify-center items-center rounded-md p-3 text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed  disabled:hover:bg-blue-600 disabled:hover:border-bg-600 transition-colors"
              >
                {isLoading ? <Spinner size="sm" /> : 'Sign in'}
              </button>

              {isError ? (
                <p className="mt-4 text-red-500 text-center">
                  {error?.message}
                </p>
              ) : null}
            </form>

            <Link
              to="/reset-password"
              className="mt-4 text-blue-600 hover:text-blue-500 hover:underline hover:underline-offset-1 transition"
            >
              Forgot your password?
            </Link>
          </>
        )}
      </div>

      <p className="sm:mt-8 text-gray-500 text-center">
        No account yet?{' '}
        <Link
          to="/sign-up"
          className="text-blue-600 hover:text-blue-500 hover:underline hover:underline-offset-1 transition"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
