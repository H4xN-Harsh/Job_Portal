import { useState, useEffect } from 'react'
import API from '../utils/api'
import { useAuth } from '../context/AuthContext'

export default function MyJobs() {
    const [jobs, setJobs] = useState([])
    const { token } = useAuth()

    useEffect(() => {
        async function allJobs(){
            try{
                const res = await API.get('/jobs/all')
                setJobs(res.data.job);
            }catch(err){
                console.log(err.message.data.message);
            }
        }
        allJobs();
    }, [])
    async function deleteJobs(jobId) {
        try{
            const res = await API.delete(`/jobs/${jobId}`,{
                headers:{Authorization:`Bearer ${token}`}
            })
            setJobs(jobs.filter(job => job._id !== jobId))
        }catch(err){
            console.log(err.message.data.message);
        }
    }
    

    return (
    <div className="bg-[#0F1117] min-h-screen text-white p-8">
        <h1 className="text-3xl font-bold mb-8">My Jobs 💼</h1>
        
        {jobs.length === 0 ? (
            <p className="text-gray-400">No jobs posted yet.</p>
        ) : (
            <div className="flex flex-col gap-4">
                {jobs.map((job) => (
                    <div key={job._id} className="bg-[#1C1C27] rounded-2xl p-6 flex items-center justify-between">
                        
                        {/* Left side */}
                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl font-bold">{job.title}</h2>
                            <p className="text-[#10B981]">{job.companyName}</p>
                            <div className="flex gap-4 text-gray-400 text-sm">
                                <span>📍 {job.location}</span>
                                <span>💰 ₹{job.salary}/month</span>
                            </div>
                            <span className={`text-sm font-medium w-fit px-3 py-1 rounded-full ${
                                job.status === 'open' 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                                {job.status}
                            </span>
                        </div>

                        {/* Right side — delete button */}
                        <button 
                            onClick={() => deleteJobs(job._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-all"
                        >
                            Delete 🗑️
                        </button>
                    </div>
                ))}
            </div>
        )}
    </div>
)
}