import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../context/AuthContext';
import API from '../utils/api';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();
    async function loginHandleSubmit (e){
        try{

            e.preventDefault();
            const res = await API.post('/auth/login',{email,password});
            const {token,user} = res.data;
            login(user,token);
            navigate('/dashboard');
        }catch(err){
            console.log(err.response.data.message);
        }
    }
    return (
        <div className="flex items-center justify-center bg-[#0F1117] w-full h-screen">
            <form onSubmit={loginHandleSubmit} className="flex flex-col items-center bg-[#1C1C27] w-[380px] rounded-2xl gap-4 p-8">
                <h1 className="text-white font-bold text-2xl">Welcome Back 👋</h1>
                <p className="text-gray-400 text-sm">Login to your account</p>

                <div className="flex flex-col w-full gap-1">
                    <label className="text-gray-400 text-sm">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#2A2A3A] text-white rounded-lg p-3 outline-none border border-gray-700 focus:border-[#10B981]"
                    />
                </div>

                <div className="flex flex-col w-full gap-1">
                    <label className="text-gray-400 text-sm">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-[#2A2A3A] text-white rounded-lg p-3 outline-none border border-gray-700 focus:border-[#10B981]"
                    />
                </div>

                <button className="w-full bg-[#10B981] hover:bg-[#0ea572] text-black font-semibold rounded-lg p-3 transition-all">
                    Login
                </button>

                <p className="text-gray-400 text-sm">
                    Don't have an account?{' '}
                    <span 
                        onClick={() => navigate('/register')}
                        className="text-[#10B981] cursor-pointer hover:underline"
                    >
                        Register
                    </span>
                </p>
            </form>
        </div>
    )
}