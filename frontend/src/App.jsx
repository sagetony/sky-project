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

import { createAppKit } from "@reown/appkit/react";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { mainnet, sepolia, bscTestnet } from "@reown/appkit/networks";

// 1. Get projectId
const projectId = "d4b4ea4d0b9e81094db8e4fd59a8eb87D";

// 2. Create a metadata object - optional
const metadata = {
  name: "Sky Meta City",
  description: "Sky Meta City",
  url: "https://sky-project-mu.vercel.app", // origin must match your domain & subdomain
  icons: ["https://sky-project-mu.vercel.app/assets/LOGO-B700Bdft.png"],
};

// 3. Create the AppKit instance
createAppKit({
  adapters: [new Ethers5Adapter()],
  metadata: metadata,
  networks: [sepolia, mainnet, bscTestnet],
  projectId,
  features: {
    email: false,
    analytics: true, // Optional - defaults to your Cloud configuration
    socials: false,
    emailShowWallets: false,
  },
});

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
