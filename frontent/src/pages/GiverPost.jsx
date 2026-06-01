import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function GiverPost(){
    const [title,setTitle] = useState();
    const [description,setDescription] = useState("");
    const [companyName,setCompanyName] = useState("");
    const [location,setLocation] = useState("");
    const [salary,setSalary] = useState();
    const [position,setPosition] = useState("");
    const [expiryDate,setExpiryDate] = useState();
    const {token} = useAuth();
    const navigate = useNavigate();
    async function postJobs(e) {
        e.preventDefault();
        try{
            const res = await API.post('/jobs/create',{title,description,companyName,location,salary,position,expiryDate},{
                headers:{Authorization : `Bearer ${token}`}
            });

            navigate('/dashboard');
        }catch(err){
            console.log(err.message.data.message);
        }
    }
    return(
        <div className="flex items-center justify-center bg-[#0F1117] w-full min-h-screen py-8">
    <form 
        className="flex flex-col items-center bg-[#1C1C27] w-[480px] rounded-2xl gap-4 p-8"
        onSubmit={postJobs}
    >
        <h1 className="text-white font-bold text-2xl">Post a Job 💼</h1>
        <p className="text-gray-400 text-sm">Fill in the details below</p>

        {/* Title */}
        <div className="flex flex-col w-full gap-1">
            <label className="text-gray-400 text-sm">Job Title</label>
            <input type="text" placeholder="e.g. Frontend Developer"
                value={title} onChange={(e) => setTitle(e.target.value)}
                className="bg-[#2A2A3A] text-white rounded-lg p-3 outline-none border border-gray-700 focus:border-[#10B981]"/>
        </div>

        {/* Description */}
        <div className="flex flex-col w-full gap-1">
            <label className="text-gray-400 text-sm">Description</label>
            <textarea placeholder="Job description..."
                value={description} onChange={(e) => setDescription(e.target.value)}
                className="bg-[#2A2A3A] text-white rounded-lg p-3 outline-none border border-gray-700 focus:border-[#10B981] h-24 resize-none"/>
        </div>

        {/* Company + Location */}
        <div className="flex w-full gap-3">
            <div className="flex flex-col w-full gap-1">
                <label className="text-gray-400 text-sm">Company</label>
                <input type="text" placeholder="Company name"
                    value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                    className="bg-[#2A2A3A] text-white rounded-lg p-3 outline-none border border-gray-700 focus:border-[#10B981]"/>
            </div>
            <div className="flex flex-col w-full gap-1">
                <label className="text-gray-400 text-sm">Location</label>
                <input type="text" placeholder="e.g. Lucknow"
                    value={location} onChange={(e) => setLocation(e.target.value)}
                    className="bg-[#2A2A3A] text-white rounded-lg p-3 outline-none border border-gray-700 focus:border-[#10B981]"/>
            </div>
        </div>

        {/* Salary + Position */}
        <div className="flex w-full gap-3">
            <div className="flex flex-col w-full gap-1">
                <label className="text-gray-400 text-sm">Salary</label>
                <input type="number" placeholder="e.g. 50000"
                    value={salary} onChange={(e) => setSalary(e.target.value)}
                    className="bg-[#2A2A3A] text-white rounded-lg p-3 outline-none border border-gray-700 focus:border-[#10B981]"/>
            </div>
            <div className="flex flex-col w-full gap-1">
                <label className="text-gray-400 text-sm">Position</label>
                <input type="text" placeholder="e.g. Junior Dev"
                    value={position} onChange={(e) => setPosition(e.target.value)}
                    className="bg-[#2A2A3A] text-white rounded-lg p-3 outline-none border border-gray-700 focus:border-[#10B981]"/>
            </div>
        </div>

        {/* Expiry Date */}
        <div className="flex flex-col w-full gap-1">
            <label className="text-gray-400 text-sm">Expiry Date</label>
            <input type="date"
                value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}
                className="bg-[#2A2A3A] text-white rounded-lg p-3 outline-none border border-gray-700 focus:border-[#10B981]"/>
        </div>

        <button className="w-full bg-[#10B981] hover:bg-[#0ea572] text-black font-semibold rounded-lg p-3 transition-all">
            Post Job 🚀
        </button>
    </form>
</div>
    )
}