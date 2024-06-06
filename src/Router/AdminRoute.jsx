import { Navigate } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading";


const AdminRoute = ({children}) => {
    const {user, loading,} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
   
   if(loading || isAdminLoading)return <Loading/>;
   if(user && isAdmin){
    return children;
   }
   return <Navigate state={location?.pathname} replace to='/'></Navigate>
};

export default AdminRoute;