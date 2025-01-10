import logo from './logo.svg';
import './App.css';
import { PersonForm } from './components/PersonForm';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Home } from './components/Home';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={() => navigate('/form')}>Form</button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<PersonForm />} />
      </Routes>
    </div>
  );
}

export default App;
