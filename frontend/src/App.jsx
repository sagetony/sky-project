import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Layout from './components/Layout';
import Footer from './components/Footer';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </Layout>
  );
}

export default App;
