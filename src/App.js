import { Route ,Routes,useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import Addtogallery from './Pages/Gallery/Addtogallery';
import Gallery from './Pages/Gallery/Gallery';
import Addmembers from './Pages/Members/Addmembers';
import Listmembers from './Pages/Members/Listmembers';
import Addproject from './Pages/Projects/Addproject';
import Projectslist from './Pages/Projects/Projectslist';
import Login from './Components/Authentication/Login'
import Protectedroutes from './Helper/Protectedroutes';
import Dashboard from './Pages/Dashboard/Dashboard';


function App() {

  const location = useLocation();

  return (
    <div className="wrapper">
       {
          location.pathname !== '/' ? <Navbar></Navbar>: <></>
       }
       {
          location.pathname !== '/' ? <Sidebar></Sidebar> : <></>
       }
      <Routes>
          <Route path="/" element={<Login />} exact/>
          <Route element={<Protectedroutes />}>
              <Route path="/project-list" element={<Projectslist />} />
              <Route path="/add-project" element={<Addproject />} />
              <Route path="/members" element={<Listmembers />} />
              <Route path="/add-members" element={<Addmembers />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/add-to-gallery" element={<Addtogallery />} />
              <Route path="/dashboard" element={<Dashboard />} />
          </Route> 
      </Routes>
    </div>
  );
}

export default App;
