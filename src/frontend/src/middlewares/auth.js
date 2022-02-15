import { setAuth } from "@/common/helpers";

const auth = ({ next, store, nextMiddleware }) => {
  if (!store.state.Auth.isAuthenticated) {
    const token = store.$jwt.getToken();
    if (token) {
      setAuth(store);
    } else {
      next("/");
    }
  }
  return nextMiddleware();
};

export default auth;
