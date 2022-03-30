import { lazy } from 'react';

import Loadable from '../components/Loadable';
import MinimalLayout from '../components/layout/MinimalLayout/MinimalLayout';

const SigninPage = Loadable(lazy(() => import('views/authentication/signin/SigninPage')));
const SignupPage = Loadable(lazy(() => import('views/authentication/signup/SignupPage')));

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/signin',
            element: <SigninPage />,
        },
        {
            path: '/signup',
            element: <SignupPage />,
        },
    ],
};

export default AuthenticationRoutes;
