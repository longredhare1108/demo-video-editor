import axios from 'axios';

export default () => {
    axios.interceptors.response.use(undefined, function (error) {
        if (error.response.status === 408) {
            if (error.response.data.status === 'JWT_INVALID_OR_EXPIRED') {
                return true;
            }
        }
    });
    return false;
};
