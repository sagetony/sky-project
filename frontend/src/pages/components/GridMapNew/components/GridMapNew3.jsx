/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import "./news.css";

const GridMapNew3 = ({ onLandClick }) => {
  const [lands, setLands] = useState([]);
  const BASE_URL =
    "https://app-56f7bff7-a9d9-47a4-80e9-d5d0311eaedf.cleverapps.io";

  useEffect(() => {
    const fetchBoughtNfts = async () => {
      try {
        const response = await fetch(
          "https://app-56f7bff7-a9d9-47a4-80e9-d5d0311eaedf.cleverapps.io/api/nfts/bought-c",
          {
            // headers: {
            //   Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwid2FsbGV0IjoiMHhkNTJmODIzRDQ2YmFCMTY3YTViMTRCNDg4NkFFOTk5ZTYxZjg3MkNBIiwiaWF0IjoxNzM0OTQ3NTcyLCJleHAiOjE3MzQ5NTExNzJ9.Pp4APwXRfID8AN6joYXt1_nCOUKDXKCOdDUo2zZYJj0`,
            // },
          }
        );
        const data = await response.json();
        const nftStrt = data.nfts.map((item) => {
          const [x, y] = item.nft.coordinates
            .replace(/[()]/g, "") // Remove parentheses if present
            .split(/\s*,\s*/) // Split by comma, allowing spaces
            .map(Number); // Convert to numbers
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
  const maxColumns = 10;

  const getGridItem = (land, row, col) => {
    return (
      <div
        key={`grid-${row}-${col}`}
        className={`grid-item-3 cursor-pointer hover:scale-[3] ${
          land ? "land-3" : "empty-3"
        }  `}
      >
        {land ? (
          <div onClick={() => onLandClick(land.item)}>
            <img
              src={`${BASE_URL}/${land.avatar}`}
              alt={land.name}
              className="grid-avatar-3"
              data-tooltip-id={`tooltip-${land.id}`}
              data-tooltip-content={`${land.name} Owner: ${land.owner}`}
            />
            <Tooltip id={`tooltip-${land.id}`} />
          </div>
        ) : (
          // Display row and column for empty boxes
          <div className="empty-box-label">
            C{row},{col}
          </div>
        )}
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
    <div className="grid-map-container-3">
      <div className="grid-container-3">{gridItems}</div>
    </div>
  );
};

export default GridMapNew3;
