import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Footer from './components/Footer';
import Home from './pages/Home';
import Maps from './pages/Map';
import Login from './pages/auth/Login';
import Staking from './pages/Staking';
import CityFund from './pages/CityFund';
import About from './pages/About';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/maps' element={<Maps />} />
        <Route path='/login' element={<Login />} />
        <Route path='/staking' element={<Staking />} />
        <Route path='/city-fund' element={<CityFund />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </Layout>
  );
}

export default App;
