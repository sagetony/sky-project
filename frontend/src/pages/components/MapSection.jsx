import { Cloud1, map_inner, maps_bg } from "../../assets";
import { BuyLandModal, LandModal } from "../../components";
import MapCard from "./MapCard";
import { useEffect, useState } from "react";

const MapSection = () => {
  const [selectedUser, setSelectedUser] = useState();
  const [users, setUsers] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);

  useEffect(() => {
    // Fetch the NFT data
    const fetchBoughtNfts = async () => {
      try {
        const response = await fetch(
          "https://app-8188821b-b70d-4f68-a73e-2a6805ccb1f1.cleverapps.io/api/nfts/bought",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwid2FsbGV0IjoiMHhkNTJmODIzRDQ2YmFCMTY3YTViMTRCNDg4NkFFOTk5ZTYxZjg3MkNBIiwiaWF0IjoxNzM0OTQ3NTcyLCJleHAiOjE3MzQ5NTExNzJ9.Pp4APwXRfID8AN6joYXt1_nCOUKDXKCOdDUo2zZYJj0`,
            },
          }
        );
        const data = await response.json();
        setUsers(data.nfts);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      }
    };

    const fetchAvNfts = async () => {
      try {
        const response = await fetch(
          "https://app-8188821b-b70d-4f68-a73e-2a6805ccb1f1.cleverapps.io/api/nfts/unsoldenft",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwid2FsbGV0IjoiMHhkNTJmODIzRDQ2YmFCMTY3YTViMTRCNDg4NkFFOTk5ZTYxZjg3MkNBIiwiaWF0IjoxNzM0OTQ3NTcyLCJleHAiOjE3MzQ5NTExNzJ9.Pp4APwXRfID8AN6joYXt1_nCOUKDXKCOdDUo2zZYJj0`,
            },
          }
        );
        const data = await response.json();
        setNfts(data.nfts);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      }
    };

    fetchBoughtNfts();
    fetchAvNfts();
  }, []);

  const handleLandModalClick = (user) => {
    setModalOpen(!modalOpen);
    setSelectedUser(user);
  };

  const closeLandModal = () => {
    setModalOpen(false);
  };

  const handleBuyLandModalClick = (user) => {
    setModalOpen2(!modalOpen2);
    setSelectedUser(user);
  };

  const closeBuyLandModal = () => {
    setModalOpen2(false);
  };

  console.log(nfts);
  return (
    <div className="relative" style={{ backgroundImage: `url(${maps_bg})` }}>
      {" "}
      <div className="absolute inset-0 z-0">
        {/* <h1 className='text-[200px]'>khbj</h1> */}
        <img
          src={Cloud1}
          alt=""
          className="absolute -top-12 left-0 w-96 animate-upAndDown"
        />
      </div>
      <div className="font-inter relative z-10 pt-10 py-20 px-10">
        <div className="flex justify-end">
          <input
            type="text"
            placeholder="Search an experience"
            className="border-2 md:w-1/3 w-full mb-3 border-white bg-[#1B85ED] text-white placeholder:text-slate-100 px-5 py-2 rounded-md"
          />
        </div>
        <div className="flex md:flex-row flex-col gap-10 justify-between">
          {/* <div className='md:w-2/3'>
            <img src={map_inner} alt='' className='' />
          </div> */}
          <div className="relative md:w-2/3">
            {/* Map Image */}
            <img src={map_inner} alt="Map" className="w-full" />

            {/* Scatter Avatars */}
            <div className="absolute inset-0">
              {users.map((avatar, index) => (
                <img
                  key={index}
                  src={`${avatar.nft.image}`}
                  alt={`Avatar ${index + 1}`}
                  className="absolute"
                  onClick={() => {
                    handleLandModalClick(avatar);
                  }}
                  style={{
                    top: `${Math.random() * (100 - 10) + 5}%`, // Randomized with padding
                    left: `${Math.random() * (100 - 10) + 5}%`,
                    width: "40px", // Adjust size as needed
                    height: "40px",
                    borderRadius: "50%",
                    transform: "translate(-50%, -50%)", // Center each avatar
                  }}
                />
              ))}
            </div>
          </div>
          <div
            className="o md:overflow-auto md:h-[790px]"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#1B85ED white",
            }}
          >
            <div className="grid gap-5 md:px-8">
              {nfts.map((nft, index) => (
                <MapCard
                  key={index}
                  isTag={true}
                  img={nft.image}
                  name={nft.name}
                  onClick={() => handleBuyLandModalClick(nft)}
                />
              ))}
              {/* <MapCard isCreator={true} />
              <MapCard isMeta={true} /> */}
            </div>
          </div>
        </div>
        {modalOpen && (
          <LandModal onclose={closeLandModal} user={selectedUser} />
        )}
        {modalOpen2 && (
          <BuyLandModal onclose={closeBuyLandModal} user={selectedUser} />
        )}
      </div>
    </div>
  );
};

export default MapSection;
