import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home.jsx';
import "./App.css";
import Shark from './pages/Shark.jsx';


function App() {

  return (
    <div >
      <Router>
      <Routes>
        <Route path="/" exact element={<Home/>} />
         <Route path="/shark/:id" element={<Shark />} />
      </Routes>
    </Router>
     
    </div>
  );
}

export default App;
