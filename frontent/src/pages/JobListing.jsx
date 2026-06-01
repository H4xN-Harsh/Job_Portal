import { useState, useEffect } from 'react'
import API from '../utils/api'
import {useNavigate} from 'react-router-dom';
export default function Jobs() {
    const [jobs, setJobs] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchJobs(){
            try{
                const res = await API.get('/jobs/all');
                setJobs(res.data.job);
            }catch(err){
                console.log(err);
            }
        }
        fetchJobs();
    }, [])

    return (
        <div className="bg-[#0F1117] min-h-screen flex flex-wrap gap-6 text-white p-8">
            {jobs.map((job) =>(
                    <div key={job._id} className='bg-[#1C1C27] rounded-2xl p-6 flex flex-col  h-[30%] w-[20%] w-2xs gap-3'>
                    <h1 className='text-white font-bold text-xl'>{job.title}</h1>
                    <h2 className='text-[#10B981] font-medium'>{job.companyName}</h2>
                    <div className='flex gap-4 text-gray-400 text-sm'>
                        <span>📍 {job.location}</span>
                        <span>💰 ₹{job.salary}/month</span>
                    </div>
                    <button onClick={()=>navigate(`/jobs/${job._id}`)} className='w-full bg-[#10B981] hover:bg-[#0ea572] text-black                font-semibold rounded-lg p-2 transition-all mt-2'>
                        View Details
                    </button>
                </div>
            ))}
        </div>
    )
}