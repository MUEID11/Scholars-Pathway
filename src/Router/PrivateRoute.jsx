import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const location = useLocation();
  if (loading) {
    return <Loading/>
  }
  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} replace to="/login"></Navigate>;
};

export default PrivateRoute;
