import axios from 'axios';

import Headers from '../utils/Headers';

const SIGNIN_URL = '/api/auth/signin';
const SIGNUP_URL = '/api/auth/signup';

const AuthenticationController = {
    signin: (credentials) =>
        axios
            .post(SIGNIN_URL, JSON.stringify(credentials), { headers: Headers.getHeaders() })
            .then((res) => res.data.payload),
    signup: (user) =>
        axios
            .post(SIGNUP_URL, JSON.stringify(user), { headers: Headers.getHeaders() })
            .then((res) => res.data.payload),
};

export default AuthenticationController;
