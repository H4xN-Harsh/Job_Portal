import{BrowserRouter,Routes,Route} from 'react-router-dom';
import Nav from './components/Nav';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'
import JobListing from './pages/JobListing'
import ProtectedRoute from './components/ProtectedRoute'
import JobDetails from './pages/JobDetails';
import Apply from './pages/Apply';
import MyApplications from './pages/MyApplications'
import GiverPost from './pages/GiverPost';

function App() {
  return (
    <>
      <Nav/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/jobs' element={<JobListing/>}/>
        <Route path="/jobs/:id" element={<JobDetails/>}/>
        <Route path="/apply/:id" element={<Apply/>}/>
        <Route path='/my-applications' element={
    <ProtectedRoute><MyApplications/></ProtectedRoute>
}/>
        <Route path='/post-job' element={
    <ProtectedRoute><GiverPost/></ProtectedRoute>
}/>
        <Route path='/dashboard' element={
          <ProtectedRoute><Dashboard/></ProtectedRoute>
        }/>
      </Routes>
    </>
  )
}

export default App
