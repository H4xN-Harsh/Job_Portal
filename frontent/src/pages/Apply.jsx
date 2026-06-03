import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../utils/api'
import { useAuth } from '../context/AuthContext'

export default function Apply() {
    const { id } = useParams()
    const [resume, setResume] = useState(null) // ← file hogi ab
    const { token } = useAuth()
    const navigate = useNavigate()

    async function handleApply(e) {
        e.preventDefault()
        try {
            const formData = new FormData() // ← FormData use karenge
            formData.append('resume', resume)
            
            await API.post(
                `/applications/apply/${id}`,
                formData,
                { 
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data' // ← important
                    } 
                }
            );
            navigate('/my-applications')
        } catch(err) {
            console.log(err.response.data.message);
        }
    }

    return (
        <div className="flex items-center justify-center bg-[#0F1117] w-full h-screen">
            <form onSubmit={handleApply} className="flex flex-col items-center bg-[#1C1C27] w-[380px] rounded-2xl gap-4 p-8">
                <h1 className="text-white font-bold text-2xl">Apply Now 🚀</h1>
                
                <div className="flex flex-col w-full gap-1">
                    <label className="text-gray-400 text-sm">Upload Resume (PDF only)</label>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setResume(e.target.files[0])}
                        className="bg-[#2A2A3A] text-white rounded-lg p-3 outline-none border border-gray-700"
                    />
                </div>

                <button className="w-full bg-[#10B981] hover:bg-[#0ea572] text-black font-semibold rounded-lg p-3 transition-all">
                    Submit Application 🚀
                </button>
            </form>
        </div>
    )
}