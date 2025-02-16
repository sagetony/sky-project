import { createAppKit } from "@reown/appkit/react";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { sepolia, mainnet, bscTestnet } from "@reown/appkit/networks";
import { createSIWE } from "./utils/siweUtils";

// 1. Get projectId
const projectId = "d4b4ea4d0b9e81094db8e4fd59a8eb87";

// 3. Create a metadata object - optional
const metadata = {
  name: "Skymetacity",
  description: "Sky Meta City",
  url: "https://sky-project-mu.vercel.app", // origin must match your domain & subdomain
  icons: ["https://sky-project-mu.vercel.app/assets/LOGO-B700Bdft.png"],
};

// 4. Create a AppKit instance
export const chains = [mainnet, sepolia, bscTestnet];

const siweConfig = createSIWE(chains);

// 3. Create the AppKit instance
createAppKit({
  adapters: [new Ethers5Adapter()],
  metadata: metadata,
  networks: [sepolia, mainnet, bscTestnet],
  projectId,
  siweConfig,
  features: {
    email: false,
    analytics: true, // Optional - defaults to your Cloud configuration
    socials: false,
    emailShowWallets: false,
  },
});

export default function Testing() {
  return (
    <div>
      <h3>ndnls</h3>
      <appkit-button />
    </div>
  );
}
