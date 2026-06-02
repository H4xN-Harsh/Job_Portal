import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";
import {useParams} from 'react-router-dom';
export default function GiverApplication(){
    const [applications,setApplications] = useState([]);
    const {token} = useAuth();
    const {id} = useParams();
    useEffect(()=>{
        async function getAllJobs(){
            try{
                const res = await API.get('/applications/all',{
                    headers:{Authorization:`Bearer ${token}`}
                });
                setApplications(res.data.applications)
            }catch(err){
                console.log(err.message.data.message)
            }
        }
        getAllJobs();
    },[])
    async function updateStatus(appId,status){
        try{
            const res = await API.put(`/applications/status/${appId}`,{status},{
                headers:{Authorization:`Bearer ${token}`}
            });
            setApplications(applications.map(app=>app._id===appId?{...app,status}:app))
        }catch(err){
            console.log(err.message.data.err)
        }
   }
    
        return (
    <div className="bg-[#0F1117] min-h-screen text-white p-8">
        <h1 className="text-3xl font-bold mb-8">Applications 📋</h1>
        
        {applications.length === 0 ? (
            <p className="text-gray-400">No applications yet.</p>
        ) : (
            <div className="flex flex-col gap-4">
                {applications.map((app) => (
                    <div key={app._id} className="bg-[#1C1C27] rounded-2xl p-6 flex items-center justify-between">
                        
                        {/* Left side — info */}
                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl font-bold">{app.job?.title}</h2>
                            <p className="text-[#10B981]">{app.job?.companyName}</p>
                            <p className="text-gray-400 text-sm">👤 {app.applicant?.name}</p>
                            <p className="text-gray-400 text-sm">📧 {app.applicant?.email}</p>
                            <a 
                                href={app.resume} 
                                target="_blank" 
                                className="text-blue-400 hover:underline text-sm"
                            >
                                📄 View Resume
                            </a>
                            <span className={`text-sm font-medium w-fit px-3 py-1 rounded-full ${
                                app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                app.status === 'reviewed' ? 'bg-blue-500/20 text-blue-400' :
                                'bg-red-500/20 text-red-400'
                            }`}>
                                {app.status}
                            </span>
                        </div>

                        {/* Right side — status buttons */}
                        <div className="flex flex-col gap-2">
                            <button 
                                onClick={() => updateStatus(app._id, 'reviewed')}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-all"
                            >
                                Mark Reviewed
                            </button>
                            <button 
                                onClick={() => updateStatus(app._id, 'rejected')}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-all"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
)
    
}