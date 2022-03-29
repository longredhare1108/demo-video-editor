import axios from 'axios';

import { RBOLServerURL } from '../util/serverUrl';
import Headers from '../utils/Headers';

const SIGNIN_URL = RBOLServerURL +  '/api/auth/signin';
const SIGNUP_URL = RBOLServerURL + '/api/auth/signup';

const AuthenticationController = {
    signin: (credentials) =>
        axios
            .post(SIGNIN_URL, JSON.stringify(credentials), { headers: Headers.getHeaders() })
            .then((res) =>  console.log(res.data)),
    signup: (user) =>
        axios
            .post(SIGNUP_URL, JSON.stringify(user), { headers: Headers.getHeaders() })
            .then((res) => {
                console.log(res.data);
                window.location.href = "http://localhost:3000/"
            }),
};

export default AuthenticationController;
