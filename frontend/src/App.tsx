import { Toaster } from 'react-hot-toast';
import './App.css';
import Authentication from './pages/Authentication';

function App() {
  return (<>
  <Authentication />
  <Toaster position="top-center" reverseOrder={false} />
  </>
)

}

export default App;
