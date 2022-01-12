import { Route ,Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import Addmembers from './Pages/Members/Addmembers';
import Listmembers from './Pages/Members/Listmembers';
import Addproject from './Pages/Projects/Addproject';
import Projectslist from './Pages/Projects/Projectslist';


function App() {
  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <Routes>
          <Route path="/project-list" element={<Projectslist />} exact/>
          <Route path="/add-project" element={<Addproject />} exact/>
          <Route path="/members" element={<Listmembers />} exact/>
          <Route path="/add-members" element={<Addmembers />} exact/>
      </Routes>
    </div>
  );
}

export default App;
