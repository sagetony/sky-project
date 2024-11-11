import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Footer from './components/Footer';
import Home from './pages/Home';
import Maps from './pages/Map';
import Login from './pages/auth/Login';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/maps' element={<Maps />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
    </Layout>
  );
}

export default App;
