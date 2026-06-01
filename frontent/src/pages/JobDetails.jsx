
import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import API from '../utils/api'
import {useAuth} from '../context/AuthContext';
import {useNavigate} from "react-router-dom"
export default function JobDetails(){
    const {id} = useParams();
    const [data,setData]=useState(null);
    const {user} = useAuth();
    console.log(user)
    const navigate = useNavigate();
    useEffect(()=>{
        async function Details(id) {
            try{
                const res = await API.get(`/jobs/${id}`);
                
                setData(res.data.job);
            }catch(err){
                console.log(err);
            }
        }
        Details(id);

    },[id])
    console.log(data);
    return(
        <div className="bg-[#0F1117] min-h-screen text-white p-8">
        {data && (
            <div className="bg-[#1C1C27] rounded-2xl p-8">
                <h1 className="text-3xl font-bold">{data.title}</h1>
                <h2 className="text-[#10B981] text-xl mt-2">{data.companyName}</h2>
                <p className="text-gray-400 mt-2">📍 {data.location}</p>
                <p className="text-gray-400">💰 ₹{data.salary}/month</p>
                <p className="text-white mt-4">{data.description}</p>
                {user && user.role === 'seeker' && (
                    <button 
                        onClick={() => navigate(`/apply/${id}`)}
                        className="mt-6 bg-[#10B981] hover:bg-[#0ea572] text-black font-semibold rounded-lg px-8 py-3 transition-all"
                    >
                        Apply Now 🚀
                    </button>
                )}
            </div>
            
        )}
    </div>
    )
}