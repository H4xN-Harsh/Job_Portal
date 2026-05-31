import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Nav() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    
    return (
        <nav className="flex items-center justify-between bg-[#0F1117] text-white w-full h-7 p-7">
            <div className="text-center bg-[#10B981] text-black w-[90px] h-[32px] rounded-2xl hover:bg-[#14c489] flex items-center justify-center cursor-pointer"
                onClick={() => navigate('/')}>
                <h3>nivi.co</h3>
            </div>
            
            <div className="flex gap-6 items-center">
                {!user ? (
                    // Logged OUT
                    <>
                        <span onClick={() => navigate('/jobs')} className="cursor-pointer hover:text-[#10B981]">Jobs</span>
                        <span onClick={() => navigate('/login')} className="cursor-pointer hover:text-[#10B981]">Login</span>
                        <span onClick={() => navigate('/register')} className="cursor-pointer hover:text-[#10B981]">Register</span>
                    </>
                ) : user.role === 'seeker' ? (
                    // Logged IN — Seeker
                    <>
                        <span onClick={() => navigate('/jobs')} className="cursor-pointer hover:text-[#10B981]">Jobs</span>
                        <span onClick={() => navigate('/my-applications')} className="cursor-pointer hover:text-[#10B981]">My Applications</span>
                        <span onClick={logout} className="cursor-pointer hover:text-red-400">Logout</span>
                    </>
                ) : (
                    // Logged IN — Giver
                    <>
                        <span onClick={() => navigate('/post-job')} className="cursor-pointer hover:text-[#10B981]">Post Job</span>
                        <span onClick={() => navigate('/applications')} className="cursor-pointer hover:text-[#10B981]">Applications</span>
                        <span onClick={logout} className="cursor-pointer hover:text-red-400">Logout</span>
                    </>
                )}
            </div>
        </nav>
    )
}