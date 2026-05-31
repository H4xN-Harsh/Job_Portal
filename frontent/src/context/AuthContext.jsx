import {  createContext, useContext, useState } from "react";
import {useNavigate} from 'react-router-dom';
const AuthContext = createContext();
export const AuthProvider = ({children}) =>{
    const[user,setUser] = useState(null);
    const[token,setToken] = useState(localStorage.getItem('token')||null);
    const navigate = useNavigate();
    function login(userData,tokenData){
        setUser(userData);
        setToken(tokenData);
        localStorage.setItem('token',tokenData);
        navigate('/dashboard')
    }
    function logout(){
        setUser(null);
        setToken(null);
        localStorage.removeItem('token')
        navigate('/login')
    }
    return(
        <AuthContext.Provider value={{user,token,login,logout}}>{children}</AuthContext.Provider>
    )
}
export const useAuth = ()=>useContext(AuthContext);