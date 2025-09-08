import { Toaster } from 'react-hot-toast';
import './App.css';
import Authentication from './pages/Authentication';
import DsaDashboard from './pages/DsaDashboard';

function App() {
  return (<>
  <Authentication/>
  <DsaDashboard/>
  <Toaster position="top-center" reverseOrder={false} />
  </>
)

}

export default App;
