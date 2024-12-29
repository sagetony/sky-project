import { Cloud1, maps_bg } from "../../assets";
import { BuyLandModal } from "../../components";
import GridMap from "./GridMap";
import MapCard from "./MapCard";
import { useEffect, useState } from "react";

const MapSection = () => {
  const [selectedUser, setSelectedUser] = useState();
  const [users, setUsers] = useState([]);
  const [nfts, setNfts] = useState([]);
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
        console.log("sds", data);

        const nftStrt = data.nfts.map((item) => {
          const [x, y] = item.nft.coordinates.split(",").map(Number);
          console.log("sds", item?.user?.avatar);

          return {
            id: item?.id,
            // x: 30,
            // y: 20,
            x: x,
            y: y,
            name: item?.nft?.name,
            avatar: item?.user?.avatar,
            owner: item?.owner,
            item: item,
          };
        });
        // console.log(nftStrt);
        setUsers(nftStrt);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      }
    };

    const fetchAvNfts = async () => {
      try {
        // Function to get the token from sessionStorage
        const getAuthToken = () => {
          return sessionStorage.getItem("ddhcnvK2"); // Get token from sessionStorage
        };
        const token = getAuthToken(); // Retrieve the token from sessionStorage

        if (!token) {
          toast.error("Connect Wallet");
          return;
        }
        const response = await fetch(
          "https://app-8188821b-b70d-4f68-a73e-2a6805ccb1f1.cleverapps.io/api/nfts/unsoldenft",
          {
            headers: {
              "Content-Type": "application/json", // Set the content type to JSON
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
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
        <div className="flex md:flex-row flex-col gap-10 justify-between">
          <div className="relative md:w-2/3">
            <GridMap data={users} />
          </div>
          <div
            className="o md:overflow-auto w-full md:h-[790px]"
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
                  onClick={() => handleBuyLandModalClick(nft)}
                />
              ))}
            </div>
          </div>
        </div>

        {modalOpen2 && (
          <BuyLandModal onclose={closeBuyLandModal} user={selectedUser} />
        )}
      </div>
    </div>
  );
};

export default MapSection;
