const authActions = {
  // eslint-disable-next-line no-unused-vars
  login(state, payload) {
    return {
      ...state,
      isAuth: true,
    };
  },
};

export default authActions;
