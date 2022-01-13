import userApi from '../../../api/api-controllers/user-controller';

/**
* updateCompanyAccount function calls api login
* @param {Object} credentials includes companyId and field need to update
*/
export const updateCompanyAccount = data => dispatch =>
    userApi.updateCompanyAccount(data).then(payload => {
        return payload;
    });

/**
* updateLecturerAccount function calls api login
* @param {Object} credentials includes companyId and field need to update
*/
export const updateLecturerAccount = data => dispatch =>
    userApi.updateLecturerAccount(data).then(payload => {
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
* updateStudentAccount function calls api login
* @param {Object} credentials includes student account id
*/
export const updateStudentAccount = data => dispatch =>
    userApi.updateStudentAccount(data).then(payload => {
        return payload;
    });