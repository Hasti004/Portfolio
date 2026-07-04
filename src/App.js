import { Routes, Route } from 'react-router-dom';
import LabResearch from './pages/LabResearch';
import OnTheRecord from './pages/OnTheRecord';
import CVPage from './pages/CVPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LabResearch />} />
      <Route path="/on-the-record" element={<OnTheRecord />} />
      <Route path="/cv" element={<CVPage />} />
    </Routes>
  );
}

export default App;
