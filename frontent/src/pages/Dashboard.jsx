import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const { user } = useAuth()
    const navigate = useNavigate()

    return (
        <div className="bg-[#0F1117] min-h-screen text-white p-8">
            <h1 className="text-3xl font-bold mb-2">
                Welcome, {user?.name}! 👋
            </h1>
            <p className="text-gray-400 mb-8">
                {user?.role === 'seeker' ? 'Find your dream job' : 'Manage your job postings'}
            </p>

            {user?.role === 'seeker' ? (
                // Seeker Dashboard
                <div className="grid grid-cols-2 gap-6">
                    <div 
                        onClick={() => navigate('/jobs')}
                        className="bg-[#1C1C27] rounded-2xl p-6 cursor-pointer hover:border hover:border-[#10B981] transition-all">
                        <h2 className="text-xl font-bold">Browse Jobs 🔍</h2>
                        <p className="text-gray-400 mt-2">Find and apply for jobs</p>
                    </div>
                    <div 
                        onClick={() => navigate('/my-applications')}
                        className="bg-[#1C1C27] rounded-2xl p-6 cursor-pointer hover:border hover:border-[#10B981] transition-all">
                        <h2 className="text-xl font-bold">My Applications 📋</h2>
                        <p className="text-gray-400 mt-2">Track your applications</p>
                    </div>
                </div>
            ) : (
                // Giver Dashboard
                <div className="grid grid-cols-2 gap-6">
                    <div 
                        onClick={() => navigate('/post-job')}
                        className="bg-[#1C1C27] rounded-2xl p-6 cursor-pointer hover:border hover:border-[#10B981] transition-all">
                        <h2 className="text-xl font-bold">Post a Job 💼</h2>
                        <p className="text-gray-400 mt-2">Create new job listing</p>
                    </div>
                    <div 
                        onClick={() => navigate('/applications')}
                        className="bg-[#1C1C27] rounded-2xl p-6 cursor-pointer hover:border hover:border-[#10B981] transition-all">
                        <h2 className="text-xl font-bold">Applications 📬</h2>
                        <p className="text-gray-400 mt-2">Review applications</p>
                    </div>
                    <div 
    onClick={() => navigate('/my-jobs')}
    className="bg-[#1C1C27] rounded-2xl p-6 cursor-pointer hover:border hover:border-[#10B981] transition-all">
    <h2 className="text-xl font-bold">My Jobs 💼</h2>
    <p className="text-gray-400 mt-2">Manage your job postings</p>
</div>
                </div>
            )}
        </div>
    )
}