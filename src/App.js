import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Results from './components/Results';
import Payment from './components/Payment';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/results' element={<Results/>}/>
      <Route path='/payment' element={<Payment/>}/>
    </Routes>
  );
}

export default App;
