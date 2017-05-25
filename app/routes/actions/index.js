import checkUrl from '~/api/loginCheck.php';

export const checkLogin = () => (dispatch) => {
  return serviceApi('http://localhost/app/api/loginCheck.php' || checkUrl, {method: 'POST', body: JSON.stringify(data)}).then((json) => {
    if (json.loginSuccess){
      dispatch({
        type: types.LOGIN_SUCCESS
      });
    } else {
      return Promise.reject();
    }
  })
}
