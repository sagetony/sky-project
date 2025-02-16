import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import MintingForm from "./components/MintingForm";
import Home from "./pages/Home";
import Maps from "./pages/Map";
import Login from "./pages/auth/Login";
import Staking from "./pages/Staking";
import CityFund from "./pages/CityFund";
import About from "./pages/About";
import Purchase from "./pages/Purchase";
import Market from "./pages/Market";
import Profile from "./pages/Profile";
import Register from "./pages/auth/Register";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<Register />} />
        <Route path="/market" element={<Market />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/staking" element={<Staking />} />
        <Route path="/city-fund" element={<CityFund />} />
        <Route path="/about" element={<About />} />
        <Route path="/minting" element={<MintingForm />} />
      </Routes>
      <Footer />
    </Layout>
  );
}

export default App;
