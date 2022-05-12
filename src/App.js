import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NhostReactProvider } from '@nhost/react';
import { NhostApolloProvider } from '@nhost/react-apollo';

import toast, { Toaster } from 'react-hot-toast';

import { nhost } from './lib/nhost';

import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import { Refine } from '@pankod/refine-core';
import {
  Layout as antdLayout,
  LoginPage,
  ReadyPage,
  notificationProvider,
  ErrorComponent,
} from '@pankod/refine-antd';
import routerProvider from '@pankod/refine-react-router-v6';
import dataProvider from '@pankod/refine-nhost';

import '@pankod/refine-antd/dist/styles.min.css';

//import { PostList, PostCreate, PostEdit, PostShow } from 'pages/posts';
import { CategoriesList, CategoriesCreate, CategoriesEdit } from 'pages/categories';
import { TenantsList, TenantsCreate, TenantsEdit } from 'pages/tenants';

const authProvider = {
  login: async ({ username, password }) => {
    const { error } = await nhost.auth.signIn({
      email: username,
      password,
    });

    if (error) {
      return Promise.reject(error);
    }

    return Promise.resolve();
  },
  logout: async () => {
    const { error } = await nhost.auth.signOut();
    if (error) {
      return Promise.reject(error);
    }

    return Promise.resolve('/');
  },
  checkError: (error) => {
    console.log('check error: ', error);
    if (error.status === 401) {
      return nhost.auth.refreshSession();
    }
    return Promise.resolve();
  },
  checkAuth: async () => {
    const isAuthenticated = await nhost.auth.isAuthenticatedAsync();
    if (isAuthenticated) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  getPermissions: () => {
    const user = nhost.auth.getUser();
    if (user) {
      return Promise.resolve(user.roles);
    }

    return Promise.resolve([]);
  },
  getUserIdentity: () => {
    const user = nhost.auth.getUser();
    if (user) {
      return Promise.resolve({
        ...user,
        name: user.displayName,
        avatar: user.avatarUrl,
      });
    }

    return Promise.resolve(null);
  },
};

const customNHost = {
  graphql: {
    request: (query, variables) => {
      return nhost.graphql.request(query, variables, { retry: false }).then((result) => {
        if (result.error) {
          throw result.error;
          //toast.error(JSON.stringify(result.error));
        }
        return result;
      });
    },
  },
};

function App() {
  return (
    <>
      <NhostReactProvider nhost={nhost}>
        <NhostApolloProvider nhost={nhost}>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(nhost)}
            authProvider={authProvider}
            LoginPage={LoginPage}
            Layout={antdLayout}
            ReadyPage={ReadyPage}
            notificationProvider={notificationProvider}
            catchAll={<ErrorComponent />}
            resources={[
              {
                name: 'tenants',
                list: TenantsList,
                create: TenantsCreate,
                edit: TenantsEdit,
              },
              {
                name: 'categories',
                list: CategoriesList,
                create: CategoriesCreate,
                edit: CategoriesEdit,
              },
            ]}
            reactQueryClientConfig={{
              defaultOptions: {
                mutations: {
                  retry: (retryCount, error) => {
                    if (error.statusCode === 200) {
                      return false;
                    }
                    return true;
                  },
                },
                queries: {
                  retry: (retryCount, error) => {
                    if (error.statusCode === 200) {
                      return false;
                    }
                    return true;
                  },
                },
              },
            }}
          />
        </NhostApolloProvider>
      </NhostReactProvider>

      <Toaster />
    </>
  );
}

export default App;
