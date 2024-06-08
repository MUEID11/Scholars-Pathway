import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Authentication/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const axiosPublic = useAxiosPublic();
  const createUser = (email, password, name, photo) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password, name, photo);
  };
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = async() => {
    setLoading(true);
    console.log('somssa ki bhai?')
    localStorage.removeItem('access-token');
    return await signOut(auth);
  };
  const updateUser = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
      setUser(currentUser);
      if(currentUser){
        const userInfo = {email: currentUser?.email}
        try{
        const res =  await axiosPublic.post('/jwt',userInfo )
        if(res.data.token){
          localStorage.setItem('access-token', res.data.token)
        }
           
        }catch(error){
          console.log(error.message)
        }
      }else{
        localStorage.removeItem('access-token')
      }
      console.log(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [axiosPublic]);
  const authInfo = {
    user,
    loading,
    createUser,
    setUser,
    logIn,
    updateUser,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
