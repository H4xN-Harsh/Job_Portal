import {  createContext, useContext, useState } from "react";
import {useNavigate} from 'react-router-dom';
const AuthContext = createContext();
export const AuthProvider = ({children}) =>{
    const[user,setUser] = useState(
        JSON.parse(localStorage.getItem('user'))||null
    );
    const[token,setToken] = useState(localStorage.getItem('token')||null);
    const navigate = useNavigate();
    function login(userData,tokenData){
        setUser(userData);
        setToken(tokenData);
        localStorage.setItem('token',tokenData);
        localStorage.setItem('user',JSON.stringify(userData));
        navigate('/dashboard')
    }
    function logout(){
        setUser(null);
        setToken(null);
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
    }
    return(
        <AuthContext.Provider value={{user,token,login,logout}}>{children}</AuthContext.Provider>
    )
}
export const useAuth = ()=>useContext(AuthContext);