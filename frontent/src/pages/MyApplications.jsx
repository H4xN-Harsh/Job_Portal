import { useState, useEffect } from 'react'
import API from '../utils/api'
import { useAuth } from '../context/AuthContext'

export default function MyApplications() {
    const [applications, setApplications] = useState([])
    const { token } = useAuth()

    useEffect(() => {
        async function fetchApplications() {
            try {
                const res = await API.get('/applications/my', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setApplications(res.data.applied)
            } catch(err) {
                console.log(err)
            }
        }
        fetchApplications()
    }, [])

    return (
        <div className="bg-[#0F1117] min-h-screen text-white p-8">
            <h1 className="text-3xl font-bold mb-8">My Applications</h1>
            {applications.map((app) => (
                <div key={app._id} className="bg-[#1C1C27] rounded-2xl p-6 mb-4">
                    <h2 className="text-xl font-bold">{app.job?.title}</h2>
                    <p className="text-[#10B981]">{app.job?.companyName}</p>
                    <p className="text-gray-400 mt-2">Status: 
                        <span className="ml-2 text-yellow-400">{app.status}</span>
                    </p>
                </div>
            ))}
        </div>
    )
}