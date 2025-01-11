/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import './news.css';

const GridMapNew9 = ({ onLandClick }) => {
  const [lands, setLands] = useState([]);
  const BASE_URL =
    'https://app-8188821b-b70d-4f68-a73e-2a6805ccb1f1.cleverapps.io';

  useEffect(() => {
    const fetchBoughtNfts = async () => {
      try {
        const response = await fetch(
          'https://app-8188821b-b70d-4f68-a73e-2a6805ccb1f1.cleverapps.io/api/nfts/bought-i',
          {
            // headers: {
            //   Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwid2FsbGV0IjoiMHhkNTJmODIzRDQ2YmFCMTY3YTViMTRCNDg4NkFFOTk5ZTYxZjg3MkNBIiwiaWF0IjoxNzM0OTQ3NTcyLCJleHAiOjE3MzQ5NTExNzJ9.Pp4APwXRfID8AN6joYXt1_nCOUKDXKCOdDUo2zZYJj0`,
            // },
          }
        );
        const data = await response.json();
        const nftStrt = data.nfts.map((item) => {
          const [x, y] = item.nft.coordinates.split(',').map(Number);
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
        console.error('Error fetching NFT data:', error);
      }
    };
    fetchBoughtNfts();
  }, []);

  const maxRows = 50;
  const maxColumns = 50;

  const getGridItem = (land, row, col) => {
    return (
      <div
        key={`grid-${row}-${col}`}
        className={`grid-item-9 cursor-pointer hover:scale-[3] ${
          land ? 'land-9' : 'empty-9'
        }  `}
      >
        {land && (
          <div onClick={() => onLandClick(land.item)}>
            <img
              src={`${BASE_URL}/${land.avatar}`}
              alt={land.name}
              className='grid-avatar-9'
              data-tooltip-id={`tooltip-${land.id}`}
              data-tooltip-content={`${land.name} Owner: ${land.owner}`}
            />
            <Tooltip id={`tooltip-${land.id}`} />
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
    <div className='grid-map-container-9'>
      <div className='grid-container-9'>{gridItems}</div>
    </div>
  );
};

export default GridMapNew9;
