import { Cloud1, maps_bg } from "../../assets";
import { BuyLandModal } from "../../components";
import GridMapMain from "./GridMapNew/GridMapMain";
import MapCard from "./MapCard";
import { useEffect, useState } from "react";

const MapSection = () => {
  const [selectedUser, setSelectedUser] = useState();
  const [nfts, setNfts] = useState([]);
  const [modalOpen2, setModalOpen2] = useState(false);

  useEffect(() => {
    const fetchAvNfts = async () => {
      try {
        const response = await fetch(
          "https://app-56f7bff7-a9d9-47a4-80e9-d5d0311eaedf.cleverapps.io/api/nfts/unsoldenft",
          {
            // headers: {
            //   Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwid2FsbGV0IjoiMHhkNTJmODIzRDQ2YmFCMTY3YTViMTRCNDg4NkFFOTk5ZTYxZjg3MkNBIiwiaWF0IjoxNzM0OTQ3NTcyLCJleHAiOjE3MzQ5NTExNzJ9.Pp4APwXRfID8AN6joYXt1_nCOUKDXKCOdDUo2zZYJj0`,
            // },
          }
        );
        const data = await response.json();
        setNfts(data.nfts);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      }
    };

    fetchAvNfts();
  }, []);

  const handleBuyLandModalClick = (user) => {
    setModalOpen2(!modalOpen2);
    setSelectedUser(user);
  };

  const closeBuyLandModal = () => {
    setModalOpen2(false);
  };

  return (
    <div className="relative" style={{ backgroundImage: `url(${maps_bg})` }}>
      {" "}
      <div className="absolute inset-0 z-0">
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
            className="border-2 md:w-[31%] w-full  mb-3 border-white bg-[#1B85ED] text-white placeholder:text-slate-100 px-5 py-2 rounded-md"
          />
        </div>
        <div className="flex xl:flex-row flex-col gap-10 justify-between">
          <div className="relative xl:w-2/3">
            <GridMapMain />
            {/* <GridMap data={users} /> */}
          </div>
          <div
            className="o xl:overflow-auto w-full md:h-[790px]"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#1B85ED white",
            }}
          >
            <div className="grid gap-5 md:pl-8">
              {nfts.map((nft, index) => (
                <MapCard
                  key={index}
                  isTag={true}
                  img={nft.image}
                  name={nft.name}
                  coordinates={nft.coordinates}
                  size={nft.size}
                  onClick={() => handleBuyLandModalClick(nft)}
                />
              ))}
            </div>
          </div>
        </div>
        {/* <GridMapMain /> */}

        {modalOpen2 && (
          <BuyLandModal onclose={closeBuyLandModal} user={selectedUser} />
        )}
      </div>
    </div>
  );
};

export default MapSection;
