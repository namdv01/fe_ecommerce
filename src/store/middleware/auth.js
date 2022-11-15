import api from '../../config/api';
import { LOGIN } from '../../services/constants';

const authMiddleware = {
  login(value) {
    return async (dispatch, getState) => {
      const testInfomation = await api.get('https://jsonplaceholder.typicode.com/todos/1')
        .then((res) => res.data);
      dispatch({ type: LOGIN, payload: testInfomation });
    };
  },
};

export default authMiddleware;
