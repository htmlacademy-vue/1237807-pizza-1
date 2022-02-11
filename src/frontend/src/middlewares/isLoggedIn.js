const isLoggedIn = ({ next, store, nextMiddleware }) => {
  if (store.$jwt.getToken()) {
    next("/");
  }
  return nextMiddleware();
};

export default isLoggedIn;
