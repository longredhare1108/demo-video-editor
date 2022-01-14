import userApi from '../../../api/api-controllers/user-controller';
import setAuthorizationHeader from '../../util/authorization-header';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../../manager/action-types'
// import decode from 'jwt-decode';

/**
 * User logout action creator
 */
 export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});


/**
 * login function calls api login then dispatch userLoggedIn action
 * @param {Object} credentials includes email and password
 */
 export const login = credentials => dispatch =>
 userApi.login(credentials).then(payload => {
     console.log(payload);
     localStorage.rbolJWT = payload.token;
     setAuthorizationHeader(payload.token);
    //  const payloadInToken = decode(payload.token);
    //  const userInfo = payload.user;
     
    //  const user = {
    //      token: localStorage.redtutorJWT,
    //      email: userInfo.email,
    //      confirmed: payloadInToken.confirmed,
    //      firstName:  userInfo.firstName,
    //      lastName: userInfo.lastName,
    //      accountInfo: userInfo,
    //      subjects: userInfo.subjects
    //  }
    //  dispatch(userLoggedIn(payload));
    window.location.href = "http://localhost:3000/dashboard"
     return payload;
 });

/**
* updateCompanyAccount function calls api login
* @param {Object} credentials includes companyId and field need to update
*/
export const updateCompanyAccount = data => dispatch => {
    userApi.updateCompanyAccount(data).then(payload => {
        return payload;
    });
}
/**
* updateLecturerAccount function calls api login
* @param {Object} credentials includes companyId and field need to update
*/
export const updateLecturerAccount = data => dispatch =>
    userApi.updateLecturerAccount(data).then(payload => {
        return payload;
    });

/**
* updateStudentAccount function calls api login
* @param {Object} credentials includes student account id
*/
export const updateStudentAccount = data => dispatch =>
    userApi.updateStudentAccount(data).then(payload => {
        return payload;
    });

/**
* deleteLecturerAccount function calls api login
* @param {Object} credentials includes company id and lecturer account id
*/
export const deleteLecturerAccount = data => (dispatch) => {
    userApi.deleteLecturerAccount(data);
}

/**
 * logout function remove token out of localStorage then dispatch userLoggedOut action
 */
 export const logout = () => dispatch => {
     console.log('logout')
    localStorage.clear();
    setAuthorizationHeader();
    window.location.href = "http://localhost:3000/"
    dispatch(userLoggedOut());
}