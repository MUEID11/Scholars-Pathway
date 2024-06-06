import { Navigate } from "react-router-dom";
import Loading from "../Components/Loading";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import useModerator from "../Hooks/useModerator";


const AdminModerator = ({children}) => {
    const{user, loading}= useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isModerator, isModeratorLoading] = useModerator();
    if(loading || isModeratorLoading || isAdminLoading){
        return <Loading/>
    }
    if(user && isModerator || user && isAdmin){
        return children;
    }
    return <Navigate state={location.pathname} replace to='/'></Navigate>
};

export default AdminModerator;