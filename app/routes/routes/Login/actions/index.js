import {serviceApi} from '@/common/utils';
import loginUrl from '~/api/login.php';
import * as types from '~/routes/actions/consts';

export const login = (data) => (dispatch) => {
  return serviceApi(['http://localhost/app/api/login.php', loginUrl], {method: 'POST', body: JSON.stringify(data)}).then((json) => {
    if (json.loginSuccess){
      dispatch({
        type: types.LOGIN_SUCCESS
      });
    } else {
      return Promise.reject();
    }
  })
}
