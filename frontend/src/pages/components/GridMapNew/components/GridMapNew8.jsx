import { useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Tooltip } from 'react-tooltip';
import './news.css';
import { LandModal } from '../../../../components';

const GridMapNew8 = () => {
  const [lands, setLands] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [maxRows, setMaxRows] = useState(70);
  const [maxColumns, setMaxColumns] = useState(80);

  useEffect(() => {
    const fetchBoughtNfts = async () => {
      try {
        const response = await fetch(
          'https://app-8188821b-b70d-4f68-a73e-2a6805ccb1f1.cleverapps.io/api/nfts/bought-h',
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwid2FsbGV0IjoiMHhkNTJmODIzRDQ2YmFCMTY3YTViMTRCNDg4NkFFOTk5ZTYxZjg3MkNBIiwiaWF0IjoxNzM0OTQ3NTcyLCJleHAiOjE3MzQ5NTExNzJ9.Pp4APwXRfID8AN6joYXt1_nCOUKDXKCOdDUo2zZYJj0`,
            },
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
            avatar: item?.nft?.image,
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
    calculateGridSize();

    window.addEventListener('resize', calculateGridSize);

    return () => {
      window.removeEventListener('resize', calculateGridSize);
    };
  }, []);

  const handleLandModalClick = (user) => {
    setModalOpen(!modalOpen);
    setSelectedUser(user);
  };

  const closeLandModal = () => {
    setModalOpen(false);
  };

  // const maxRows = 70;
  // const maxColumns = 80;

  const calculateGridSize = () => {
    const width = window.innerWidth;
    if (width >= 3000 && width <= 3500) {
      // setMaxColumns(27);
    } else if (width >= 2700 && width <= 2999) {
      // setMaxColumns(25);
    } else if (width >= 2500 && width <= 2699) {
      // setMaxColumns(24);
    } else if (width >= 2000 && width <= 2499) {
      // setMaxColumns(24);
    } else if (width >= 1500 && width <= 1999) {
      // setMaxColumns(24);
    } else if (width >= 1280 && width <= 1499) {
      // setMaxColumns(24);
    } else if (width >= 680 && width <= 1279) {
      // setMaxColumns(24);
    } else if (width >= 500 && width <= 679) {
      // setMaxColumns(9);
    } else if (width >= 400 && width <= 499) {
      // setMaxColumns(7);
    } else {
      setMaxRows(70);
      setMaxColumns(80);
    }
  };
  const getGridItem = (land, row, col) => {
    return (
      <div
        key={`grid-${row}-${col}`}
        className={`grid-item-8 cursor-pointer hover:scale-[3] ${
          land ? 'land-8' : 'empty-8'
        }  `}
      >
        {land && (
          <div onClick={() => handleLandModalClick(land.item)}>
            <img
              src={land.avatar}
              alt={land.name}
              className='grid-avatar-8'
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
    <div className='grid-map-container-8'>
      <TransformWrapper defaultScale={0.3} wheel={{ step: 0.1 }}>
        <TransformComponent>
          <div className='grid-container-8'>{gridItems}</div>
        </TransformComponent>
      </TransformWrapper>
      {modalOpen && <LandModal onclose={closeLandModal} user={selectedUser} />}
    </div>
  );
};

export default GridMapNew8;
