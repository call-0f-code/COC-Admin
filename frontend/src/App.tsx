import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Authentication from './Components/Authentication';
import FrontPage from './Components/mainpage';
function App() {
  const [count, setCount] = useState(0)
return (
    // <><Authentication /> 
    <FrontPage />
  );

}

export default App
