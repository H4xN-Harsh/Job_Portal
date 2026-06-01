import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../utils/api'
import { useAuth } from '../context/AuthContext'

export default function Apply() {
    const { id } = useParams()
    const [resume, setResume] = useState('')
    const { token } = useAuth()
    const navigate = useNavigate()

    async function handleApply(e) {
        e.preventDefault()
        try{
            const res = await API.post(`/applications/apply/${id}`,{resume},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            navigate('/my-application')

        }catch(err){
            console.log(err.response.data.message);
        }
        
    }
    return(
        <div className="flex items-center justify-center bg-[#0F1117] min-h-screen text-white p-8">
            <form onSubmit={handleApply}>
                <div>
                    <input type="link" required placeholder="send your resume" className="bg-[#2A2A3A] text-white rounded-lg p-3 outline-none border border-gray-700 focus:border-[#10B981]"
                    value={resume}
                    onChange={(e)=>setResume(e.target.value)}/>
                    <button 
                        onClick={() => navigate(`/apply/${id}`)}
                        className="mt-6 bg-[#10B981] hover:bg-[#0ea572] text-black font-semibold rounded-lg px-8 py-3 transition-all"
                    >
                        Apply Now 🚀
                    </button>
                </div>
            </form>
        </div>
    )
}