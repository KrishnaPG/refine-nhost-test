import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useOutletContext } from 'react-router-dom';
import { useChangePassword } from '@nhost/react';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-hot-toast';
import Input from '../components/Input';

const UPDATE_USER_MUTATION = gql`
  mutation ($id: uuid!, $displayName: String!, $metadata: jsonb) {
    updateUser(
      pk_columns: { id: $id }
      _set: { displayName: $displayName, metadata: $metadata }
    ) {
      id
      displayName
      metadata
    }
  }
`;

const Profile = () => {
  const { user } = useOutletContext();

  const { changePassword, isLoading: updatingPassword } = useChangePassword();

  const [mutateUser, { loading: updatingProfile }] =
    useMutation(UPDATE_USER_MUTATION);

  const [firstName, setFirstName] = useState(user?.metadata?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.metadata?.lastName ?? '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isFirstNameDirty = firstName !== user?.metadata?.firstName;
  const isLastNameDirty = lastName !== user?.metadata?.lastName;
  const isProfileFormDirty = isFirstNameDirty || isLastNameDirty;

  const isPasswordFormValid = password !== '' && password === confirmPassword;

  const updateUserProfile = async e => {
    e.preventDefault();

    try {
      await mutateUser({
        variables: {
          id: user.id,
          displayName: `${firstName} ${lastName}`.trim(),
          metadata: {
            firstName,
            lastName,
          },
        },
      });
      toast.success('Updated successfully', { id: 'updateProfile' });
    } catch (error) {
      toast.error('Unable to update profile', { id: 'updateProfile' });
    }
  };

  const updatePassword = async e => {
    e.preventDefault();

    const { isError, isSuccess } = await changePassword(password);

    if (isError) {
      toast.error('Unable to update password', { id: 'updatePassword' });
    } else if (isSuccess) {
      toast.success('Updated successfully', { id: 'updatePassword' });
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <>
      <Helmet>
        <title>Profile - Nhost</title>
      </Helmet>

      <div className="space-y-12">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-8">
          <div className="sm:min-w-[320px]">
            <h2 className="text-lg sm:text-xl">Profile</h2>
            <p className="mt-1 text-gray-500 leading-tight">
              Update your personal information.
            </p>
          </div>

          <div className="rounded-md shadow-md border border-opacity-50 w-full max-w-screen-md overflow-hidden bg-white">
            <form onSubmit={updateUserProfile}>
              <div className="px-4 md:px-8 py-6 space-y-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <Input
                    type="text"
                    label="First name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                  />
                  <Input
                    type="text"
                    label="Last name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="sm:max-w-md">
                  <Input
                    type="email"
                    label="Email address"
                    value={user?.email}
                    readOnly
                  />
                </div>
              </div>

              <div className="w-full bg-gray-50 py-4 px-4 md:px-8 flex justify-end">
                <button
                  type="submit"
                  disabled={!isProfileFormDirty || updatingProfile}
                  className="bg-gray-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-4 focus:ring-gray-700 focus:ring-opacity-20 hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-700"
                >
                  {updatingProfile ? 'Updating...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-8">
          <div className="sm:min-w-[320px]">
            <h2 className="text-lg sm:text-xl">Password</h2>
            <p className="mt-1 text-gray-500 leading-tight">
              Change your password.
            </p>
          </div>

          <div className="rounded-md shadow-md border border-opacity-50 w-full max-w-screen-md overflow-hidden bg-white">
            <form onSubmit={updatePassword}>
              <div className="px-4 md:px-8 py-6 space-y-6">
                <Input
                  type="password"
                  label="New password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  label="Confirm password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="w-full bg-gray-50 py-4 px-4 md:px-8 flex justify-end">
                <button
                  type="submit"
                  disabled={!isPasswordFormValid || updatingPassword}
                  className="bg-gray-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-4 focus:ring-gray-700 focus:ring-opacity-20 hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-700"
                >
                  {updatingPassword ? 'Updating...' : 'Change password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
