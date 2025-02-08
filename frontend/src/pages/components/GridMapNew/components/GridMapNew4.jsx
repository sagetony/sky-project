/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import "./news.css";

const GridMapNew4 = ({ onLandClick }) => {
  const [lands, setLands] = useState([]);
  const BASE_URL = "https://server-production-411c.up.railway.app";

  useEffect(() => {
    const fetchBoughtNfts = async () => {
      try {
        const response = await fetch(
          "https://server-production-411c.up.railway.app/api/nfts/bought-d",
          {
            // headers: {
            //
            //   Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwid2FsbGV0IjoiMHhkNTJmODIzRDQ2YmFCMTY3YTViMTRCNDg4NkFFOTk5ZTYxZjg3MkNBIiwiaWF0IjoxNzM0OTQ3NTcyLCJleHAiOjE3MzQ5NTExNzJ9.Pp4APwXRfID8AN6joYXt1_nCOUKDXKCOdDUo2zZYJj0`,
            // },
          }
        );
        const data = await response.json();
        const nftStrt = data.nfts.map((item) => {
          const [x, y] = item.nft.coordinates.split(",").map(Number);
          return {
            id: item?.id,
            x: x,
            y: y,
            name: item?.nft?.name,
            avatar: item?.user?.avatar,
            owner: item?.nft?.owner,
            item: item,
          };
        });
        setLands(nftStrt);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      }
    };
    fetchBoughtNfts();
  }, []);

  const maxRows = 1;
  const maxColumns = 1;

  const getGridItem = (land, row, col) => {
    return (
      <div
        key={`grid-${row}-${col}`}
        className={`grid-item-4 cursor-pointer hover:scale-[3] ${
          land ? "land-4" : "empty-4"
        }  `}
      >
        {land ? (
          <div onClick={() => onLandClick(land.item)}>
            <img
              src={`${BASE_URL}/${land.avatar}`}
              alt={land.name}
              className="grid-avatar-4"
              data-tooltip-id={`tooltip-${land.id}`}
              data-tooltip-content={`${land.name} Owner: ${land.owner}`}
            />
            <Tooltip id={`tooltip-${land.id}`} />
          </div>
        ) : (
          // Display row and column for empty boxes
          <div className="empty-box-label">
            D{row},{col}
          </div>
        )}{" "}
      </div>
    );
  };

  const gridItems = [];
  for (let row = 1; row <= maxRows; row++) {
    for (let col = 1; col <= maxColumns; col++) {
      const land = lands.find((land) => land.x === col && land.y === row);
      gridItems.push(getGridItem(land, row, col));
    }
  }

  return (
    <div className="grid-map-container-4">
      <div className="grid-container-4">{gridItems}</div>
    </div>
  );
};

export default GridMapNew4;
