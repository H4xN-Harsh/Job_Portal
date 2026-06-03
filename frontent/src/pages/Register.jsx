import {useState} from "react";
import {useNavigate} from "react-router-dom"
import API from '../utils/api'
import {useAuth} from '../context/AuthContext'
export default function Register(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [role,setRole] = useState("seeker");
    const [resume,setResume] = useState("");
    const [company,setCompany] = useState("");
    const [description,setDescription] = useState("");
    const navigate = useNavigate();
    const {login} = useAuth();
    async function RegisterHandleSubmit(e){
        try{
            e.preventDefault();
            const res = await API.post('/auth/register',{name,email,password,role,resume,company,description});
            const {token,user} = res.data;
            login(user,token); 
            navigate('/dashboard');
        }catch(err){
            console.log(err.response.data.message);
        }
    }

    return (
        <div className="flex items-center justify-center bg-[#0F1117] w-full h-screen">
            <div>
                <form onSubmit={RegisterHandleSubmit} className="flex flex-col items-center bg-[#1C1C27] w-[380px] rounded-2xl gap-4 p-8">
                    <h1 className="text-white font-bold text-2xl">Welcome 👋</h1>
                    <p className="text-gray-400 text-sm">Register your account</p>
                    <div className="flex flex-col w-full gap-1">
                        <label className="text-gray-400 text-sm">Name</label>
                        <input
                            type="text"
                            placeholder="Enter your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-[#2A2A3A] text-white rounded-lg   p-3 outline-none border border-gray-700   focus:border-[#10B981]"
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label className="text-gray-400 text-sm">Email</label>
                        <input
                            type="text"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-[#2A2A3A] text-white rounded-lg   p-3 outline-none border border-gray-700   focus:border-[#10B981]"
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label className="text-gray-400 text-sm">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-[#2A2A3A] text-white rounded-lg   p-3 outline-none border border-gray-700   focus:border-[#10B981]"
                        />
                    </div>
                    <div className="flex items-center justify-between pl-2 pr-2 w-full ">
                        <button type="button" onClick={()=>setRole('giver')} className={`text-lg border-2 p-2 rounded-2xl transition-all ${
                        role === 'giver' 
                        ? 'border-[#10B981] text-[#10B981]' 
                        : 'border-gray-700 text-gray-400 hover:border-[#10B981]'
                        }`}>Giver</button>
                        <button type="button" onClick={()=>setRole('seeker')} className={`text-lg border-2 p-2 rounded-2xl transition-all ${
                            role === 'seeker' 
                            ? 'border-[#10B981] text-[#10B981]' 
                        : 'border-gray-700 text-gray-400 hover:border-[#10B981]'
                        }`}>Seeker</button>
                    </div>
                    {/* Role buttons ke baad ye add karo */}

                    

                    {role === 'giver' && (
                        <div className="flex flex-col w-full gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-gray-400 text-sm">Company Name</label>
                                <input
                                    type="text"
                                    value={company}
                                    onChange={(e)=>setCompany(e.target.value)}
                                    placeholder="Enter company name"
                                    className="bg-[#2A2A3A] text-white rounded-lg p-3 outline-none border border-gray-700 focus:border-[#10B981]"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-gray-400 text-sm">Designation</label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e)=>setDescription(e.target.value)}
                                    placeholder="Enter your designation"
                                    className="bg-[#2A2A3A] text-white rounded-lg p-3 outline-none border border-gray-700                   focus:border-[#10B981]"
                             />
                            </div>
                        </div>
                    )}
                    <div>
                        <button className="w-full bg-[#10B981] hover:bg-[#0ea572] text-black font-semibold rounded-lg p-3 transition-all">Register</button>
                        <p className="text-gray-400 text-sm">
                            If you have an account?{' '}
                            <span 
                                onClick={() => navigate('/login')}
                                className="text-[#10B981] cursor-pointer hover:underline"
                            >
                                Login
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}