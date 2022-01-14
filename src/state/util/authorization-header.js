import axios from 'axios';
const axiosRetry = require('axios-retry');

export default (token = null) => {
    axiosRetry(axios, {
        retries: 3, // number of retries
        retryDelay: (retryCount) => {
          console.log(`retry attempt: ${retryCount}`);
          return retryCount * 2000; // time interval between retries
        }
        // retryCondition: (error) => {
        //   // if retry condition is not specified, by default idempotent requests are retried
        //   return error.response.status === 503;
        // }
      });
    if (token) {
        axios.defaults.headers.common.authorization = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common.authorization;
    }
}